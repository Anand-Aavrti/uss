'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Building2,
  Shield,
  CreditCard,
  Bell,
  Settings,
  Users,
  Key,
  Link2,
  HelpCircle,
  Activity,
  Smartphone,
  Lock,
  Globe,
  Calendar,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  Zap,
  BarChart3,
  FileText,
  Download,
  Eye,
  EyeOff,
  Copy,
  Check,
  ArrowRight,
  AlertTriangle,
  Crown,
  Briefcase,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   KEYFRAMES & STYLES
   ═══════════════════════════════════════════ */
const CSS = `
 
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
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes ping {
    0%   { transform:scale(1); opacity:.7; }
    100% { transform:scale(2.5); opacity:0; }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 20px rgba(255,183,0,.3); }
    50%     { box-shadow: 0 0 40px rgba(255,183,0,.5); }
  }

  .profile-root { 

    background:#080b12; 
    position:relative; 
    overflow:hidden;
    padding:40px 24px;
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
    position:sticky;
    top:120px;
    background:linear-gradient(165deg, rgba(22,27,38,.7) 0%, rgba(12,15,22,.95) 100%);
    border:1px solid rgba(0,245,255,.15);
    border-radius:20px;
    padding:24px;
    height:fit-content;
  }

  .nav-item {
    display:flex;
    align-items:center;
    gap:12px;
    padding:12px 16px;
    border-radius:10px;
    color:rgba(255,255,255,.7);
    cursor:pointer;
    transition:all .3s;
    font-weight:600;
    font-size:0.95rem;
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

  .stat-card {
    background:rgba(255,255,255,.03);
    border:1px solid rgba(0,245,255,.12);
    border-radius:14px;
    padding:20px;
    transition:all .3s;
  }
  .stat-card:hover {
    background:rgba(0,245,255,.08);
    border-color:rgba(0,245,255,.3);
    transform:translateY(-4px);
  }

  .team-member {
    display:flex;
    align-items:center;
    gap:16px;
    padding:16px;
    background:rgba(255,255,255,.02);
    border:1px solid rgba(0,245,255,.08);
    border-radius:12px;
    transition:all .3s;
  }
  .team-member:hover {
    background:rgba(0,245,255,.06);
    border-color:rgba(0,245,255,.25);
    transform:translateX(4px);
  }

  .input-field {
    width:100%;
    padding:14px 16px;
    background:rgba(0,0,0,.3);
    border:1.5px solid rgba(0,245,255,.12);
    border-radius:12px;
    color:white;
    
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

  .toggle-switch {
    width:48px;
    height:24px;
    background:rgba(255,255,255,.1);
    border-radius:12px;
    position:relative;
    cursor:pointer;
    transition:all .3s;
  }
  .toggle-switch.active {
    background:#00f5ff;
  }
  .toggle-switch::after {
    content:'';
    position:absolute;
    width:18px;
    height:18px;
    background:white;
    border-radius:50%;
    top:3px;
    left:3px;
    transition:all .3s;
  }
  .toggle-switch.active::after {
    left:27px;
  }

  @media (max-width:1024px) {
    .profile-layout {
      grid-template-columns:1fr !important;
    }
    .sidebar {
      position:relative !important;
      top:0 !important;
    }
  }
`;

/* ═══════════════════════════════════════════
   TRIAL STATUS BANNER
   ═══════════════════════════════════════════ */
