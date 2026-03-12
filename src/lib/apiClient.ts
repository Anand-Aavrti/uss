/**
 * apiClient.ts
 *
 * Axios instances for cross-service API calls with cookie support.
 * - authApi    → authentication service (login, session, refresh, logout)
 * - deviceApi  → protected service endpoints (device-control, etc.)
 *
 * Both instances use withCredentials: true so the HttpOnly ym_access_token
 * cookie is sent automatically. deviceApi also attaches a Bearer token from
 * memory and auto-refreshes on 401.
 */

import axios from 'axios';
import { getStoredRefreshToken, updateStoredToken } from './authService';

// Cookies only work over HTTPS with proper CORS config on the backend.
// On http (local dev) withCredentials is false — Bearer token path handles auth.
const WITH_CREDENTIALS = typeof window !== 'undefined' && window.location.protocol === 'https:';

const AUTH_BASE =
  'https://us-central1-mdm-aavrti-engine.cloudfunctions.net/authenticationtest/api/v1/authentication';

const DEVICE_BASE =
  process.env.NEXT_PUBLIC_DEVICE_API_BASE_URL ||
  'https://us-central1-mdm-aavrti-engine.cloudfunctions.net/deviceControl/api/v1';

// ---------------------------------------------------------------------------
// In-memory access token (Bearer mode, alongside cookie mode)
// ---------------------------------------------------------------------------

let _accessToken: string | null = null;

export function setAccessToken(token: string | null): void {
  _accessToken = token;
}

export function getAccessToken(): string | null {
  return _accessToken;
}

// ---------------------------------------------------------------------------
// Axios instances
// ---------------------------------------------------------------------------

export const authApi = axios.create({
  baseURL: AUTH_BASE,
  withCredentials: WITH_CREDENTIALS, // sends/receives ym_access_token cookie
});

export const deviceApi = axios.create({
  baseURL: DEVICE_BASE,
  withCredentials: WITH_CREDENTIALS,
});

// ---------------------------------------------------------------------------
// deviceApi request interceptor: attach Bearer token if present in memory
// ---------------------------------------------------------------------------
deviceApi.interceptors.request.use((config) => {
  if (_accessToken) {
    config.headers.Authorization = `Bearer ${_accessToken}`;
  }
  return config;
});

// ---------------------------------------------------------------------------
// deviceApi response interceptor: auto-refresh on 401 and retry original request
// ---------------------------------------------------------------------------
deviceApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error?.response?.status !== 401 || original?._retry) {
      return Promise.reject(error);
    }

    original._retry = true;

    const storedRefreshToken = getStoredRefreshToken();
    if (!storedRefreshToken) {
      return Promise.reject(error);
    }

    try {
      const refreshRes = await authApi.post<{
        token: string;
        refreshToken: string;
      }>('/refreshToken', { refreshToken: storedRefreshToken });

      const { token, refreshToken: newRefreshToken } = refreshRes.data;
      updateStoredToken(token, newRefreshToken);
      setAccessToken(token);

      original.headers.Authorization = `Bearer ${token}`;
      return deviceApi(original);
    } catch {
      return Promise.reject(error);
    }
  }
);
