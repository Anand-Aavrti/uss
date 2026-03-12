'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  clearAuth,
  getStoredRefreshToken,
  getStoredUser,
  getTimeUntilExpiry,
  isTokenExpired,
  logoutFromServer,
  refreshAuthToken,
  saveAuthData,
  SessionUser,
  StoredUser,
  updateStoredToken,
  validateSession,
} from '@/lib/authService';
import { setAccessToken } from '@/lib/apiClient';

/**
 * How many milliseconds before token expiry we proactively refresh.
 * Token lifetime is 60 min; we refresh at 55 min (5 min buffer).
 */
const REFRESH_BUFFER_MS = 5 * 60 * 1000;

/**
 * useAuthUser
 *
 * Full token-lifecycle hook:
 *   1. On mount  — reads stored credentials, validates the JWT.
 *                  If expired → tries to refresh silently.
 *                  If refresh fails → clears auth and returns null user.
 *   2. While running — schedules a proactive refresh REFRESH_BUFFER_MS
 *                      before the token expires so the user never hits
 *                      a 401 mid-session.
 *   3. After long absence — when the app re-loads the expired token is
 *                      detected on mount and a refresh is attempted
 *                      immediately. Only if that also fails is the user
 *                      asked to log in again.
 *   4. logout() — cancels the refresh timer and wipes all stored auth.
 */
export function useAuthUser() {
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Cancel any pending refresh timer. */
  const clearRefreshTimer = useCallback(() => {
    if (refreshTimerRef.current !== null) {
      clearTimeout(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }
  }, []);

  /**
   * Schedule a proactive token refresh.
   * Calls itself recursively so each successful refresh schedules the next.
   */
  const scheduleRefresh = useCallback(
    (token: string) => {
      clearRefreshTimer();

      const timeUntilExpiry = getTimeUntilExpiry(token);
      // If already expired, skip scheduling (mount logic handles that path)
      if (timeUntilExpiry <= 0) return;

      const delay = Math.max(timeUntilExpiry - REFRESH_BUFFER_MS, 0);

      refreshTimerRef.current = setTimeout(async () => {
        const storedRefreshToken = getStoredRefreshToken();
        if (!storedRefreshToken) {
          clearAuth();
          setUser(null);
          return;
        }

        const result = await refreshAuthToken(storedRefreshToken);
        if (result) {
          const updated = updateStoredToken(result.token, result.refreshToken);
          if (updated) {
            setUser(updated);
            scheduleRefresh(result.token); // schedule the next rotation
          }
        } else {
          // Refresh token itself is expired or invalid — force logout
          clearAuth();
          setUser(null);
        }
      }, delay);
    },
    [clearRefreshTimer],
  );

  /** Explicit logout: clear server cookie, cancel timer, wipe storage. */
  const logout = useCallback(async () => {
    clearRefreshTimer();
    await logoutFromServer(); // clears HttpOnly cookie server-side
    clearAuth();
    setAccessToken(null);
    setUser(null);
  }, [clearRefreshTimer]);

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      const storedUser = getStoredUser();
      const storedRefreshToken = getStoredRefreshToken();

      // --- Case 1: No local data — try cookie-based session (cross-subdomain SSO) ---
      if (!storedUser) {
        const sessionUser = await validateSession();
        if (!cancelled && sessionUser) {
          // Cookie session valid (user logged in via another subdomain)
          // Build a minimal StoredUser from the server response
          const cookieUser: StoredUser = {
            tenantId: sessionUser.tenantId,
            displayName: '',
            email: sessionUser.email,
            role: 'user',
            userId: sessionUser.uid,
            token: '',
          };
          saveAuthData(cookieUser, '');
          setUser(cookieUser);
        }
        if (!cancelled) setLoading(false);
        return;
      }

      // --- Case 2: Token still valid — validate with server ---
      if (!isTokenExpired(storedUser.token)) {
        const sessionUser = await validateSession(storedUser.token);
        if (cancelled) return;

        if (sessionUser) {
          setAccessToken(storedUser.token || null);
          setUser(storedUser);
          scheduleRefresh(storedUser.token);
        } else {
          // Server rejected the token (revoked, tenant changed, etc.)
          // Fall through to refresh attempt
          const result = await refreshAuthToken(storedRefreshToken ?? '');
          if (cancelled) return;
          if (result) {
            const updated = updateStoredToken(result.token, result.refreshToken);
            if (updated) {
              setAccessToken(result.token);
              setUser(updated);
              scheduleRefresh(result.token);
            }
          } else {
            clearAuth();
          }
        }
        if (!cancelled) setLoading(false);
        return;
      }

      // --- Case 3: Token expired — attempt silent refresh ---
      if (!storedRefreshToken) {
        clearAuth();
        if (!cancelled) setLoading(false);
        return;
      }

      const result = await refreshAuthToken(storedRefreshToken);
      if (cancelled) return;

      if (result) {
        const updated = updateStoredToken(result.token, result.refreshToken);
        if (updated && !cancelled) {
          setAccessToken(result.token);
          setUser(updated);
          scheduleRefresh(result.token);
        }
      } else {
        clearAuth();
      }

      if (!cancelled) setLoading(false);
    };

    initialize();

    return () => {
      cancelled = true;
      clearRefreshTimer();
    };
  }, [scheduleRefresh, clearRefreshTimer]);

  return { user, loading, logout };
}

// Alias for backward compatibility with existing useAuth() calls
export function useAuth() {
  return useAuthUser();
}
