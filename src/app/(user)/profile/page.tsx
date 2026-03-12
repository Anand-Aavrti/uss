'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  User,
  Mail,
  Building2,
  Shield,
  Users,
  CreditCard,
  Link2,
  Activity,
  Settings,
  HelpCircle,
  LogOut,
  Camera,
  Check,
  Clock,
  MapPin,
  Phone,
  Globe,
  Key,
  Eye,
  EyeOff,
  Copy,
  CheckCircle,
  AlertCircle,
  Zap,
  FileText,
  Download,
  ArrowLeft,
  ArrowRight,
  Crown,
  Rocket,
  BarChart3
} from 'lucide-react';

/* ═══════════════════════════════════════════
   KEYFRAMES & STYLES
   ═══════════════════════════════════════════ */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&display=swap');

  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes scan {
    0%   { top:-2px; }
    100% { top:102%; }
  }
  @keyframes pulse {
    0%,100% { transform:scale(1); opacity:.8; }
    50%     { transform:scale(1.05); opacity:1; }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 20px rgba(0,245,255,.3); }
    50%     { box-shadow: 0 0 40px rgba(0,245,255,.5); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .profile-root { 
    font-family:'Rajdhani',sans-serif; 
    background:#080b12; 
    min-height:100vh;
    display:flex;
    overflow:hidden;
  }
  .mono { font-family:'Share Tech Mono',monospace; }

  .reveal { opacity:0; animation:fadeInUp .8s cubic-bezier(.22,1,.36,1) forwards; }
  .delay-1 { animation-delay:.1s; }
  .delay-2 { animation-delay:.2s; }
  .delay-3 { animation-delay:.3s; }
  .delay-4 { animation-delay:.4s; }
  .delay-5 { animation-delay:.5s; }

  .profile-card {
    background:linear-gradient(165deg, rgba(22,27,38,.7) 0%, rgba(12,15,22,.95) 100%);
    border:1px solid rgba(0,245,255,.15);
    border-radius:20px;
    padding:clamp(24px, 3vw, 32px);
    position:relative;
    overflow:hidden;
    transition:all .3s cubic-bezier(.22,1,.36,1);
  }
  .profile-card:hover {
    border-color:rgba(0,245,255,.3);
    box-shadow:0 10px 40px rgba(0,245,255,.1);
  }

  .sidebar {
    width:280px;
    background:linear-gradient(165deg, rgba(22,27,38,.9) 0%, rgba(12,15,22,1) 100%);
    border-right:1px solid rgba(0,245,255,.1);
    padding:24px;
    position:fixed;
    left:0;
    top:0;
    bottom:0;
    overflow-y:auto;
    z-index:100;
  }

  .nav-item {
    display:flex;
    align-items:center;
    gap:12px;
    padding:12px 16px;
    border-radius:12px;
    color:rgba(255,255,255,.7);
    cursor:pointer;
    transition:all .3s;
    font-weight:600;
    font-size:0.95rem;
    margin-bottom:4px;
  }
  .nav-item:hover {
    background:rgba(0,245,255,.1);
    color:#00f5ff;
    transform:translateX(4px);
  }
  .nav-item.active {
    background:rgba(0,245,255,.15);
    color:#00f5ff;
    border-left:3px solid #00f5ff;
    padding-left:13px;
  }

  .input-field {
    width:100%;
    padding:14px 16px;
    background:rgba(0,0,0,.3);
    border:1.5px solid rgba(0,245,255,.12);
    border-radius:12px;
    color:white;
    font-family:'Rajdhani',sans-serif;
    font-size:1rem;
    transition:all .3s;
  }
  .input-field:hover {
    background:rgba(0,0,0,.5);
    border-color:rgba(0,245,255,.4);
  }
  .input-field:focus {
    outline:none;
    background:rgba(0,0,0,.6);
    border-color:#00f5ff;
    border-width:2px;
    box-shadow:0 0 15px rgba(0,245,255,.3);
  }

  .service-card {
    background:linear-gradient(165deg, rgba(22,27,38,.6) 0%, rgba(12,15,22,.9) 100%);
    border:1px solid rgba(0,245,255,.12);
    border-radius:16px;
    padding:24px;
    position:relative;
    overflow:hidden;
    transition:all .3s;
  }
  .service-card:hover {
    border-color:rgba(0,245,255,.3);
    transform:translateY(-4px);
    box-shadow:0 12px 40px rgba(0,245,255,.15);
  }

  @media (max-width:1024px) {
    .sidebar {
      width:240px;
    }
  }

  @media (max-width:768px) {
    .sidebar {
      display:none; /* Mobile: implement hamburger menu */
    }
  }
`;

interface USSUser {
  displayName: string;
  email: string;
  tenantId: string;
  role: string;
  userId: string;
}

export default function USSProfile() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('profile');
  const [user, setUser] = useState<USSUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Read USS user from localStorage
  useEffect(() => {
    const ussUser = localStorage.getItem('uss_user');
    if (!ussUser) {
      // Not logged in, redirect to auth
      router.push('/auth?redirect=/profile');
      return;
    }
    
    try {
      setUser(JSON.parse(ussUser));
    } catch (error) {
      console.error('Failed to parse user data:', error);
      router.push('/auth?redirect=/profile');
      return;
    }
    
    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('uss_user');
    setShowLogoutConfirm(false);
    router.push('/home');
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
      return;
    }
    router.push('/products-overview');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#080b12] flex items-center justify-center">
        <div className="text-[#00f5ff] text-xl font-bold">Loading...</div>
      </div>
    );
  }

  const navItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'organization', icon: Building2, label: 'Organization' },
    { id: 'services', icon: Rocket, label: 'Services' },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
    { id: 'integrations', icon: Link2, label: 'Integrations' },
    { id: 'activity', icon: Activity, label: 'Activity' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'support', icon: HelpCircle, label: 'Support' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection user={user} />;
      case 'organization':
        return <OrganizationSection user={user} />;
      case 'services':
        return <ServicesSection user={user} />;
      case 'team':
        return <TeamSection />;
      case 'security':
        return <SecuritySection />;
      case 'billing':
        return <BillingSection />;
      default:
        return <ProfileSection user={user} />;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      
      <div className="profile-root">
        {/* Background Grid */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0,245,255,.01) 0px, transparent 1px, transparent 52px), repeating-linear-gradient(90deg, rgba(0,245,255,.01) 0px, transparent 1px, transparent 52px)',
            pointerEvents: 'none',
          }}
        />
        
        {/* Gradient Orbs */}
        <div
          style={{
            position: 'fixed',
            top: '10%',
            right: '-5%',
            width: '40%',
            height: '50%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,255,.08) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        {/* Sidebar */}
        <div className="sidebar">
          {/* Logo */}
          <div style={{ marginBottom: 32, paddingBottom: 24, borderBottom: '1px solid rgba(0,245,255,.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#080b12',
                }}
              >
                U
              </div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>USS</div>
                <div className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,.5)' }}>
                  Global Infrastructure
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav>
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <item.icon size={20} strokeWidth={2} />
                {item.label}
              </div>
            ))}
          </nav>

          {/* Logout */}
          <div style={{ marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(0,245,255,.1)' }}>
            <button
              onClick={handleBack}
              className="nav-item"
              style={{ width: '100%', justifyContent: 'flex-start', color: '#00f5ff' }}
            >
              <ArrowLeft size={20} strokeWidth={2} />
              Back
            </button>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="nav-item"
              style={{ width: '100%', justifyContent: 'flex-start', color: '#ff4081' }}
            >
              <LogOut size={20} strokeWidth={2} />
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ marginLeft: 280, flex: 1, padding: 'clamp(24px, 4vw, 48px)', position: 'relative', zIndex: 1 }}>
          {renderContent()}
        </div>

        {/* Logout Confirmation Dialog */}
        {showLogoutConfirm && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,.7)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              animation: 'fadeInUp .3s ease-out',
            }}
            onClick={() => setShowLogoutConfirm(false)}
          >
            <div
              style={{
                background: 'linear-gradient(165deg, rgba(22,27,38,.95) 0%, rgba(12,15,22,1) 100%)',
                border: '1px solid rgba(0,245,255,.3)',
                borderRadius: 20,
                padding: 32,
                maxWidth: 440,
                width: '90%',
                position: 'relative',
                boxShadow: '0 20px 60px rgba(0,0,0,.5)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Icon */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(255,64,129,.15)',
                  border: '2px solid rgba(255,64,129,.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                <LogOut size={32} color="#ff4081" strokeWidth={2} />
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: '1.6rem',
                  fontWeight: 700,
                  color: '#fff',
                  textAlign: 'center',
                  marginBottom: 12,
                }}
              >
                Sign Out
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: '1rem',
                  color: 'rgba(255,255,255,.7)',
                  textAlign: 'center',
                  marginBottom: 32,
                  lineHeight: 1.6,
                }}
              >
                Are you sure you want to sign out? You'll need to login again to access your account.
              </p>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: 'rgba(255,255,255,.05)',
                    border: '1px solid rgba(255,255,255,.2)',
                    borderRadius: 12,
                    color: 'rgba(255,255,255,.9)',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all .3s',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,.05)';
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  style={{
                    flex: 1,
                    padding: '12px 24px',
                    background: 'linear-gradient(135deg, #ff4081, #e91e63)',
                    border: 'none',
                    borderRadius: 12,
                    color: '#fff',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all .3s',
                    fontFamily: 'Rajdhani, sans-serif',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,64,129,.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   PROFILE SECTION
   ═══════════════════════════════════════════ */
function ProfileSection({ user }: { user: USSUser }) {
  const displayName = (user.displayName ?? '').trim();
  const avatarInitial = displayName ? displayName.charAt(0).toUpperCase() : '?';
  const roleLabel = (user.role ?? 'user').toUpperCase();

  return (
    <div>
      {/* Header */}
      <div className="reveal delay-1" style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 8,
          }}
        >
          My Profile
        </h1>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem' }}>
          Manage your account information and preferences
        </p>
      </div>

      {/* Profile Card */}
      <div className="profile-card reveal delay-2" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: 20,
                background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                fontWeight: 700,
                color: '#080b12',
                border: '3px solid rgba(0,245,255,.3)',
              }}
            >
              {avatarInitial}
            </div>
            <button
              style={{
                position: 'absolute',
                bottom: -8,
                right: -8,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
                border: '2px solid #080b12',
                color: '#080b12',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all .3s',
              }}
            >
              <Camera size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                {displayName || 'Unnamed User'}
              </h2>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  background: 'rgba(0,245,255,.15)',
                  border: '1px solid rgba(0,245,255,.3)',
                  borderRadius: 20,
                  padding: '4px 12px',
                }}
              >
                <Crown size={14} color="#00f5ff" strokeWidth={2.5} />
                <span className="mono" style={{ fontSize: 10, color: '#00f5ff', fontWeight: 600 }}>
                  {roleLabel}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={16} color="rgba(255,255,255,.5)" />
                <span style={{ color: 'rgba(255,255,255,.7)' }}>{user.email}</span>
                <CheckCircle size={14} color="#00e676" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Building2 size={16} color="rgba(255,255,255,.5)" />
                <span style={{ color: 'rgba(255,255,255,.7)' }}>Tenant ID: {user.tenantId}</span>
              </div>
            </div>

            <button
              className="mono"
              style={{
                padding: '10px 20px',
                background: 'rgba(0,245,255,.1)',
                border: '1px solid rgba(0,245,255,.3)',
                borderRadius: 10,
                color: '#00f5ff',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all .3s',
              }}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Personal Details Form */}
      <div className="profile-card reveal delay-3">
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
          Personal Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Display Name *
            </label>
            <input type="text" className="input-field" defaultValue={displayName} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Email Address *
            </label>
            <input type="email" className="input-field" defaultValue={user.email} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Phone Number
            </label>
            <input type="tel" className="input-field" placeholder="+1 (555) 000-0000" />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Timezone
            </label>
            <select className="input-field">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>Central Time (CT)</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid rgba(0,245,255,.1)' }}>
          <button
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
              color: '#080b12',
              border: 'none',
              borderRadius: 10,
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
              transition: 'all .3s',
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ORGANIZATION SECTION
   ═══════════════════════════════════════════ */
function OrganizationSection({ user }: { user: USSUser }) {
  return (
    <div>
      <div className="reveal delay-1" style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 8,
          }}
        >
          Organization
        </h1>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem' }}>
          Manage your organization settings and details
        </p>
      </div>

      <div className="profile-card reveal delay-2">
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
          Organization Details
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Organization Name
            </label>
            <input type="text" className="input-field" defaultValue={user.displayName} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Tenant ID
            </label>
            <input type="text" className="input-field" value={user.tenantId} disabled style={{ opacity: 0.6 }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Industry
            </label>
            <select className="input-field">
              <option>Select Industry</option>
              <option>Technology</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Retail</option>
              <option>Manufacturing</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Company Size
            </label>
            <select className="input-field">
              <option>1-50 employees</option>
              <option>51-200 employees</option>
              <option>201-500 employees</option>
              <option>500+ employees</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Website
            </label>
            <input type="url" className="input-field" placeholder="https://example.com" />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: 600, color: 'rgba(255,255,255,.7)', marginBottom: 8 }}>
              Primary Contact Phone
            </label>
            <input type="tel" className="input-field" placeholder="+1 (555) 000-0000" />
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <button
            style={{
              padding: '12px 28px',
              background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
              color: '#080b12',
              border: 'none',
              borderRadius: 10,
              fontSize: '1rem',
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'Rajdhani, sans-serif',
            }}
          >
            Update Organization
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SERVICES SECTION
   ═══════════════════════════════════════════ */
function ServicesSection({ user }: { user: USSUser }) {
  const services = [
    {
      name: 'MDM',
      fullName: 'Mobile Device Management',
      description: 'Manage and secure all your mobile devices',
      icon: Shield,
      status: 'active',
      usage: '45/50 devices',
      color: '#00f5ff',
    },
    {
      name: 'CMS',
      fullName: 'Content Management System',
      description: 'Create and manage your digital content',
      icon: FileText,
      status: 'inactive',
      usage: 'Not activated',
      color: '#00e676',
    },
    {
      name: 'Analytics',
      fullName: 'Business Analytics',
      description: 'Advanced data analytics and insights',
      icon: BarChart3,
      status: 'inactive',
      usage: 'Not activated',
      color: '#ffb300',
    },
  ];

  return (
    <div>
      <div className="reveal delay-1" style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 'clamp(2rem, 4vw, 2.8rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 8,
          }}
        >
          USS Services
        </h1>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem' }}>
          Activate and manage your USS services
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {services.map((service, i) => (
          <div key={service.name} className={`service-card reveal delay-${i + 2}`}>
            {/* Icon */}
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${service.color}22, ${service.color}08)`,
                border: `2px solid ${service.color}44`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
              }}
            >
              <service.icon size={32} color={service.color} strokeWidth={2} />
            </div>

            {/* Status Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: service.status === 'active' ? 'rgba(0,230,118,.15)' : 'rgba(255,255,255,.05)',
                border: `1px solid ${service.status === 'active' ? 'rgba(0,230,118,.3)' : 'rgba(255,255,255,.1)'}`,
                borderRadius: 20,
                padding: '4px 12px',
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: service.status === 'active' ? '#00e676' : 'rgba(255,255,255,.5)',
                }}
              />
              <span
                className="mono"
                style={{
                  fontSize: 10,
                  color: service.status === 'active' ? '#00e676' : 'rgba(255,255,255,.7)',
                  fontWeight: 600,
                }}
              >
                {service.status === 'active' ? 'ACTIVE' : 'INACTIVE'}
              </span>
            </div>

            {/* Title */}
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              {service.name}
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,.5)', marginBottom: 4 }}>
              {service.fullName}
            </p>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,.7)', marginBottom: 16 }}>
              {service.description}
            </p>

            {/* Usage */}
            <div
              className="mono"
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,.6)',
                marginBottom: 20,
              }}
            >
              {service.usage}
            </div>

            {/* Actions */}
            {service.status === 'active' ? (
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    background: 'rgba(0,245,255,.1)',
                    border: '1px solid rgba(0,245,255,.3)',
                    borderRadius: 10,
                    color: '#00f5ff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Manage
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: '10px 16px',
                    background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
                    border: 'none',
                    borderRadius: 10,
                    color: '#080b12',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  Console
                  <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            ) : (
              <button
                style={{
                  width: '100%',
                  padding: '10px 16px',
                  background: 'rgba(0,245,255,.1)',
                  border: '1px solid rgba(0,245,255,.3)',
                  borderRadius: 10,
                  color: '#00f5ff',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Rocket size={16} />
                Activate Service
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   TEAM SECTION
   ═══════════════════════════════════════════ */
function TeamSection() {
  return (
    <div>
      <div className="reveal delay-1" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
          Team Management
        </h1>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem' }}>
          Invite and manage team members
        </p>
      </div>

      <div className="profile-card reveal delay-2">
        <p style={{ color: 'rgba(255,255,255,.7)', textAlign: 'center', padding: '40px 20px' }}>
          Team management coming soon...
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECURITY SECTION
   ═══════════════════════════════════════════ */
function SecuritySection() {
  return (
    <div>
      <div className="reveal delay-1" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
          Security
        </h1>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem' }}>
          Manage your account security settings
        </p>
      </div>

      <div className="profile-card reveal delay-2">
        <p style={{ color: 'rgba(255,255,255,.7)', textAlign: 'center', padding: '40px 20px' }}>
          Security settings coming soon...
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BILLING SECTION
   ═══════════════════════════════════════════ */
function BillingSection() {
  return (
    <div>
      <div className="reveal delay-1" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 700, color: '#fff', marginBottom: 8 }}>
          Billing & Subscription
        </h1>
        <p style={{ color: 'rgba(255,255,255,.6)', fontSize: '1.05rem' }}>
          Manage your subscription and billing information
        </p>
      </div>

      <div className="profile-card reveal delay-2">
        <p style={{ color: 'rgba(255,255,255,.7)', textAlign: 'center', padding: '40px 20px' }}>
          Billing information coming soon...
        </p>
      </div>
    </div>
  );
}
