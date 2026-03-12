'use client';
import { useState, useEffect } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Users,
  Newspaper,
  HelpCircle,
  Linkedin,
  Twitter,
  Github,
  Building2,
  User,
  Briefcase,
  Globe,
  CheckCircle,
  Zap,
  Shield,
  Activity,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   KEYFRAMES & STYLES
   ═══════════════════════════════════════════ */

const CSS = `
 
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(32px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes slideInLeft {
    from { opacity:0; transform:translateX(-40px); }
    to   { opacity:1; transform:translateX(0); }
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
  @keyframes glow {
    0%,100% { box-shadow: 0 0 20px rgba(0,245,255,.2); }
    50%     { box-shadow: 0 0 35px rgba(0,245,255,.4); }
  }
  @keyframes ping {
    0%   { transform:scale(1); opacity:.7; }
    100% { transform:scale(2.5); opacity:0; }
  }

  .contact-root { 
     
    background:#080b12; 
    position:relative; 
    padding: clamp(70px, 10vw, 120px) clamp(20px, 5vw, 80px);
    overflow:hidden;
  }
  .mono { font-family:'Share Tech Mono',monospace; }

  .reveal { opacity:0; animation:fadeInUp .8s cubic-bezier(.22,1,.36,1) forwards; }
  .delay-1 { animation-delay:.1s; }
  .delay-2 { animation-delay:.2s; }
  .delay-3 { animation-delay:.3s; }
  .delay-4 { animation-delay:.4s; }
  .delay-5 { animation-delay:.5s; }

  .feature-card {
    background:linear-gradient(165deg, rgba(22,27,38,.6) 0%, rgba(12,15,22,.9) 100%);
    border:1px solid rgba(0,245,255,.12);
    border-radius:18px;
    padding:clamp(28px, 3.5vw, 36px);
    position:relative;
    overflow:hidden;
    transition:all .4s cubic-bezier(.22,1,.36,1);
    height:100%;
  }
  .feature-card:hover {
    transform:translateY(-8px);
    border-color:rgba(0,245,255,.3);
    box-shadow:0 20px 60px rgba(0,245,255,.15);
  }

  .contact-item {
    position:relative;
    padding:20px;
    border-radius:12px;
    background:rgba(255,255,255,.02);
    border:1px solid rgba(0,245,255,.08);
    cursor:pointer;
    transition:all .4s cubic-bezier(.22,1,.36,1);
  }
  .contact-item:hover {
    background:rgba(0,245,255,.08);
    transform:translateX(8px);
  }

  .dept-btn {
    width:100%;
    padding:12px 16px;
    background:rgba(255,255,255,.04);
    border:1px solid rgba(0,245,255,.08);
    border-radius:10px;
    color:rgba(255,255,255,.75);
    
    font-weight:600;
    font-size:0.875rem;
    cursor:pointer;
    transition:all .3s cubic-bezier(.4,0,.2,1);
    display:flex;
    align-items:center;
    gap:8px;
  }
  .dept-btn:hover {
    background:rgba(0,245,255,.1);
    border-color:rgba(0,245,255,.4);
    color:#00f5ff;
    transform:translateY(-2px);
    box-shadow:0 5px 15px rgba(0,245,255,.2);
  }

  .social-btn {
    width:40px;
    height:40px;
    border-radius:10px;
    border:1px solid rgba(0,245,255,.1);
    background:transparent;
    color:rgba(255,255,255,.5);
    display:flex;
    align-items:center;
    justify-content:center;
    cursor:pointer;
    transition:all .3s cubic-bezier(.4,0,.2,1);
  }
  .social-btn:hover {
    color:#00f5ff;
    border-color:#00f5ff;
    transform:translateY(-3px);
    box-shadow:0 5px 15px rgba(0,245,255,.3);
    background:rgba(0,245,255,.1);
  }

  .form-input {
    width:100%;
    padding:14px 16px;
    background:rgba(0,0,0,.3);
    border:1.5px solid rgba(0,245,255,.12);
    border-radius:12px;
    color:white;
    
    font-size:1rem;
    transition:all .3s cubic-bezier(.4,0,.2,1);
  }
  .form-input:hover {
    background:rgba(0,0,0,.5);
    border-color:rgba(0,245,255,.4);
  }
  .form-input:focus {
    outline:none;
    background:rgba(0,0,0,.6);
    border-color:#00f5ff;
    border-width:2px;
    box-shadow:0 0 15px rgba(0,245,255,.3);
  }
  .form-input::placeholder {
    color:rgba(255,255,255,.4);
  }

  .form-select {
    width:100%;
    padding:14px 16px;
    background:rgba(0,0,0,.3);
    border:1.5px solid rgba(0,245,255,.12);
    border-radius:12px;
    color:white;
    
    font-size:1rem;
    transition:all .3s cubic-bezier(.4,0,.2,1);
    cursor:pointer;
  }
  .form-select:hover {
    background:rgba(0,0,0,.5);
    border-color:rgba(0,245,255,.4);
  }
  .form-select:focus {
    outline:none;
    background:rgba(0,0,0,.6);
    border-color:#00f5ff;
    border-width:2px;
    box-shadow:0 0 15px rgba(0,245,255,.3);
  }

  .form-textarea {
    width:100%;
    padding:14px 16px;
    background:rgba(0,0,0,.3);
    border:1.5px solid rgba(0,245,255,.12);
    border-radius:12px;
    color:white;
    
    font-size:1rem;
    resize:vertical;
    min-height:120px;
    transition:all .3s cubic-bezier(.4,0,.2,1);
  }
  .form-textarea:hover {
    background:rgba(0,0,0,.5);
    border-color:rgba(0,245,255,.4);
  }
  .form-textarea:focus {
    outline:none;
    background:rgba(0,0,0,.6);
    border-color:#00f5ff;
    border-width:2px;
    box-shadow:0 0 15px rgba(0,245,255,.3);
  }
  .form-textarea::placeholder {
    color:rgba(255,255,255,.4);
  }

  @media (max-width:968px) {
    .contact-grid { 
      grid-template-columns:1fr !important; 
      gap:32px !important;
    }
    .feature-grid {
      grid-template-columns:1fr !important;
    }
  }
`;

