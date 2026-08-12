/**
 * ssoHandoff.ts
 * Cross-subdomain session sharing between USS and the standalone MDM app.
 *
 * The MDM app (repo: AavrtiTechnology/UdmsAdmin) keeps its production session in
 * two JS-readable cookies on its own domain — see UdmsAdmin/src/utils/tokenUtils.js:
 *
 *   getToken()        → getCookie('ym_access_token')
 *   getRefreshToken() → getCookie('ym_refresh_token')
 *   getUserFromToken() decodes email / firebase.tenant straight out of the JWT
 *
 * Both apps authenticate against the same gateway and receive the same JWT, so the
 * token USS already holds after login is valid in MDM as-is. Writing these two
 * cookies at the PARENT domain therefore makes MDM consider the user signed in —
 * no second login, and no token ever placed in a URL.
 *
 * Requirements (both enforced by canShareSession):
 *   - USS must be served from a subdomain of SSO_PARENT_DOMAIN
 *   - over https, because the cookies are marked Secure
 * Anywhere else — localhost included — every function here is a no-op and the
 * user simply gets the MDM app's own login screen.
 */

/** Registrable domain shared by USS and the MDM app. */
const SSO_PARENT_DOMAIN = 'unifiedsmartsolutions.com';

/** Cookie names are dictated by the MDM app — do not rename without changing it too. */
const ACCESS_COOKIE = 'ym_access_token';
const REFRESH_COOKIE = 'ym_refresh_token';

/** Cookie lifetimes mirror the MDM app's own defaults (1 day / 7 days). */
const ACCESS_COOKIE_DAYS = 1;
const REFRESH_COOKIE_DAYS = 7;

/** Public entry point of the standalone MDM app. */
export const MDM_APP_URL = `https://mdm.${SSO_PARENT_DOMAIN}`;

/** Landing route after MDM authenticates — matches its own post-login navigate('/Overview'). */
export const MDM_OVERVIEW_URL = `${MDM_APP_URL}/Overview`;

/**
 * True when this origin is allowed to write cookies for the shared parent domain.
 * A browser rejects a Domain= attribute that isn't a suffix of the current host,
 * and silently drops Secure cookies on http.
 */
export function canShareSession(): boolean {
  if (typeof window === 'undefined') return false;

  const { hostname, protocol } = window.location;
  if (protocol !== 'https:') return false;

  return hostname === SSO_PARENT_DOMAIN || hostname.endsWith(`.${SSO_PARENT_DOMAIN}`);
}

function writeSharedCookie(name: string, value: string, days: number): void {
  const maxAge = days * 24 * 60 * 60;
  // SameSite=Lax is sufficient: subdomains of one registrable domain are same-site,
  // so the cookie still rides the top-level navigation into the MDM app.
  document.cookie =
    `${name}=${encodeURIComponent(value)}; Domain=.${SSO_PARENT_DOMAIN}; Path=/; ` +
    `Max-Age=${maxAge}; Secure; SameSite=Lax`;
}

function deleteSharedCookie(name: string): void {
  document.cookie = `${name}=; Domain=.${SSO_PARENT_DOMAIN}; Path=/; Max-Age=0; Secure; SameSite=Lax`;
}

/**
 * Publish the current tokens to the shared parent domain so sibling apps
 * (currently just MDM) pick the session up on their next page load.
 * Safe to call on every login and every token rotation.
 */
export function shareSessionWithApps(token: string, refreshToken?: string): void {
  if (!canShareSession() || !token) return;

  writeSharedCookie(ACCESS_COOKIE, token, ACCESS_COOKIE_DAYS);
  if (refreshToken) {
    writeSharedCookie(REFRESH_COOKIE, refreshToken, REFRESH_COOKIE_DAYS);
  }
}

/**
 * Revoke the shared session on logout.
 *
 * NOTE: this only clears the parent-domain cookies USS wrote. The MDM app sets a
 * host-only cookie of the same name when a user logs in there directly, and its
 * own logout deletes only that host-only copy — so logging out inside MDM does
 * not remove these. See the caveat noted alongside this integration.
 */
export function clearSharedSession(): void {
  if (!canShareSession()) return;

  deleteSharedCookie(ACCESS_COOKIE);
  deleteSharedCookie(REFRESH_COOKIE);
}