function TrialBanner() {
  const daysLeft = 14;
  const progress = (daysLeft / 30) * 100;

  return (
    <div
      className="reveal delay-1"
      style={{
        background: 'linear-gradient(135deg, rgba(255,183,0,.15), rgba(255,107,0,.15))',
        border: '2px solid rgba(255,183,0,.4)',
        borderRadius: 20,
        padding: '24px 32px',
        marginBottom: 40,
        position: 'relative',
        overflow: 'hidden',
        animation: 'glow 2s ease-in-out infinite',
      }}
    >
  

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
        }}
      >
        {/* Left - Trial Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <Crown size={24} color="#ffb300" strokeWidth={2.5} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: 0 }}>
              Professional Trial
            </h3>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
            <span className="mono" style={{ fontSize: 14, color: 'rgba(255,255,255,.8)' }}>
              <AlertTriangle size={16} style={{ display: 'inline', marginRight: 6 }} />
              {daysLeft} days remaining
            </span>
            <span className="mono" style={{ fontSize: 14, color: 'rgba(255,255,255,.6)' }}>
              • Trial ends Feb 25, 2026
            </span>
          </div>

          {/* Progress bar */}
          <div
            style={{
              width: 280,
              height: 6,
              background: 'rgba(0,0,0,.3)',
              borderRadius: 3,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #ffb300, #ff9100)',
                borderRadius: 3,
                transition: 'width .5s',
              }}
            />
          </div>
        </div>

        {/* Right - Usage Stats */}
        <div style={{ display: 'flex', gap: 32 }}>
          <div>
            <div
              className="mono"
              style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}
            >
              DEVICES
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#00f5ff' }}>
              45<span style={{ fontSize: '1rem', color: 'rgba(255,255,255,.5)' }}>/50</span>
            </div>
          </div>
          <div>
            <div
              className="mono"
              style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}
            >
              USERS
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#00e676' }}>
              8<span style={{ fontSize: '1rem', color: 'rgba(255,255,255,.5)' }}>/25</span>
            </div>
          </div>
          <div>
            <div
              className="mono"
              style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}
            >
              API CALLS
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#ffb300' }}>
              12.4K<span style={{ fontSize: '1rem', color: 'rgba(255,255,255,.5)' }}>/50K</span>
            </div>
          </div>
        </div>

        {/* Upgrade Button */}
        <button
          style={{
            padding: '14px 32px',
            background: 'linear-gradient(135deg, #ffb300, #ff9100)',
            color: '#080b12',
            border: 'none',
            borderRadius: 12,
            fontSize: '1.05rem',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            transition: 'all .3s',
            
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(255,183,0,.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Upgrade Now
          <ArrowRight size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SIDEBAR NAVIGATION
   ═══════════════════════════════════════════ */
function Sidebar({ activeSection, setActiveSection }) {
  const navItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'organization', icon: Building2, label: 'Organization' },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
    { id: 'integrations', icon: Link2, label: 'Integrations' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
    { id: 'support', icon: HelpCircle, label: 'Support' },
  ];

  return (
    <div className="sidebar reveal delay-2">
      <div
        style={{
          marginBottom: 24,
          paddingBottom: 20,
          borderBottom: '1px solid rgba(0,245,255,.1)',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
          Account Settings
        </h3>
        <p className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>
          Manage your profile and preferences
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
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
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PROFILE SECTION
   ═══════════════════════════════════════════ */
function ProfileSection() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      {/* Profile Header */}
      <div className="profile-card" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
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
              JD
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
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <User size={18} strokeWidth={2.5} />
            </button>
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                John Doe
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
                <CheckCircle size={14} color="#00f5ff" strokeWidth={2.5} />
                <span className="mono" style={{ fontSize: 10, color: '#00f5ff', fontWeight: 600 }}>
                  ORGANIZATION ADMIN
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={16} color="rgba(255,255,255,.5)" />
                <span style={{ color: 'rgba(255,255,255,.7)' }}>john.doe@acmecorp.com</span>
                <CheckCircle size={14} color="#00e676" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Briefcase size={16} color="rgba(255,255,255,.5)" />
                <span style={{ color: 'rgba(255,255,255,.7)' }}>Chief Technology Officer</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Building2 size={16} color="rgba(255,255,255,.5)" />
                <span style={{ color: 'rgba(255,255,255,.7)' }}>Acme Corporation</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
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
              <button
                className="mono"
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,.04)',
                  border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: 10,
                  color: 'rgba(255,255,255,.7)',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all .3s',
                }}
              >
                View Public Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Form */}
      <div className="profile-card">
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
          Personal Information
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Full Name *
            </label>
            <input type="text" className="input-field" value="John Doe" />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Email Address *
            </label>
            <input type="email" className="input-field" value="john.doe@acmecorp.com" />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Job Title
            </label>
            <input type="text" className="input-field" value="Chief Technology Officer" />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Phone Number
            </label>
            <input type="tel" className="input-field" value="+1 (415) 555-0123" />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Timezone
            </label>
            <select className="input-field">
              <option>Pacific Time (PT)</option>
              <option>Eastern Time (ET)</option>
              <option>Central Time (CT)</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Language
            </label>
            <select className="input-field">
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(0,245,255,.1)' }}>
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
function OrganizationSection() {
  return (
    <div>
      <div className="profile-card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
          Organization Overview
        </h3>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
            marginBottom: 32,
          }}
        >
          {[
            { label: 'Total Devices', value: '45', color: '#00f5ff', icon: Smartphone },
            { label: 'Active Policies', value: '12', color: '#00e676', icon: Shield },
            { label: 'Compliance Rate', value: '96%', color: '#ffb300', icon: CheckCircle },
            { label: 'Critical Alerts', value: '1', color: '#ff4081', icon: AlertCircle },
          ].map((stat, i) => (
            <div key={i} className="stat-card">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                }}
              >
                <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>
                  {stat.label}
                </span>
                <stat.icon size={20} color={stat.color} />
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Platform Distribution */}
        <div>
          <h4 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', marginBottom: 16 }}>
            Platform Distribution
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { platform: 'Android', count: 20, total: 45, color: '#00e676' },
              { platform: 'iOS', count: 18, total: 45, color: '#00f5ff' },
              { platform: 'Windows', count: 7, total: 45, color: '#ffb300' },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ color: 'rgba(255,255,255,.8)', fontWeight: 600 }}>
                    {item.platform}
                  </span>
                  <span
                    className="mono"
                    style={{ color: 'rgba(255,255,255,.6)', fontSize: '0.9rem' }}
                  >
                    {item.count} devices ({Math.round((item.count / item.total) * 100)}%)
                  </span>
                </div>
                <div
                  style={{
                    height: 8,
                    background: 'rgba(0,0,0,.3)',
                    borderRadius: 4,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${(item.count / item.total) * 100}%`,
                      height: '100%',
                      background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                      borderRadius: 4,
                      transition: 'width .5s',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Company Details */}
      <div className="profile-card">
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
          Company Details
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Company Name
            </label>
            <input type="text" className="input-field" value="Acme Corporation" />
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Industry
            </label>
            <select className="input-field">
              <option>SaaS / Technology</option>
              <option>Finance & Banking</option>
              <option>Healthcare</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Company Size
            </label>
            <select className="input-field">
              <option>100-500 employees</option>
              <option>500-1000 employees</option>
              <option>1000+ employees</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Website
            </label>
            <input type="url" className="input-field" value="https://acmecorp.com" />
          </div>

          <div style={{ gridColumn: 'span 2' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'rgba(255,255,255,.7)',
                marginBottom: 8,
              }}
            >
              Primary Business Address
            </label>
            <input
              type="text"
              className="input-field"
              value="123 Tech Street, San Francisco, CA 94105"
            />
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
   TEAM SECTION
   ═══════════════════════════════════════════ */
function TeamSection() {
  const teamMembers = [
    {
      name: 'John Doe',
      email: 'john.doe@acmecorp.com',
      role: 'Admin',
      status: 'Active',
      lastActive: '2 mins ago',
    },
    {
      name: 'Jane Smith',
      email: 'jane.smith@acmecorp.com',
      role: 'Manager',
      status: 'Active',
      lastActive: '1 hour ago',
    },
    {
      name: 'Mike Johnson',
      email: 'mike.j@acmecorp.com',
      role: 'Viewer',
      status: 'Active',
      lastActive: '3 hours ago',
    },
    {
      name: 'Sarah Williams',
      email: 'sarah.w@acmecorp.com',
      role: 'Manager',
      status: 'Invited',
      lastActive: 'Never',
    },
  ];

  return (
    <div className="profile-card">
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            Team Members
          </h3>
          <p className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>
            8 / 25 seats used
          </p>
        </div>
        <button
          style={{
            padding: '12px 24px',
            background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
            color: '#080b12',
            border: 'none',
            borderRadius: 10,
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <Users size={18} strokeWidth={2.5} />
          Invite Member
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {teamMembers.map((member, i) => (
          <div key={i} className="team-member">
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                fontWeight: 700,
                color: '#080b12',
                flexShrink: 0,
              }}
            >
              {member.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#fff', marginBottom: 2 }}>{member.name}</div>
              <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>
                {member.email}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  background:
                    member.role === 'Admin' ? 'rgba(0,245,255,.15)' : 'rgba(255,255,255,.1)',
                  border: `1px solid ${member.role === 'Admin' ? 'rgba(0,245,255,.3)' : 'rgba(255,255,255,.2)'}`,
                  borderRadius: 20,
                  fontSize: 11,
                  fontWeight: 600,
                  color: member.role === 'Admin' ? '#00f5ff' : 'rgba(255,255,255,.7)',
                }}
                className="mono"
              >
                {member.role}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  color: member.status === 'Active' ? '#00e676' : '#ffb300',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: member.status === 'Active' ? '#00e676' : '#ffb300',
                  }}
                />
                {member.status}
              </div>
              <div
                className="mono"
                style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 2 }}
              >
                {member.lastActive}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECURITY SECTION
   ═══════════════════════════════════════════ */
function SecuritySection() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState(false);

  const apiKey = process.env.NEXT_PUBLIC_STRIPE_API_KEY || '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      {/* Security Overview */}
      <div className="profile-card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
          Security Overview
        </h3>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 20,
          }}
        >
          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Lock size={20} color="#00e676" />
              <span style={{ fontWeight: 600, color: 'rgba(255,255,255,.8)' }}>
                Two-Factor Auth
              </span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#00e676' }}>Enabled</div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Clock size={20} color="#00f5ff" />
              <span style={{ fontWeight: 600, color: 'rgba(255,255,255,.8)' }}>
                Last Password Change
              </span>
            </div>
            <div className="mono" style={{ fontSize: '1rem', color: 'rgba(255,255,255,.7)' }}>
              14 days ago
            </div>
          </div>

          <div className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Activity size={20} color="#ffb300" />
              <span style={{ fontWeight: 600, color: 'rgba(255,255,255,.8)' }}>
                Active Sessions
              </span>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffb300' }}>2</div>
          </div>
        </div>
      </div>

      {/* Password & 2FA */}
      <div className="profile-card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
          Password & Authentication
        </h3>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            background: 'rgba(255,255,255,.02)',
            borderRadius: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <div style={{ fontWeight: 600, color: '#fff', marginBottom: 4 }}>
              Two-Factor Authentication
            </div>
            <div className="mono" style={{ fontSize: 12, color: 'rgba(255,255,255,.5)' }}>
              Add an extra layer of security to your account
            </div>
          </div>
          <div
            className={`toggle-switch ${twoFactorEnabled ? 'active' : ''}`}
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
          />
        </div>

        <button
          style={{
            padding: '12px 24px',
            background: 'rgba(0,245,255,.1)',
            border: '1px solid rgba(0,245,255,.3)',
            borderRadius: 10,
            color: '#00f5ff',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            
          }}
        >
          Change Password
        </button>
      </div>

      {/* API Access */}
      <div className="profile-card">
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
          API Access
        </h3>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.95rem',
              fontWeight: 600,
              color: 'rgba(255,255,255,.7)',
              marginBottom: 8,
            }}
          >
            API Key
          </label>
          <div style={{ display: 'flex', gap: 12 }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <input
                type={showApiKey ? 'text' : 'password'}
                className="input-field"
                value={apiKey}
                readOnly
                style={{ paddingRight: 100 }}
              />
              <div
                style={{
                  position: 'absolute',
                  right: 12,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  display: 'flex',
                  gap: 8,
                }}
              >
                <button
                  onClick={() => setShowApiKey(!showApiKey)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'rgba(255,255,255,.5)',
                    cursor: 'pointer',
                    padding: 4,
                  }}
                >
                  {showApiKey ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                <button
                  onClick={copyToClipboard}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: copied ? '#00e676' : 'rgba(255,255,255,.5)',
                    cursor: 'pointer',
                    padding: 4,
                  }}
                >
                  {copied ? <Check size={20} /> : <Copy size={20} />}
                </button>
              </div>
            </div>
            <button
              style={{
                padding: '12px 24px',
                background: 'rgba(255,107,157,.1)',
                border: '1px solid rgba(255,107,157,.3)',
                borderRadius: 10,
                color: '#ff6b9d',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: 'pointer',
                
                whiteSpace: 'nowrap',
              }}
            >
              Regenerate
            </button>
          </div>
          <p className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.5)', marginTop: 8 }}>
            Keep your API key secure. It has full access to your account.
          </p>
        </div>

        <div style={{ marginTop: 24 }}>
          <div
            className="mono"
            style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginBottom: 12 }}
          >
            API USAGE THIS MONTH
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                flex: 1,
                height: 8,
                background: 'rgba(0,0,0,.3)',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: '24.8%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #00f5ff, #0099dd)',
                  borderRadius: 4,
                }}
              />
            </div>
            <span className="mono" style={{ fontSize: 14, color: '#00f5ff', fontWeight: 700 }}>
              12.4K / 50K
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function EnterpriseAdminProfile() {
  const [activeSection, setActiveSection] = useState('profile');

  const renderSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileSection />;
      case 'organization':
        return <OrganizationSection />;
      case 'team':
        return <TeamSection />;
      case 'security':
        return <SecuritySection />;
      default:
        return <ProfileSection />;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="profile-root">
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0,245,255,.01) 0px, transparent 1px, transparent 52px), repeating-linear-gradient(90deg, rgba(0,245,255,.01) 0px, transparent 1px, transparent 52px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '15%',
            right: '-10%',
            width: '40%',
            height: '50%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,255,.08) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Trial Banner */}
          <TrialBanner />

          {/* Main Layout */}
          <div
            className="profile-layout"
            style={{
              display: 'grid',
              gridTemplateColumns: '280px 1fr',
              gap: 32,
              alignItems: 'flex-start',
            }}
          >
            {/* Sidebar */}
            <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

            {/* Main Content */}
            <div className="reveal delay-3">{renderSection()}</div>
          </div>
        </div>

        {/* Bottom line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,.3), transparent)',
          }}
        />
      </section>
    </>
  );
}
