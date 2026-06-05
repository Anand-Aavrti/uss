'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import { saveAuthData } from '@/lib/authService';
import { setAccessToken } from '@/lib/apiClient';

// Cookies only work over HTTPS with proper CORS config on the backend.
// On http (local dev) omit credentials — Bearer token path handles auth.
// const FETCH_CREDENTIALS: RequestCredentials =
//   typeof window !== 'undefined' && window.location.protocol === 'https:' ? 'include' : 'omit';
const FETCH_CREDENTIALS: RequestCredentials = 'include';

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = '/products-overview'; // ✅ Redirect to products page after login
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const [displayName, setDisplayName] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [pendingTenantId, setPendingTenantId] = useState<string | null>(null);

  // API URLs - USS tenant/user creation (NOT MDM)
  const CREATE_TENANT_URL =
    'https://yantramatrix-51nvouet.uc.gateway.dev/authenticationtest/api/v1/authentication/create-tenant';
  const CREATE_USER_URL =
    'https://yantramatrix-51nvouet.uc.gateway.dev/userControler/api/v1/user/create';
  const LOGIN_URL =
    'https://yantramatrix-51nvouet.uc.gateway.dev/authenticationtest/api/v1/authentication/login';

  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'signup') {
      setMode('signup');
    } else if (urlMode === 'login') {
      setMode('login');
    } else {
      setMode('login');
    }
  }, [searchParams]);

  // Animated background particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 2 + 0.5,
    }));

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0, 245, 255, 0.4)';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(0, 245, 255, 0.15)';
      ctx.lineWidth = 1;
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  const title = useMemo(() => {
    return mode === 'login' ? 'Welcome back' : 'Create your account';
  }, [mode]);

  const subtitle = useMemo(() => {
    return mode === 'login'
      ? 'Login securely to continue'
      : "Sign up to get started - we'll email you a password";
  }, [mode]);

  const validateSignup = () => {
    if (!displayName || !email) {
      setError('Please fill all required fields');
      return false;
    }
    if (displayName.length < 3) {
      setError('Display name must be at least 3 characters');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!tenantId || !email || !password) {
      setError('Please enter tenant ID, email and password');
      return false;
    }
    return true;
  };

  // USS SIGNUP FLOW
  const handleSignup = async () => {
    setError('');
    setMessage('');

    if (!validateSignup()) return;

    setLoading(true);

    try {
      let createdTenantId: string;

      if (pendingTenantId) {
        // Tenant already created in a previous attempt — skip Step 1
        createdTenantId = pendingTenantId;
        setMessage('Retrying account creation...');
      } else {
        // Step 1: Create USS Tenant
        setMessage('Creating your organization...');

        const tenantResponse = await fetch(CREATE_TENANT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: FETCH_CREDENTIALS,
          body: JSON.stringify({
            displayName: displayName.replace(/\s+/g, ''),
          }),
        });

        if (!tenantResponse.ok) {
          let errorMessage = 'Failed to create tenant';
          try {
            const errorData = await tenantResponse.json();
            errorMessage = errorData?.message || errorMessage;
          } catch {
            errorMessage = `Failed to create tenant (${tenantResponse.status})`;
          }
          throw new Error(errorMessage);
        }

        const tenantData = await tenantResponse.json();
        console.log('✅ USS Tenant created:', tenantData);

        const tenantName = tenantData?.tenantResponse?.name || tenantData?.name;
        if (!tenantName) {
          throw new Error('Tenant creation returned unexpected payload');
        }

        createdTenantId = tenantName.split('/').pop();
        console.log('✅ USS Tenant ID:', createdTenantId);
      }

      // Step 2: Create USS User
      setMessage('Creating your admin account...');

      const userResponse = await fetch(CREATE_USER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: FETCH_CREDENTIALS,
        body: JSON.stringify({
          tenantId: createdTenantId,
          displayName: displayName.replace(/\s+/g, ''),
          email: email,
          role: 'admin',
        }),
      });

      if (!userResponse.ok) {
        let errorMessage = 'Failed to create user account';
        try {
          const errorData = await userResponse.json();
          errorMessage = errorData?.message || errorMessage;
        } catch {
          errorMessage = `Failed to create user account (${userResponse.status})`;
        }
        // Tenant was created — save its ID so the user can retry Step 2 without creating a duplicate tenant
        setPendingTenantId(createdTenantId);
        throw new Error(errorMessage);
      }

      const userData = await userResponse.json();
      console.log('✅ USS User created:', userData);

      // Success — clear any pending retry state
      setPendingTenantId(null);
      setMessage(
        `✅ Account created successfully! A password has been sent to ${email}. Please check your inbox and login.`
      );

      setDisplayName('');
      setEmail('');

      setTimeout(() => {
        setMode('login');
        setTenantId(createdTenantId);
        setMessage('');
      }, 3000);
    } catch (err: any) {
      console.error('❌ USS Signup error:', err);
      setError(err?.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // USS LOGIN FLOW
  const handleLogin = async () => {
    setError('');
    setMessage('');

    if (!validateLogin()) return;

    setLoading(true);

    try {
      const loginResponse = await fetch(LOGIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: FETCH_CREDENTIALS, // receives HttpOnly auth cookie from server
        body: JSON.stringify({
          tenantId: tenantId,
          email: email,
          password: password,
        }),
      });

      if (!loginResponse.ok) {
        const errorData = await loginResponse.json();
        throw new Error(errorData?.message || 'Invalid credentials');
      }

      const loginData = await loginResponse.json();
      console.log('✅ USS Login successful:', loginData);

      // Map API response: user fields are nested under loginData.user
      const apiUser = loginData?.user ?? {};
      saveAuthData(
        {
          tenantId: apiUser?.tenantId || tenantId,
          displayName: apiUser?.displayName || '',
          email: apiUser?.email || email,
          role: apiUser?.role || 'admin',
          userId: apiUser?.uid || '',
          token: loginData?.token || '',
        },
        loginData?.refreshToken || ''
      );

      // Keep token in memory for explicit Bearer mode (deviceApi interceptor uses this)
      setAccessToken(loginData?.token || null);

      setMessage('✅ Login successful! Redirecting...');

      // ✅ Redirect back to USS (not MDM console)
      setTimeout(() => {
        router.push(redirect);
      }, 1000);
    } catch (err: any) {
      console.error('❌ USS Login error:', err);
      setError(err?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (mode === 'signup') {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#080b12] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-[#00f5ff]/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-[#00e676]/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="relative w-full max-w-md lg:max-w-lg">
        <div className="backdrop-blur-2xl bg-[#080b12]/80 border border-[#00f5ff]/20 rounded-2xl sm:rounded-3xl shadow-2xl shadow-[#00f5ff]/10 p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#00f5ff] via-white to-[#00e676] bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-white/60 mt-2 text-sm sm:text-base">{subtitle}</p>
          </div>

          {/* Alerts */}
          {pendingTenantId && (
            <div className="mb-4 sm:mb-6 rounded-xl border border-yellow-500/40 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300 backdrop-blur-sm">
              <p className="font-semibold mb-1">Your organization was created but account setup failed.</p>
              <p>Organization ID: <span className="font-mono text-yellow-200">{pendingTenantId}</span></p>
              <p className="mt-1">Please correct your email address and click <strong>Create Account</strong> to complete setup. Your organization name is reserved.</p>
            </div>
          )}

          {error && (
            <div className="mb-4 sm:mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 sm:mb-6 rounded-xl border border-[#00f5ff]/40 bg-[#00f5ff]/10 px-4 py-3 text-sm text-white backdrop-blur-sm">
              {message}
            </div>
          )}

          {/* Form */}
          <div className="space-y-3 sm:space-y-4">
            {/* Display Name / Organization Name (Signup only) */}
            {mode === 'signup' && (
              <div className="relative group">
                <input
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-[#00f5ff]/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Organization / Display Name"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-white/40 group-focus-within:text-[#00f5ff] transition-colors">
                  <Icon name="BuildingOfficeIcon" size={18} />
                </div>
              </div>
            )}

            {/* Tenant ID (Login only) */}
            {mode === 'login' && (
              <div className="relative group">
                <input
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-[#00f5ff]/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Tenant ID"
                  type="text"
                  value={tenantId}
                  onChange={(e) => setTenantId(e.target.value)}
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-4 text-white/40 group-focus-within:text-[#00f5ff] transition-colors">
                  <Icon name="BuildingOfficeIcon" size={18} />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="relative group">
              <input
                className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-[#00f5ff]/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 text-white/40 group-focus-within:text-[#00f5ff] transition-colors">
                <Icon name="EnvelopeIcon" size={18} />
              </div>
            </div>

            {/* Password (Login only) */}
            {mode === 'login' && (
              <div className="relative group">
                <input
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-[#00f5ff]/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00f5ff] focus:border-transparent transition-all pr-12 text-sm sm:text-base"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-white/40 hover:text-[#00f5ff] transition-colors"
                >
                  <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
                </button>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="relative group w-full px-4 py-3 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-[#00f5ff]/20 text-sm sm:text-base overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f5ff] to-[#0099dd]" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-[#080b12] flex items-center justify-center gap-2 font-bold">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Please wait...
                  </>
                ) : mode === 'login' ? (
                  <>
                    Login Securely
                    <Icon name="ArrowRightIcon" size={18} />
                  </>
                ) : (
                  <>
                    Create Account
                    <Icon name="ArrowRightIcon" size={18} />
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Switch Login/Signup */}
          <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-white/70">
            {mode === 'login' ? (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signup');
                    setError('');
                    setMessage('');
                    setDisplayName('');
                    setTenantId('');
                    setPassword('');
                    setPendingTenantId(null);
                  }}
                  className="text-[#00f5ff] font-semibold hover:underline transition"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => {
                    setMode('login');
                    setError('');
                    setMessage('');
                    setDisplayName('');
                    setPassword('');
                    setPendingTenantId(null);
                  }}
                  className="text-[#00f5ff] font-semibold hover:underline transition"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
