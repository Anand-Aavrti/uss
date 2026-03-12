/**
 * authService.ts
 * Centralized auth token management: storage, JWT decoding, expiry checks, refresh API.
 *
 * Storage layout (localStorage):
 *   uss_user          — { tenantId, displayName, email, role, userId, token }
 *   uss_refresh_token — opaque refresh token string (kept separate for easy rotation)
 */

const USS_USER_KEY = 'uss_user';
const USS_REFRESH_KEY = 'uss_refresh_token';

const AUTH_BASE =
  'https://us-central1-mdm-aavrti-engine.cloudfunctions.net/authenticationtest/api/v1/authentication';

const REFRESH_TOKEN_URL = `${AUTH_BASE}/refreshToken`;
const SESSION_URL = `${AUTH_BASE}/session`;
const LOGOUT_URL = `${AUTH_BASE}/logout`;

// Cookies only work over HTTPS with proper CORS config on the backend.
// On http (local dev) omit credentials — Bearer token path handles auth.
const FETCH_CREDENTIALS: RequestCredentials =
  typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'include' : 'omit';

export interface StoredUser {
  tenantId: string;
  displayName: string;
  email: string;
  role: string;
  userId: string;
  token: string;
}

// ---------------------------------------------------------------------------
// JWT helpers (client-side only — no signature verification)
// ---------------------------------------------------------------------------

/** Decode the payload of a JWT without verifying the signature. */
export function decodeJWT(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // base64url → base64 → JSON
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
    return JSON.parse(atob(padded)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

/**
 * Returns true if the token is already expired or will expire within `bufferMs`.
 * Defaults to a 60-second buffer so we refresh before the server rejects it.
 */
export function isTokenExpired(token: string, bufferMs = 60_000): boolean {
  const payload = decodeJWT(token);
  if (!payload || typeof payload.exp !== 'number') return true;
  return Date.now() >= payload.exp * 1000 - bufferMs;
}

/** Milliseconds remaining until the token expires (negative if already expired). */
export function getTimeUntilExpiry(token: string): number {
  const payload = decodeJWT(token);
  if (!payload || typeof payload.exp !== 'number') return -1;
  return payload.exp * 1000 - Date.now();
}

// ---------------------------------------------------------------------------
// Storage helpers
// ---------------------------------------------------------------------------

export function getStoredUser(): StoredUser | null {
  try {
    const raw = localStorage.getItem(USS_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as StoredUser;
  } catch {
    return null;
  }
}

export function getStoredRefreshToken(): string | null {
  try {
    return localStorage.getItem(USS_REFRESH_KEY);
  } catch {
    return null;
  }
}

/** Persist both user data and the refresh token after login or token rotation. */
export function saveAuthData(user: StoredUser, refreshToken: string): void {
  localStorage.setItem(USS_USER_KEY, JSON.stringify(user));
  localStorage.setItem(USS_REFRESH_KEY, refreshToken);
}

/**
 * Rotate the stored token + refresh token in-place.
 * Returns the updated user object so callers can update React state.
 */
export function updateStoredToken(newToken: string, newRefreshToken: string): StoredUser | null {
  const user = getStoredUser();
  if (!user) return null;
  const updated: StoredUser = { ...user, token: newToken };
  localStorage.setItem(USS_USER_KEY, JSON.stringify(updated));
  localStorage.setItem(USS_REFRESH_KEY, newRefreshToken);
  return updated;
}

/** Remove all auth data — use on logout or when refresh fails. */
export function clearAuth(): void {
  localStorage.removeItem(USS_USER_KEY);
  localStorage.removeItem(USS_REFRESH_KEY);
}

// ---------------------------------------------------------------------------
// Refresh API
// ---------------------------------------------------------------------------

export interface RefreshResult {
  token: string;
  refreshToken: string;
}

// ---------------------------------------------------------------------------
// Session validation
// ---------------------------------------------------------------------------

export interface SessionUser {
  uid: string;
  email: string;
  tenantId: string;
}

/**
 * Validate the current session with the server.
 * Reads from the HttpOnly cookie automatically (credentials: 'include').
 * Optionally attach a Bearer token for explicit token mode.
 * Returns the server-side user or null on any failure.
 */
export async function validateSession(token?: string): Promise<SessionUser | null> {
  try {
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(SESSION_URL, {
      method: 'GET',
      headers,
      credentials: FETCH_CREDENTIALS,
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.success || !data.user) return null;

    return data.user as SessionUser;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Server logout
// ---------------------------------------------------------------------------

/**
 * Clear the server-side HttpOnly auth cookie.
 * Always resolves — network failures are silently ignored so local logout
 * still completes even if the backend is unreachable.
 */
export async function logoutFromServer(): Promise<void> {
  try {
    await fetch(LOGOUT_URL, {
      method: 'POST',
      credentials: FETCH_CREDENTIALS,
    });
  } catch {
    // best-effort — proceed with local logout regardless
  }
}

/**
 * Exchange a refresh token for a new access token + new refresh token.
 * Returns null on any failure (network error, invalid token, server error).
 */

export async function refreshAuthToken(refreshToken: string): Promise<RefreshResult | null> {
  try {
    const response = await fetch(REFRESH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: FETCH_CREDENTIALS, // send/receive auth cookie
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    if (!data.success || !data.token || !data.refreshToken) return null;

    return { token: data.token, refreshToken: data.refreshToken };
  } catch {
    return null;
  }
}
