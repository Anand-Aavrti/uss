import { useState, useEffect } from 'react';

/* ═══════════════════════════════════════════
   KEYFRAMES & STYLES
   ═══════════════════════════════════════════ */
const CSS = `
  

  @keyframes fadeInLeft {
    from { opacity:0; transform:translateX(-40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes fadeInRight {
    from { opacity:0; transform:translateX(40px); }
    to   { opacity:1; transform:translateX(0); }
  }
  @keyframes shieldPulse {
    0%,100% { transform:scale(1); opacity:.8; }
    50%     { transform:scale(1.08); opacity:1; }
  }
  @keyframes orbit {
    from { transform:rotate(0deg) translateX(80px) rotate(0deg); }
    to   { transform:rotate(360deg) translateX(80px) rotate(-360deg); }
  }
  @keyframes typing {
    from { width:0; }
    to   { width:100%; }
  }
  @keyframes blink {
    0%,100% { opacity:1; }
    50%     { opacity:0; }
  }
  @keyframes lockRotate {
    0%   { transform:rotate(0deg) scale(1); }
    25%  { transform:rotate(-5deg) scale(1.05); }
    50%  { transform:rotate(5deg) scale(1.08); }
    75%  { transform:rotate(-3deg) scale(1.05); }
    100% { transform:rotate(0deg) scale(1); }
  }
  @keyframes ripple {
    0%   { transform:scale(1); opacity:.6; }
    100% { transform:scale(2.5); opacity:0; }
  }

  .security-root { 
     
    
    position:relative; 
    padding: clamp(70px, 10vw, 120px) clamp(20px, 5vw, 80px);
    overflow:hidden;
  }
  .mono { font-family:'Share Tech Mono',monospace; }

  .reveal-left { opacity:0; animation:fadeInLeft .8s cubic-bezier(.22,1,.36,1) forwards; }
  .reveal-right { opacity:0; animation:fadeInRight .8s cubic-bezier(.22,1,.36,1) forwards; }
  .delay-1 { animation-delay:.15s; }
  .delay-2 { animation-delay:.3s; }
  .delay-3 { animation-delay:.45s; }
  .delay-4 { animation-delay:.6s; }
  .delay-5 { animation-delay:.75s; }

  .badge-item {
    display:flex;
    align-items:center;
    gap:12px;
    padding:14px 20px;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(0,245,255,.12);
    border-radius:12px;
    transition:all .3s;
  }
  .badge-item:hover {
    background:rgba(0,245,255,.08);
    border-color:rgba(0,245,255,.3);
    transform:translateX(8px);
  }

  @media (max-width:968px) {
    .split-container { 
      flex-direction:column !important; 
      gap:48px !important;
    }
    .security-left, .security-right { 
      flex:none !important; 
      max-width:100% !important;
    }
  }
`;

/* ═══════════════════════════════════════════
   TERMINAL COMPONENT
   ═══════════════════════════════════════════ */
