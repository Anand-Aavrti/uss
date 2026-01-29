'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  reload,
  signOut,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';
import Icon from '@/components/ui/AppIcon';

const isFirebaseConfigured = !!auth;

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [pendingVerification, setPendingVerification] = useState(false);

  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'signup') setMode('signup');
    if (urlMode === 'login') setMode('login');
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
      ctx.fillStyle = 'rgba(14, 165, 233, 0.4)';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(14, 165, 233, 0.15)';
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
      : 'Sign up and verify your email to activate your account';
  }, [mode]);

  const validateSignup = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill all required fields');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    if (!email || !password) {
      setError('Please enter email and password');
      return false;
    }
    return true;
  };

  const handleGoogleAuth = async () => {
    if (!auth) {
      setError('Firebase is not configured. Please add Firebase credentials.');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      if (!result.user.emailVerified) {
        setMessage('Signed in, but email is not verified.');
      }

      router.push('/home');
    } catch (err: any) {
      setError(err?.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    if (!auth) {
      setError('Firebase is not configured. Please add Firebase credentials.');
      return;
    }
    setError('');
    setMessage('');

    if (mode === 'signup') {
      if (!validateSignup()) return;
    } else {
      if (!validateLogin()) return;
    }

    setLoading(true);

    try {
      if (mode === 'signup') {
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification(cred.user);
        await signOut(auth);

        setPendingVerification(true);
        setMessage(
          '✅ Verification email sent. Please verify your email to activate your account.'
        );
        return;
      }

      const cred = await signInWithEmailAndPassword(auth, email, password);

      if (!cred.user.emailVerified) {
        await signOut(auth);
        setPendingVerification(true);
        setError('❌ Email not verified. Please verify your email to continue.');
        return;
      }

      router.push('/home');
    } catch (err: any) {
      setError(err?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    if (!auth) {
      setError('Firebase is not configured. Please add Firebase credentials.');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);

      if (cred.user.emailVerified) {
        setMessage('✅ Your email is already verified. You can login now.');
        router.push('/home');
        return;
      }

      await sendEmailVerification(cred.user);
      await signOut(auth);

      setMessage('✅ Verification email re-sent. Please check your inbox.');
    } catch (err: any) {
      setError(err?.message || 'Could not resend verification email');
    } finally {
      setLoading(false);
    }
  };

  const checkVerificationStatus = async () => {
    if (!auth) {
      setError('Firebase is not configured. Please add Firebase credentials.');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      await reload(cred.user);

      if (cred.user.emailVerified) {
        setMessage('✅ Email verified successfully! Redirecting...');
        router.push('/home');
      } else {
        await signOut(auth);
        setError('❌ Still not verified. Please verify from your email link.');
      }
    } catch (err: any) {
      setError(err?.message || 'Unable to check verification status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1220] flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12 relative overflow-hidden">
      {/* Animated Canvas Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-50" />

      {/* Gradient Orbs */}
      <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 h-48 sm:w-96 sm:h-96 bg-[#0EA5E9]/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 h-48 sm:w-96 sm:h-96 bg-[#1B365D]/30 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />

      <div className="relative w-full max-w-md lg:max-w-lg">
        <div className="backdrop-blur-2xl bg-[#0B1220]/80 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-[#0EA5E9]/10 p-6 sm:p-8 lg:p-10">
          {/* Header */}
          <div className="mb-6 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {title}
            </h1>
            <p className="text-white/60 mt-2 text-sm sm:text-base">{subtitle}</p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-4 sm:mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400 backdrop-blur-sm">
              {error}
            </div>
          )}

          {message && (
            <div className="mb-4 sm:mb-6 rounded-xl border border-[#0EA5E9]/40 bg-[#0EA5E9]/10 px-4 py-3 text-sm text-white backdrop-blur-sm">
              {message}
            </div>
          )}

          {/* Google Button */}
          <button
            onClick={handleGoogleAuth}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-xl border border-white/20 bg-white hover:bg-white/90 transition-all duration-300 font-semibold text-[#0B1220] text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <svg width="20" height="20" viewBox="0 0 48 48" className="sm:w-[22px] sm:h-[22px]">
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.814 32.659 29.282 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.99 6.053 29.808 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 14 24 14c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C34.99 6.053 29.808 4 24 4c-7.682 0-14.41 4.337-17.694 10.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.177 0 10.264-1.977 13.956-5.674l-6.43-5.432C29.48 34.991 26.824 36 24 36c-5.259 0-9.773-3.317-11.27-7.946l-6.522 5.025C9.445 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303c-.719 2.047-2.03 3.831-3.777 5.198l.003-.002 6.43 5.432C36.784 40.302 44 36 44 24c0-1.341-.138-2.651-.389-3.917z"
              />
            </svg>

            <span>{loading ? 'Please wait...' : 'Continue with Google'}</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5 sm:my-6">
            <div className="h-px bg-white/20 flex-1" />
            <span className="text-xs sm:text-sm text-white/60 font-medium">OR</span>
            <div className="h-px bg-white/20 flex-1" />
          </div>

          {/* Inputs */}
          <div className="space-y-3 sm:space-y-4">
            {/* Email */}
            <div className="relative group">
              <input
                className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all text-sm sm:text-base"
                placeholder="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute top-1/2 -translate-y-1/2 right-4 text-white/40 group-focus-within:text-[#0EA5E9] transition-colors">
                <Icon name="EnvelopeIcon" size={18} />
              </div>
            </div>

            {/* Password */}
            <div className="relative group">
              <input
                className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all pr-12 text-sm sm:text-base"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute top-1/2 -translate-y-1/2 right-4 text-white/40 hover:text-[#0EA5E9] transition-colors"
              >
                <Icon name={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
              </button>
            </div>

            {/* Confirm Password (Signup only) */}
            {mode === 'signup' && (
              <div className="relative group">
                <input
                  className="w-full px-4 py-3 sm:py-3.5 rounded-xl border border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9] focus:border-transparent transition-all pr-12 text-sm sm:text-base"
                  placeholder="Confirm password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-white/40 hover:text-[#0EA5E9] transition-colors"
                >
                  <Icon name={showConfirmPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
                </button>
              </div>
            )}

            {/* Main Submit */}
            <button
              onClick={handleEmailAuth}
              disabled={loading}
              className="relative group w-full px-4 py-3 sm:py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-[#0EA5E9]/20 text-sm sm:text-base overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9] to-[#1B365D]" />
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white flex items-center justify-center gap-2">
                {loading
                  ? 'Please wait...'
                  : mode === 'login'
                    ? 'Login Securely'
                    : 'Create Account'}
                <Icon
                  name="ArrowRightIcon"
                  size={18}
                  className="transform group-hover:translate-x-1 transition-transform"
                />
              </span>
            </button>
          </div>

          {/* Email Verification Panel */}
          {pendingVerification && (
            <div className="mt-5 sm:mt-6 rounded-xl border border-[#0EA5E9]/30 bg-[#0EA5E9]/5 p-4 sm:p-5 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 text-[#0EA5E9] flex-shrink-0">
                  <Icon name="ShieldCheckIcon" size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm sm:text-base font-semibold text-white">
                    Email Verification Required
                  </p>
                  <p className="text-xs sm:text-sm text-white/70 mt-1">
                    We sent a verification link to your email. Please verify, then come back and
                    press "I Verified".
                  </p>

                  <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={checkVerificationStatus}
                      disabled={loading}
                      className="px-4 py-2.5 rounded-lg bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                      I Verified ✅
                    </button>

                    <button
                      onClick={resendVerification}
                      disabled={loading}
                      className="px-4 py-2.5 rounded-lg border border-white/20 text-white text-sm font-semibold hover:bg-white/5 transition disabled:opacity-50"
                    >
                      Resend Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Switch Login/Signup */}
          <div className="mt-6 sm:mt-8 text-center text-sm sm:text-base text-white/70">
            {mode === 'login' ? (
              <p>
                Don&apos;t have an account?{' '}
                <button
                  onClick={() => {
                    setMode('signup');
                    setPendingVerification(false);
                    setError('');
                    setMessage('');
                  }}
                  className="text-[#0EA5E9] font-semibold hover:underline transition"
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
                    setPendingVerification(false);
                    setError('');
                    setMessage('');
                  }}
                  className="text-[#0EA5E9] font-semibold hover:underline transition"
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
