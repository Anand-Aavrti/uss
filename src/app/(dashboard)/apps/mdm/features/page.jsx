'use client';
import { useState } from 'react';
import {
  Shield,
  Zap,
  Smartphone,
  Lock,
  MapPin,
  BarChart3,
  FileCheck,
  Wifi,
  Battery,
  Globe,
  Bell,
  Eye,
  ArrowRight,
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
  @keyframes float {
    0%,100% { transform:translateY(0px); }
    50%     { transform:translateY(-8px); }
  }
  @keyframes rotate {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }

  .features-root { 
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
  .delay-6 { animation-delay:.6s; }
  .delay-7 { animation-delay:.7s; }
  .delay-8 { animation-delay:.8s; }

  .feature-card {
    background:linear-gradient(165deg, rgba(22,27,38,.6) 0%, rgba(12,15,22,.9) 100%);
    border:1px solid rgba(0,245,255,.12);
    border-radius:20px;
    padding:clamp(28px, 3.5vw, 36px);
    position:relative;
    overflow:hidden;
    transition:all .4s cubic-bezier(.22,1,.36,1);
    height:100%;
    display:flex;
    flex-direction:column;
  }
  .feature-card:hover {
    transform:translateY(-8px);
    border-color:rgba(0,245,255,.35);
    box-shadow:0 24px 60px rgba(0,245,255,.2);
  }
  .feature-card.large {
    min-height:400px;
  }

  .bento-grid {
    display:grid;
    grid-template-columns:repeat(6, 1fr);
    gap:clamp(20px, 2.5vw, 32px);
  }

  @media (max-width:1200px) {
    .bento-grid {
      grid-template-columns:repeat(4, 1fr) !important;
    }
    .span-2 { grid-column:span 2 !important; }
    .span-3 { grid-column:span 4 !important; }
    .span-4 { grid-column:span 4 !important; }
  }

  @media (max-width:768px) {
    .bento-grid {
      grid-template-columns:1fr !important;
    }
    .span-2, .span-3, .span-4 { grid-column:span 1 !important; }
    .feature-card.large { min-height:auto !important; }
  }
`;

/* ═══════════════════════════════════════════
   FEATURE CARD COMPONENT
   ═══════════════════════════════════════════ */
function FeatureCard({ feature, delay, large = false, span = 2 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`feature-card ${large ? 'large' : ''} reveal delay-${delay} span-${span}`}
      style={{ gridColumn: `span ${span}` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
    

      {/* Category badge */}
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: `${feature.color}15`,
          border: `1px solid ${feature.color}33`,
          borderRadius: 20,
          padding: '4px 12px',
          marginBottom: 20,
          width: 'fit-content',
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: feature.color,
            boxShadow: `0 0 8px ${feature.color}`,
          }}
        />
        <span
          className="mono"
          style={{
            fontSize: 10,
            color: feature.color,
            fontWeight: 600,
            letterSpacing: '.5px',
            textTransform: 'uppercase',
          }}
        >
          {feature.category}
        </span>
      </div>

      {/* Icon */}
      <div
        style={{
          width: large ? 80 : 64,
          height: large ? 80 : 64,
          borderRadius: 14,
          background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}08)`,
          border: `2px solid ${feature.color}44`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          transition: 'all .4s',
          transform: isHovered ? 'scale(1.1)  ' : 'scale(1)',
          boxShadow: isHovered ? `0 0 30px ${feature.color}44` : 'none',
        }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: large ? 'clamp(1.6rem, 2vw, 1.8rem)' : 'clamp(1.2rem, 1.5vw, 1.4rem)',
          fontWeight: 700,
          color: '#fff',
          marginBottom: 12,
          lineHeight: 1.2,
        }}
      >
        {feature.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontSize: large ? 'clamp(1.05rem, 1.15vw, 1.1rem)' : 'clamp(0.95rem, 1.05vw, 1rem)',
          lineHeight: 1.7,
          color: 'rgba(255,255,255,.65)',
          marginBottom: large ? 24 : 'auto',
        }}
      >
        {feature.description}
      </p>

      {/* Stats/Features list for large cards */}
      {large && feature.features && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            marginBottom: 24,
          }}
        >
          {feature.features.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                background: 'rgba(255,255,255,.03)',
                border: '1px solid rgba(0,245,255,.08)',
                borderRadius: 10,
                transition: 'all .3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = `${feature.color}08`;
                e.currentTarget.style.borderColor = `${feature.color}33`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,.03)';
                e.currentTarget.style.borderColor = 'rgba(0,245,255,.08)';
              }}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: feature.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: '0.95rem',
                  color: 'rgba(255,255,255,.75)',
                }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Stat badge */}
      {feature.stat && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: `${feature.color}15`,
            border: `1px solid ${feature.color}33`,
            borderRadius: 10,
            padding: '8px 14px',
            marginTop: 'auto',
            width: 'fit-content',
          }}
        >
          <span
            className="mono"
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: feature.color,
              letterSpacing: '.3px',
            }}
          >
            {feature.stat}
          </span>
        </div>
      )}

      {/* Hover arrow for large cards */}
      {large && (
        <div
          style={{
            position: 'absolute',
            bottom: 28,
            right: 28,
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: `${feature.color}22`,
            border: `1px solid ${feature.color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
            transition: 'all .3s',
          }}
        >
          <ArrowRight size={20} color={feature.color} strokeWidth={2.5} />
        </div>
      )}

      {/* Border glow effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: 20,
          background: `linear-gradient(135deg, ${feature.color}08, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity .4s',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function FeaturesShowcase() {
  const features = [
    {
      icon: <Shield size={48} color="#00f5ff" strokeWidth={2} />,
      category: 'Security',
      title: 'Zero-Trust Security',
      description:
        'Military-grade encryption with biometric authentication, conditional access policies, and real-time threat detection powered by AI.',
      stat: 'BANK-LEVEL ENCRYPTION',
      color: '#00f5ff',
      features: [
        'End-to-end AES-256 encryption',
        'Biometric authentication (Face ID, Touch ID)',
        'Conditional access & geo-fencing',
        'AI-powered threat detection',
      ],
    },
    {
      icon: <Zap size={40} color="#00e676" strokeWidth={2} />,
      category: 'Deployment',
      title: 'Zero-Touch Provisioning',
      description:
        'Automatic device enrollment and configuration right out of the box with no IT intervention required.',
      stat: '5-MIN SETUP',
      color: '#00e676',
    },
    {
      icon: <Smartphone size={40} color="#ffb300" strokeWidth={2} />,
      category: 'Management',
      title: 'Cross-Platform Support',
      description:
        'Unified management for Android, iOS, and Windows devices from a single dashboard interface.',
      stat: '3 PLATFORMS',
      color: '#ffb300',
    },
    {
      icon: <Lock size={40} color="#ff6b9d" strokeWidth={2} />,
      category: 'Security',
      title: 'Kiosk Mode & Lockdown',
      description:
        'Secure single-app mode with strict policy enforcement for dedicated devices and kiosks.',
      stat: 'ENTERPRISE GRADE',
      color: '#ff6b9d',
    },
    {
      icon: <BarChart3 size={48} color="#7c4dff" strokeWidth={2} />,
      category: 'Analytics',
      title: 'Advanced Analytics',
      description:
        'Real-time insights into device performance, app usage, security posture, and compliance status with custom reporting.',
      stat: 'REAL-TIME DASHBOARDS',
      color: '#7c4dff',
      features: [
        'Live device health monitoring',
        'Custom report generation',
        'Usage analytics & trends',
        'Predictive maintenance alerts',
      ],
    },
    {
      icon: <MapPin size={40} color="#00bcd4" strokeWidth={2} />,
      category: 'Tracking',
      title: 'Geofencing & Location',
      description:
        'Track device location in real-time with geofencing alerts and location history.',
      stat: 'GPS TRACKING',
      color: '#00bcd4',
    },
    {
      icon: <FileCheck size={40} color="#00e676" strokeWidth={2} />,
      category: 'Compliance',
      title: 'Compliance Management',
      description:
        'Automated compliance monitoring with SOC 2, GDPR, and HIPAA compliance reporting.',
      stat: 'SOC 2 CERTIFIED',
      color: '#00e676',
    },
    {
      icon: <Wifi size={40} color="#00f5ff" strokeWidth={2} />,
      category: 'Connectivity',
      title: 'Network Management',
      description:
        'Configure WiFi, VPN, and cellular settings remotely with automatic failover support.',
      stat: '99.9% UPTIME',
      color: '#00f5ff',
    },
    {
      icon: <Battery size={40} color="#ffb300" strokeWidth={2} />,
      category: 'Performance',
      title: 'Battery Optimization',
      description:
        'Monitor battery health and optimize power consumption with intelligent power management.',
      stat: '30% LONGER LIFE',
      color: '#ffb300',
    },
    {
      icon: <Globe size={48} color="#ff6b9d" strokeWidth={2} />,
      category: 'Integration',
      title: 'API & Integrations',
      description:
        'Comprehensive REST API with webhooks, SSO support, and pre-built integrations for popular enterprise tools.',
      stat: 'FULL API ACCESS',
      color: '#ff6b9d',
      features: [
        'RESTful API with webhooks',
        'SSO & SAML integration',
        'Slack, Teams, Jira connectors',
        'Custom integration support',
      ],
    },
    {
      icon: <Bell size={40} color="#7c4dff" strokeWidth={2} />,
      category: 'Alerts',
      title: 'Smart Notifications',
      description:
        'AI-powered alerts for security threats, compliance issues, and device anomalies.',
      stat: 'AI-POWERED',
      color: '#7c4dff',
    },
    {
      icon: <Eye size={40} color="#00bcd4" strokeWidth={2} />,
      category: 'Monitoring',
      title: 'Remote Device Control',
      description:
        'View, control, and troubleshoot devices remotely with screen sharing and remote wipe capabilities.',
      stat: 'INSTANT ACCESS',
      color: '#00bcd4',
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="features-root">
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
            top: '20%',
            left: '-10%',
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
                <Zap size={16} color="rgba(0,245,255,.9)" strokeWidth={2.5} />
                <span
                  className="mono"
                  style={{ fontSize: 11, color: 'rgba(0,245,255,.9)', letterSpacing: '.5px' }}
                >
                  POWERFUL FEATURES
                </span>
              </div>
            </div>

            {/* Title */}
            <h2
              className="reveal delay-2"
              style={{
                fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 18,
              }}
            >
              <span style={{ color: '#fff' }}>Everything You Need</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00f5ff 0%, #00e676 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Built Right In
              </span>
            </h2>

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
              From zero-touch deployment to AI-powered security, our platform delivers
              enterprise-grade device management at scale.
            </p>
          </div>

          {/* Bento Grid */}
          <div className="bento-grid">
            {/* Row 1 - Large Security, Medium Zero-Touch, Medium Cross-Platform */}
            <FeatureCard feature={features[0]} delay={4} large={true} span={3} />
            <FeatureCard feature={features[1]} delay={4} span={2} />
            <FeatureCard feature={features[2]} delay={4} span={1} />

            {/* Row 2 - Medium Kiosk, Large Analytics, Medium Geofencing */}
            <FeatureCard feature={features[3]} delay={5} span={1} />
            <FeatureCard feature={features[4]} delay={5} large={true} span={3} />
            <FeatureCard feature={features[5]} delay={5} span={2} />

            {/* Row 3 - Medium Compliance, Medium Network, Medium Battery, Large API */}
            <FeatureCard feature={features[6]} delay={6} span={2} />
            <FeatureCard feature={features[7]} delay={6} span={1} />
            <FeatureCard feature={features[8]} delay={6} span={1} />
            <FeatureCard feature={features[9]} delay={6} large={true} span={2} />

            {/* Row 4 - Medium Smart Notifications, Medium Remote Control */}
            <FeatureCard feature={features[10]} delay={7} span={3} />
            <FeatureCard feature={features[11]} delay={7} span={3} />
          </div>

          {/* Bottom CTA */}
          <div
            className="reveal delay-8"
            style={{
              marginTop: 64,
              textAlign: 'center',
              padding: '48px 32px',
              background: 'rgba(0,245,255,.04)',
              border: '1px solid rgba(0,245,255,.15)',
              borderRadius: 20,
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                fontWeight: 700,
                color: '#fff',
                marginBottom: 12,
              }}
            >
              Ready to see all features in action?
            </h3>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                color: 'rgba(255,255,255,.55)',
                marginBottom: 28,
              }}
            >
              Schedule a personalized demo and discover how our platform can transform your device
              management.
            </p>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
                color: '#080b12',
                border: 'none',
                borderRadius: 10,
                fontSize: '1.05rem',
                fontWeight: 700,
                padding: '14px 32px',
                cursor: 'pointer',
                 transition: 'all .3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,245,255,.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Schedule a Demo
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
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