function SecurityTerminal() {
  const [activeIndex, setActiveIndex] = useState(0);

  const commands = [
    { cmd: '$ mdm-security --scan', output: 'Scanning 2,431 devices...' },
    { cmd: '$ threat-detection --status', output: '✓ No threats detected' },
    { cmd: '$ compliance-check --run', output: '✓ 100% compliant (SOC 2, GDPR)' },
    { cmd: '$ encryption --verify', output: '✓ AES-256 active on all endpoints' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % commands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: 'rgba(8,11,18,.9)',
        border: '1px solid rgba(0,245,255,.2)',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 20px 60px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.05)',
      }}
    >
      {/* Terminal header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          marginBottom: 20,
          paddingBottom: 16,
          borderBottom: '1px solid rgba(0,245,255,.1)',
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28ca42' }} />
        <span
          className="mono"
          style={{ marginLeft: 12, fontSize: 11, color: 'rgba(255,255,255,.4)' }}
        >
          security-monitor.sh
        </span>
      </div>

      {/* Terminal content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {commands.map((item, i) => (
          <div key={i} style={{ opacity: i <= activeIndex ? 1 : 0.3, transition: 'opacity .5s' }}>
            <div
              className="mono"
              style={{
                fontSize: 13,
                color: '#00f5ff',
                marginBottom: 6,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {item.cmd}
              {i === activeIndex && (
                <span
                  style={{
                    display: 'inline-block',
                    width: 8,
                    height: 14,
                    background: '#00f5ff',
                    animation: 'blink 1s step-end infinite',
                  }}
                />
              )}
            </div>
            <div
              className="mono"
              style={{ fontSize: 12, color: 'rgba(0,230,118,.85)', paddingLeft: 16 }}
            >
              {item.output}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SecurityDeepDive() {
  const badges = [
    { icon: '✓', label: 'SOC 2 Type II', color: '#00f5ff' },
    { icon: '✓', label: 'ISO 27001', color: '#00e676' },
    { icon: '✓', label: 'GDPR Compliant', color: '#ffb300' },
    { icon: '✓', label: 'HIPAA Ready', color: '#ff6b9d' },
  ];

  const features = [
    { icon: '🔐', title: 'End-to-End Encryption', desc: 'AES-256 encryption for all data' },
    { icon: '👤', title: 'Biometric Authentication', desc: 'Face ID, Touch ID, Windows Hello' },
    {
      icon: '🎯',
      title: 'Conditional Access',
      desc: 'Location & time-based access control',
    },
    { icon: '📱', title: 'Remote Wipe', desc: 'Instant device lock & data erasure' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="security-root">
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0,245,255,.008) 0px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(0,245,255,.008) 0px, transparent 1px, transparent 60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '-15%',
            width: '50%',
            height: '80%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,230,118,.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Split layout */}
          <div
            className="split-container"
            style={{ display: 'flex', alignItems: 'center', gap: 'clamp(40px, 6vw, 80px)' }}
          >
            {/* LEFT: Content */}
            <div className="security-left" style={{ flex: 1 }}>
              {/* Badge */}
              <div className="reveal-left delay-1" style={{ marginBottom: 24 }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(0,230,118,.1)',
                    border: '1px solid rgba(0,230,118,.3)',
                    borderRadius: 20,
                    padding: '6px 16px',
                  }}
                >
                  <span style={{ fontSize: 16 }}>🛡️</span>
                  <span
                    className="mono"
                    style={{ fontSize: 11, color: '#00e676', letterSpacing: '.5px' }}
                  >
                    ENTERPRISE SECURITY
                  </span>
                </div>
              </div>

              {/* Title */}
              <h2
                className="reveal-left delay-2"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                  fontWeight: 700,
                  lineHeight: 1.2,
                  marginBottom: 20,
                  color: '#fff',
                }}
              >
                Bank-Level Security
                <br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #00e676 0%, #00f5ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Built for Trust
                </span>
              </h2>

              {/* Description */}
              <p
                className="reveal-left delay-3"
                style={{
                  fontSize: 'clamp(1.05rem, 1.2vw, 1.15rem)',
                  lineHeight: 1.75,
                  color: 'rgba(255,255,255,.55)',
                  marginBottom: 36,
                }}
              >
                Military-grade encryption, zero-trust architecture, and compliance-first design.
                Your devices and data are protected by the same security infrastructure trusted by
                Fortune 500 companies.
              </p>

              {/* Features list */}
              <div
                className="reveal-left delay-4"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: 16,
                  marginBottom: 36,
                }}
              >
                {features.map((f, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 12,
                      padding: 16,
                      background: 'rgba(255,255,255,.02)',
                      border: '1px solid rgba(0,245,255,.08)',
                      borderRadius: 10,
                      transition: 'all .3s',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,245,255,.06)';
                      e.currentTarget.style.borderColor = 'rgba(0,245,255,.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,.02)';
                      e.currentTarget.style.borderColor = 'rgba(0,245,255,.08)';
                    }}
                  >
                    <span style={{ fontSize: 24, flexShrink: 0 }}>{f.icon}</span>
                    <div>
                      <div
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: '#fff',
                          marginBottom: 4,
                        }}
                      >
                        {f.title}
                      </div>
                      <div
                        className="mono"
                        style={{ fontSize: 11, color: 'rgba(255,255,255,.45)' }}
                      >
                        {f.desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compliance badges */}
              <div className="reveal-left delay-5">
                <div
                  className="mono"
                  style={{
                    fontSize: 11,
                    color: 'rgba(255,255,255,.4)',
                    marginBottom: 14,
                    letterSpacing: '.5px',
                  }}
                >
                  CERTIFIED & COMPLIANT
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {badges.map((b, i) => (
                    <div key={i} className="badge-item">
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 6,
                          background: `${b.color}22`,
                          border: `1px solid ${b.color}44`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: b.color,
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {b.icon}
                      </div>
                      <span
                        className="mono"
                        style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.75)' }}
                      >
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Visuals */}
            <div className="security-right" style={{ flex: 1, maxWidth: 560 }}>
              <div className="reveal-right delay-2">
                <SecurityTerminal />
              </div>
            </div>
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
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,.25), transparent)',
          }}
        />
      </section>
    </>
  );
}