/* ═══════════════════════════════════════════
   FEATURE CARD COMPONENT
   ═══════════════════════════════════════════ */
function FeatureCard({ icon, title, description, delay }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`feature-card reveal delay-${delay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          background: 'linear-gradient(135deg, rgba(0,245,255,.2), rgba(0,245,255,.05))',
          border: '1px solid rgba(0,245,255,.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          transition: 'all .4s',
          transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        }}
      >
        {icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 'clamp(1.2rem, 1.5vw, 1.4rem)',
          fontWeight: 700,
          color: '#fff',
          marginBottom: 12,
        }}
      >
        {title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: 'clamp(0.95rem, 1.05vw, 1rem)',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,.65)',
        }}
      >
        {description}
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   CONTACT ITEM COMPONENT
   ═══════════════════════════════════════════ */
function ContactItem({ icon, label, value, color }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="contact-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderColor: isHovered ? color : 'rgba(0,245,255,.08)',
        boxShadow: isHovered ? `0 5px 20px ${color}40` : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* Icon */}
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: `linear-gradient(135deg, ${color}22, ${color}08)`,
            border: `1px solid ${color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
            flexShrink: 0,
            transition: 'transform .3s',
            transform: isHovered ? 'scale(1.1) ' : 'scale(1)',
          }}
        >
          {icon}
        </div>

        {/* Text */}
        <div>
          <div
            className="mono"
            style={{
              fontSize: 11,
              color: 'rgba(255,255,255,.55)',
              textTransform: 'uppercase',
              letterSpacing: 1,
              fontWeight: 600,
              marginBottom: 4,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: '1.05rem',
              fontWeight: 600,
              color: 'white',
            }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}


export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',
    jobTitle: '',
    industry: '',
    country: 'United States',
    phone: '',
    message: '',
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="contact-root">
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
            top: '10%',
            right: '-15%',
            width: '50%',
            height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,255,.08) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 64px)' }}>
            {/* Badge */}
            <div className="reveal delay-1" style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(0,245,255,.08)',
                  border: '1px solid rgba(0,245,255,.25)',
                  borderRadius: 20,
                  padding: '6px 16px',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00e676',
                    boxShadow: '0 0 8px #00e676',
                    animation: 'pulse 2s ease-in-out infinite',
                  }}
                />
                <span
                  className="mono"
                  style={{ fontSize: 11, color: 'rgba(0,245,255,.9)', letterSpacing: '.5px' }}
                >
                  GET IN TOUCH
                </span>
              </div>
            </div>

            {/* Title */}
            <h1
              className="reveal delay-2"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 18,
              }}
            >
              <span style={{ color: '#fff' }}>Contact Our</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00f5ff 0%, #00e676 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Expert Team
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="reveal delay-3"
              style={{
                fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
                lineHeight: 1.7,
                color: 'rgba(255,255,255,.5)',
                maxWidth: 680,
                margin: '0 auto',
              }}
            >
              Ready to transform your device management? Connect with us for demos, support, or
              partnerships.
            </p>
          </div>

          {/* Feature Cards */}
          <div
            className="feature-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(24px, 3vw, 32px)',
              marginBottom: 64,
            }}
          >
            <FeatureCard
              delay={1}
              icon={<Zap size={32} color="#00f5ff" strokeWidth={2} />}
              title="Touchless Provisioning"
              description="Zero-touch enrollment for rapid deployment across large device fleets."
            />
            <FeatureCard
              delay={2}
              icon={<Shield size={32} color="#00e676" strokeWidth={2} />}
              title="Kiosk Lockdown"
              description="Secure single-app modes with strict policy enforcement for dedicated devices."
            />
            <FeatureCard
              delay={3}
              icon={<Activity size={32} color="#ffb300" strokeWidth={2} />}
              title="Real-time Telemetry"
              description="Live insights into battery health, location, and connectivity status."
            />
          </div>

          {/* Main Contact Grid */}
          <div
            className="contact-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 3fr',
              gap: 'clamp(32px, 4vw, 48px)',
            }}
          >
            {/* Left Column - Contact Info */}
            <div
              className="reveal delay-4"
              style={{
                background:
                  'linear-gradient(165deg, rgba(22,27,38,.7) 0%, rgba(12,15,22,.95) 100%)',
                border: '1px solid rgba(0,245,255,.15)',
                borderRadius: 20,
                overflow: 'hidden',
                position: 'relative',

                // 🔥 KEY FIX
                display: 'flex',
                flexDirection: 'column',
                minHeight: 720, // adjust if needed
              }}
            >
              {/* Header */}
              <div
                style={{
                  padding: 40,
                  paddingBottom: 32,
                  borderBottom: '1px solid rgba(0,245,255,.08)',
                  background: 'linear-gradient(180deg, rgba(0,245,255,.08) 0%, transparent 100%)',
                }}
              >
                <h2
                  style={{
                    fontSize: 'clamp(1.6rem, 2.2vw, 2rem)',
                    fontWeight: 700,
                    marginBottom: 8,
                    color: '#fff',
                  }}
                >
                  Contact Information
                </h2>
                <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,.6)', lineHeight: 1.6 }}>
                  Connect with our team across multiple channels
                </p>
              </div>

              {/* Contact Items */}
              <div style={{ padding: 32 }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <ContactItem
                    icon={<Mail size={24} />}
                    label="Sales & Inquiries"
                    value="hello@yantrix.com"
                    color="#00f5ff"
                  />
                  <ContactItem
                    icon={<MessageSquare size={24} />}
                    label="24/7 Technical Support"
                    value="support@yantrix.com"
                    color="#ff4081"
                  />
                  <ContactItem
                    icon={<Phone size={24} />}
                    label="Hotline"
                    value="+1 (415) 555-8324"
                    color="#00e676"
                  />
                  <ContactItem
                    icon={<MapPin size={24} />}
                    label="Global Headquarters"
                    value="350 Mission St, San Francisco"
                    color="#ffb300"
                  />
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(0,245,255,.05)', margin: '0 32px' }} />

              {/* Quick Routing */}
              <div style={{ padding: 32 }}>
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,.5)',
                    textTransform: 'uppercase',
                    letterSpacing: 1.5,
                    fontWeight: 700,
                    marginBottom: 20,
                  }}
                >
                  QUICK ROUTING
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <button className="dept-btn">
                    <Building2 size={16} />
                    Sales Team
                  </button>
                  <button className="dept-btn">
                    <MessageSquare size={16} />
                    Tech Support
                  </button>
                  <button className="dept-btn">
                    <Users size={16} />
                    Partnerships
                  </button>
                  <button className="dept-btn">
                    <Newspaper size={16} />
                    Media & Press
                  </button>
                </div>
              </div>

              {/* 🔥 FLEX SPACER */}
              <div style={{ flex: 1 }} />

              {/* Footer (now always at bottom) */}
              <div
                style={{
                  padding: 32,
                  background: 'rgba(0,0,0,.4)',
                  borderTop: '1px solid rgba(0,245,255,.08)',
                }}
              >
                <div
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                >
                  <div>
                    <div
                      style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}
                    >
                      <div style={{ position: 'relative', display: 'flex' }}>
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#00e676',
                            zIndex: 2,
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            width: 10,
                            height: 10,
                            borderRadius: '50%',
                            background: '#00e676',
                            animation: 'ping 2s infinite',
                          }}
                        />
                      </div>
                      <span
                        className="mono"
                        style={{
                          fontSize: 14,
                          fontWeight: 700,
                          color: 'rgba(255,255,255,.9)',
                          letterSpacing: 0.5,
                        }}
                      >
                        OPERATIONAL
                      </span>
                    </div>
                    <span className="mono" style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>
                      Avg Response: &lt; 4 hours
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 12 }}>
                    <button className="social-btn">
                      <Linkedin size={18} />
                    </button>
                    <button className="social-btn">
                      <Twitter size={18} />
                    </button>
                    <button className="social-btn">
                      <Github size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div
              className="reveal delay-5"
              style={{
                background:
                  'linear-gradient(165deg, rgba(22,27,38,.7) 0%, rgba(12,15,22,.95) 100%)',
                border: '1px solid rgba(0,245,255,.15)',
                borderRadius: 20,
                padding: 'clamp(32px, 4vw, 48px)',
              }}
            >
              {/* Form Header */}
              <div
                style={{
                  marginBottom: 40,
                  paddingBottom: 32,
                  borderBottom: '2px solid rgba(0,245,255,.15)',
                }}
              >
                <h2
                  style={{
                    fontSize: 'clamp(1.6rem, 2.2vw, 2rem)',
                    fontWeight: 700,
                    marginBottom: 12,
                    color: '#fff',
                  }}
                >
                  Request a Demo
                </h2>
                <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,.7)', lineHeight: 1.7 }}>
                  Tell us about yourself and we'll show you how our platform fits your needs.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Full Name */}
                <div style={{ marginBottom: 24 }}>
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
                  <div style={{ position: 'relative' }}>
                    <User
                      size={20}
                      style={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(255,255,255,.4)',
                      }}
                    />
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="form-input"
                      style={{ paddingLeft: 48 }}
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: 24 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,.7)',
                      marginBottom: 8,
                    }}
                  >
                    Business Email *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail
                      size={20}
                      style={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(255,255,255,.4)',
                      }}
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@company.com"
                      className="form-input"
                      style={{ paddingLeft: 48 }}
                    />
                  </div>
                </div>

                {/* Company */}
                <div style={{ marginBottom: 24 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,.7)',
                      marginBottom: 8,
                    }}
                  >
                    Company Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building2
                      size={20}
                      style={{
                        position: 'absolute',
                        left: 16,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(255,255,255,.4)',
                      }}
                    />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corporation"
                      className="form-input"
                      style={{ paddingLeft: 48 }}
                    />
                  </div>
                </div>

                {/* Job Title & Industry */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 20,
                    marginBottom: 24,
                  }}
                >
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
                      Job Title *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Briefcase
                        size={20}
                        style={{
                          position: 'absolute',
                          left: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(255,255,255,.4)',
                          pointerEvents: 'none',
                          zIndex: 1,
                        }}
                      />
                      <select
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        className="form-select"
                        style={{ paddingLeft: 48 }}
                      >
                        <option value="">Select Job Title</option>
                        <option value="C-Level Executive">C-Level Executive</option>
                        <option value="VP / Director">VP / Director</option>
                        <option value="Manager">Manager</option>
                        <option value="Developer / Engineer">Developer / Engineer</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
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
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select Industry</option>
                      <option value="SaaS / Technology">SaaS / Technology</option>
                      <option value="Finance & Banking">Finance & Banking</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail & E-commerce">Retail & E-commerce</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                {/* Country & Phone */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 20,
                    marginBottom: 24,
                  }}
                >
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
                      Country *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Globe
                        size={20}
                        style={{
                          position: 'absolute',
                          left: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(255,255,255,.4)',
                          pointerEvents: 'none',
                          zIndex: 1,
                        }}
                      />
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="form-select"
                        style={{ paddingLeft: 48 }}
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="India">India</option>
                        <option value="Canada">Canada</option>
                        <option value="Germany">Germany</option>
                        <option value="Australia">Australia</option>
                      </select>
                    </div>
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
                    <div style={{ position: 'relative' }}>
                      <Phone
                        size={20}
                        style={{
                          position: 'absolute',
                          left: 16,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          color: 'rgba(255,255,255,.4)',
                        }}
                      />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 000-0000"
                        className="form-input"
                        style={{ paddingLeft: 48 }}
                      />
                    </div>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: 24 }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'rgba(255,255,255,.7)',
                      marginBottom: 8,
                    }}
                  >
                    How can we help? *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your use case and requirements..."
                    className="form-textarea"
                  />
                </div>

                {/* Terms */}
                <div style={{ marginBottom: 32 }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      cursor: 'pointer',
                    }}
                  >
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      style={{
                        width: 20,
                        height: 20,
                        marginTop: 2,
                        cursor: 'pointer',
                        accentColor: '#00f5ff',
                      }}
                    />
                    <span
                      style={{
                        fontSize: '0.95rem',
                        color: 'rgba(255,255,255,.7)',
                        lineHeight: 1.6,
                      }}
                    >
                      I agree to the{' '}
                      <a
                        href="#"
                        style={{
                          color: '#00f5ff',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'all .2s',
                        }}
                      >
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a
                        href="#"
                        style={{
                          color: '#00f5ff',
                          fontWeight: 600,
                          textDecoration: 'none',
                          transition: 'all .2s',
                        }}
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '16px 32px',
                    background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
                    color: '#080b12',
                    border: 'none',
                    borderRadius: 12,
                    fontSize: '1.1rem',
                    fontWeight: 700,

                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 10,
                    transition: 'all .4s cubic-bezier(.4,0,.2,1)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #00e5ff, #00b4d8)';
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,245,255,.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #00f5ff, #0099dd)';
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Send Request
                  <Send size={20} />
                </button>

                {/* Help Link */}
                <div style={{ textAlign: 'center', marginTop: 24 }}>
                  <a
                    href="#"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      color: 'rgba(255,255,255,.5)',
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      transition: 'all .3s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#00f5ff';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'rgba(255,255,255,.5)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <HelpCircle size={18} />
                    Looking for the Help Center?
                  </a>
                </div>
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div
            style={{
              marginTop: 80,
              height: 400,
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(0,245,255,.15)',
              boxShadow: '0 10px 40px rgba(0,0,0,.5)',
              filter: 'grayscale(100%) invert(92%) contrast(110%)',
              transition: 'all .6s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'grayscale(0%) invert(0%) contrast(100%)';
              e.currentTarget.style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'grayscale(100%) invert(92%) contrast(110%)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019564660426!2d-122.39912368468204!3d37.79128597975659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c87f3f7cf%3A0x6d0d2c1be4b8f4c8!2s350%20Mission%20St%2C%20San%20Francisco%2C%20CA%2094105!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
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
