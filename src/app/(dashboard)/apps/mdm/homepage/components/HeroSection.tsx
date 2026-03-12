import { useState, useEffect } from 'react';

const CSS = `

  * { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cyan:   #00f5ff;
    --cyan2:  #0099dd;
    --green:  #00e676;
    --warn:   #ffb300;
    --bg:     #080b12;
  }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(28px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes floatPhone {
    0%,100% { transform:translateY(0px) rotateX(0deg) rotateY(0deg); }
    40%     { transform:translateY(-10px) rotateX(1.2deg) rotateY(-0.8deg); }
    70%     { transform:translateY(-4px) rotateX(-0.6deg) rotateY(0.5deg); }
  }
  @keyframes glowPulse {
    0%,100% { opacity:.35; transform:scale(1); }
    50%     { opacity:.6;  transform:scale(1.07); }
  }
  @keyframes scan {
    0%   { top:-6%; }
    100% { top:108%; }
  }
  @keyframes blink {
    0%,100%{ opacity:1; }
    50%    { opacity:.25; }
  }
  @keyframes ping {
    0%   { transform:scale(1); opacity:.7; }
    100% { transform:scale(2.4); opacity:0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes particleDrift {
    0%,100% { transform:translate(0,0); }
    33%     { transform:translate(8px,-12px); }
    66%     { transform:translate(-6px,6px); }
  }

  .hero-root { overflow:hidden; position:relative; }
  .mono      { font-family:'Share Tech Mono',monospace; }

  /* staggered reveals */
  .reveal { opacity:0; animation:fadeUp .7s cubic-bezier(.22,1,.36,1) forwards; }
  .reveal-1 { animation-delay:.10s; }
  .reveal-2 { animation-delay:.24s; }
  .reveal-3 { animation-delay:.38s; }
  .reveal-4 { animation-delay:.52s; }
  .reveal-5 { animation-delay:.66s; }
  .reveal-6 { animation-delay:.80s; }

  /* ── buttons ── */
  .btn-primary {
    display:inline-flex; align-items:center; justify-content:center; gap:8px;
    background:linear-gradient(135deg, var(--cyan), var(--cyan2));
    color:#080b12;  font-weight:700;
    font-size:1rem; letter-spacing:.6px; padding:14px 32px; border-radius:10px;
    border:none; cursor:pointer; position:relative; overflow:hidden;
    transition:filter .2s, transform .15s;
  }
  .btn-primary:hover  { filter:brightness(1.18); transform:translateY(-2px); }
  .btn-primary:active { transform:translateY(0); }
  .btn-primary .ripple {
    position:absolute; top:50%; left:50%; width:50px; height:50px;
    margin:-25px 0 0 -25px; border-radius:50%;
    border:2px solid rgba(255,255,255,.35);
    animation:ping 2s ease-out infinite; pointer-events:none;
  }
  .btn-ghost {
    display:inline-flex; align-items:center; justify-content:center; gap:10px;
    background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.13);
    color:rgba(255,255,255,.8);  font-weight:600;
    font-size:1rem; padding:13px 28px; border-radius:10px; cursor:pointer;
    transition:background .25s, border-color .25s, transform .15s;
  }
  .btn-ghost:hover { background:rgba(0,245,255,.1); border-color:rgba(0,245,255,.35); transform:translateY(-2px); }

  /* ── phone ── */
  .phone-wrap { animation:floatPhone 5s cubic-bezier(.45,.05,.55,.95) infinite; position:relative; }
  .phone-body {
    width: 240px;
    height: 480px;
    border-radius:30px;
    background:linear-gradient(165deg, #161b26 0%, #0c0f16 100%);
    border:1.5px solid rgba(0,245,255,.22);
    box-shadow:0 0 60px rgba(0,245,255,.13), inset 0 1px 0 rgba(255,255,255,.07);
    overflow:hidden; display:flex; flex-direction:column; position:relative;
  }
  .phone-body::after {
    content:''; position:absolute; left:0; right:0; height:4px; pointer-events:none;
    background:linear-gradient(180deg, transparent, rgba(0,245,255,.07), transparent);
    animation:scan 3.2s linear infinite; z-index:10;
  }
  .phone-body::before {
    content:''; position:absolute; inset:0; border-radius:30px;
    background:linear-gradient(140deg, rgba(255,255,255,.065) 0%, transparent 42%);
    z-index:9; pointer-events:none;
  }
  .sbar {
    height:28px; display:flex; align-items:center; justify-content:space-between;
    padding:0 14px; background:rgba(0,245,255,.04);
    border-bottom:1px solid rgba(0,245,255,.1); flex-shrink:0;
  }
  .screen { flex:1; padding:12px; display:flex; flex-direction:column; gap:8px; overflow:hidden; position:relative; }

  /* corner brackets */
  .corner { position:absolute; width:18px; height:18px; pointer-events:none; animation:blink 2.4s ease-in-out infinite; }
  .corner--tl { top:-5px; left:-5px; border-top:2px solid var(--cyan); border-left:2px solid var(--cyan); border-radius:4px 0 0 0; }
  .corner--tr { top:-5px; right:-5px; border-top:2px solid var(--cyan); border-right:2px solid var(--cyan); border-radius:0 4px 0 0; animation-delay:.3s; }
  .corner--bl { bottom:-5px; left:-5px; border-bottom:2px solid var(--cyan); border-left:2px solid var(--cyan); border-radius:0 0 0 4px; animation-delay:.6s; }
  .corner--br { bottom:-5px; right:-5px; border-bottom:2px solid var(--cyan); border-right:2px solid var(--cyan); border-radius:0 0 4px 0; animation-delay:.9s; }

  /* ── pills ── */
  .pill {
    display:inline-flex; align-items:center; gap:8px;
    padding:9px 18px; border-radius:10px;
    background:rgba(255,255,255,.045); border:1px solid rgba(255,255,255,.1);
    transition:background .25s, border-color .25s, transform .2s;
  }
  .pill:hover { background:rgba(0,245,255,.1); border-color:rgba(0,245,255,.3); transform:translateY(-2px); }

  /* ── particles ── */
  .particle { position:absolute; border-radius:50%; pointer-events:none; animation:particleDrift var(--dur) ease-in-out infinite; }

  /* ── grid ── */
  .grid-overlay {
    position:absolute; inset:0; pointer-events:none;
    background:
      repeating-linear-gradient(0deg,  rgba(0,245,255,.018) 0px, transparent 1px, transparent 56px),
      repeating-linear-gradient(90deg, rgba(0,245,255,.018) 0px, transparent 1px, transparent 56px);
    -webkit-mask-image:radial-gradient(ellipse at center, black 25%, transparent 72%);
    mask-image:radial-gradient(ellipse at center, black 25%, transparent 72%);
  }

  /* ── desktop: edge-to-edge ── */
  .hero-inner {
    width:100%;
    padding-left: clamp(48px, 7vw, 120px);
    padding-right: clamp(48px, 7vw, 100px);
    padding-top: clamp(80px, 10vh, 120px);
    padding-bottom: clamp(60px, 8vh, 100px);
  }
  .hero-left { flex:1; min-width:0; }
  .hero-right { flex-shrink:0; }

  /* responsive phone scaling */
  @media (min-width:900px) and (max-width:1199px) {
    .phone-body { 
      width: 260px !important; 
      height: 520px !important; 
    }
  }

  /* scale phone up on wide screens */
  @media (min-width:1200px) {
    .phone-body { 
      width: 280px !important; 
      height: 560px !important; 
    }
  }
  @media (min-width:1500px) {
    .phone-body { 
      width: 300px !important; 
      height: 600px !important; 
    }
    .hero-inner { 
      padding-left: clamp(80px, 9vw, 160px); 
      padding-right: clamp(80px, 9vw, 140px); 
    }
  }

  /* ── tablet ── */
  @media (max-width:899px) {
    .hero-inner { 
      flex-direction:column !important; 
      align-items:center !important; 
      text-align:center !important; 
      gap:32px !important; 
      padding:80px 32px 48px !important; 
    }
    .hero-left { 
      flex:none !important; 
      max-width:100% !important; 
      align-items:center !important; 
    }
    .hero-right { 
      order:-1; 
    }
    .phone-body { 
      width: 230px !important; 
      height: 460px !important; 
    }
    .pill-row,.btn-row,.trust-row,.label-row { 
      justify-content:center !important; 
    }
    .hero-left p { 
      max-width:100% !important; 
    }
  }

  /* ── mobile ── */
  @media (max-width:580px) {
    .hero-inner { 
      padding:70px 20px 40px !important; 
      gap:24px !important;
    }
    .phone-body { 
      width: 200px !important; 
      height: 400px !important; 
    }
    .screen {
      padding: 10px !important;
      gap: 6px !important;
    }
    .sbar {
      height: 24px !important;
      padding: 0 12px !important;
    }
  }
`;

function Phone() {
  const [uptime, setUptime] = useState('99.97');
  useEffect(() => {
    const iv = setInterval(() => setUptime((99.9 + Math.random() * 0.09).toFixed(2)), 2800);
    return () => clearInterval(iv);
  }, []);

  const devices = [
    { name: 'Samsung Galaxy S24', status: 'synced', ok: true },
    { name: 'iPhone 15 Pro', status: 'synced', ok: true },
    { name: 'Pixel 8 – Fleet #04', status: 'synced', ok: true },
    { name: 'iPad Air (M2)', status: 'idle', ok: false },
    { name: 'Surface Pro 9', status: 'synced', ok: true },
  ];

  const bars = [
    { label: 'Security', pct: 96, color: 'var(--cyan)' },
    { label: 'Compliance', pct: 88, color: 'var(--green)' },
    { label: 'Updates', pct: 74, color: 'var(--warn)' },
  ];

  return (
    <div className="phone-wrap">
      {/* glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 'clamp(280px, 35vw, 420px)',
          height: 'clamp(280px, 35vw, 420px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,245,255,.22) 0%, transparent 70%)',
          filter: 'blur(48px)',
          animation: 'glowPulse 4s ease-in-out infinite',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="phone-body" style={{ position: 'relative', zIndex: 1 }}>
        {/* status bar */}
        <div className="sbar">
          <span className="mono" style={{ fontSize: 9, color: 'rgba(0,245,255,.7)' }}>
            09:41
          </span>
          <div style={{ display: 'flex', gap: 3, alignItems: 'flex-end' }}>
            {[10, 7, 4].map((h, i) => (
              <div
                key={i}
                style={{
                  width: 2.5,
                  height: h,
                  borderRadius: 1,
                  background: i === 0 ? 'rgba(0,245,255,.85)' : 'rgba(255,255,255,.22)',
                }}
              />
            ))}
            <svg width="16" height="9" viewBox="0 0 18 10" style={{ marginLeft: 2 }}>
              <rect
                x="0"
                y="0"
                width="14"
                height="10"
                rx="2"
                stroke="rgba(255,255,255,.3)"
                strokeWidth="1"
                fill="none"
              />
              <rect x="14.5" y="3" width="2.5" height="4" rx="1" fill="rgba(255,255,255,.3)" />
              <rect x="1" y="1.5" width="11" height="7" rx="1" fill="rgba(0,245,255,.7)" />
            </svg>
          </div>
        </div>

        {/* screen */}
        <div className="screen">
          {/* header row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: 7,
                background: 'linear-gradient(135deg,var(--cyan),var(--cyan2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                flexShrink: 0,
              }}
            >
              ⚙
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div
                style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: 11.5,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                MDM Dashboard
              </div>
              <span className="mono" style={{ fontSize: 7, color: 'rgba(0,230,118,.75)' }}>
                ● Live
              </span>
            </div>
            <div
              style={{
                background: 'rgba(0,230,118,.1)',
                border: '1px solid rgba(0,230,118,.25)',
                borderRadius: 5,
                padding: '2px 6px',
                flexShrink: 0,
              }}
            >
              <span
                className="mono"
                style={{ fontSize: 7, color: 'var(--green)', whiteSpace: 'nowrap' }}
              >
                All systems OK
              </span>
            </div>
          </div>

          {/* stats */}
          <div style={{ display: 'flex', gap: 6 }}>
            {[
              { v: '2.4K', l: 'Devices', c: 'var(--cyan)' },
              { v: uptime + '%', l: 'Uptime', c: 'var(--green)' },
              { v: '3', l: 'Platforms', c: 'var(--warn)' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  background: 'rgba(0,245,255,.06)',
                  border: '1px solid rgba(0,245,255,.14)',
                  borderRadius: 8,
                  padding: '8px 9px',
                  minWidth: 0,
                }}
              >
                <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: s.c }}>
                  {s.v}
                </div>
                <div
                  className="mono"
                  style={{ fontSize: 7, color: 'rgba(255,255,255,.4)', marginTop: 1 }}
                >
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          {/* devices */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {devices.map((d, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 7,
                  background: 'rgba(255,255,255,.035)',
                  border: '1px solid rgba(255,255,255,.06)',
                  borderRadius: 7,
                  padding: '6px 8px',
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: d.ok ? 'var(--green)' : 'var(--warn)',
                    boxShadow: `0 0 5px ${d.ok ? 'var(--green)' : 'var(--warn)'}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  className="mono"
                  style={{
                    fontSize: 9.5,
                    color: 'rgba(255,255,255,.78)',
                    flex: 1,
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {d.name}
                </span>
                <span
                  className="mono"
                  style={{
                    fontSize: 8,
                    fontWeight: 600,
                    color: d.ok ? 'var(--green)' : 'var(--warn)',
                    flexShrink: 0,
                  }}
                >
                  {d.status}
                </span>
              </div>
            ))}
          </div>

          {/* progress bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginTop: 2 }}>
            {bars.map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span
                  className="mono"
                  style={{
                    fontSize: 7.5,
                    color: 'rgba(255,255,255,.45)',
                    width: 58,
                    flexShrink: 0,
                  }}
                >
                  {b.label}
                </span>
                <div
                  style={{
                    flex: 1,
                    background: 'rgba(255,255,255,.06)',
                    borderRadius: 3,
                    height: 5,
                    overflow: 'hidden',
                    minWidth: 0,
                  }}
                >
                  <div
                    style={{
                      width: `${b.pct}%`,
                      height: '100%',
                      borderRadius: 3,
                      background: `linear-gradient(90deg, ${b.color}, ${b.color}88)`,
                    }}
                  />
                </div>
                <span
                  className="mono"
                  style={{
                    fontSize: 7.5,
                    color: 'rgba(255,255,255,.35)',
                    width: 24,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {b.pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* corner brackets */}
      <div className="corner corner--tl" />
      <div className="corner corner--tr" />
      <div className="corner corner--bl" />
      <div className="corner corner--br" />
    </div>
  );
}

export default function HeroSection() {
  const pills = [
    { icon: '⚡', label: 'Real-time Sync' },
    { icon: '🔒', label: 'Zero-Trust Security' },
    { icon: '🚀', label: 'Zero-touch Deploy' },
    { icon: '📱', label: 'Cross-platform' },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="relative min-h-[85vh] md:min-h-screen pt-[60px] flex items-center bg-[#0B1220] overflow-hidden hero-root">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            // background: 'linear-gradient(155deg, #0d1420 0%, #080b12 45%, #060810 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: -100,
            width: 420,
            height: 420,
            borderRadius: '50%',
            // background: 'radial-gradient(circle, rgba(0,100,155,.2) 0%, transparent 70%)',
            filter: 'blur(55px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: -60,
            width: 380,
            height: 380,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,60,100,.18) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '35%',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,230,118,.06) 0%, transparent 70%)',
            filter: 'blur(50px)',
            pointerEvents: 'none',
          }}
        />
        {/* <div className="grid-overlay" /> */}

        <div
          className="hero-inner"
          style={{
            position: 'relative',
            zIndex: 10,
            // minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 48,
            flexDirection: 'row',
          }}
        >
          <div className="hero-left" style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              className="label-row reveal reveal-1"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: 24,
                justifyContent: 'flex-start',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(0,245,255,.07)',
                  border: '1px solid rgba(0,245,255,.2)',
                  borderRadius: 20,
                  padding: '5px 14px',
                }}
              >
                <div
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: 'var(--green)',
                    boxShadow: '0 0 7px var(--green)',
                    animation: 'blink 1.8s ease-in-out infinite',
                  }}
                />
                <span
                  className="mono"
                  style={{ fontSize: 11, color: 'rgba(0,245,255,.85)', letterSpacing: '.5px' }}
                >
                  v2.4 — AI-powered alerts live
                </span>
              </div>
            </div>

            <h1
              className="reveal reveal-2"
              style={{ lineHeight: 1.08, letterSpacing: '-1.5px', marginBottom: 18 }}
            >
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(2.6rem,5.8vw,4.8rem)',
                  fontWeight: 700,
                  color: '#fff',
                }}
              >
                Unified Device
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(2.6rem,5.8vw,4.8rem)',
                  fontWeight: 700,
                  background:
                    'linear-gradient(90deg, var(--cyan) 0%, var(--cyan2) 50%, var(--cyan) 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 3.5s linear infinite',
                }}
              >
                Control
              </span>
              <span
                style={{
                  display: 'block',
                  fontSize: 'clamp(1.25rem,2.8vw,1.8rem)',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,.36)',
                  marginTop: 10,
                }}
              >
                Across All Platforms
              </span>
            </h1>

            <p
              className="reveal reveal-3"
              style={{
                fontSize: 'clamp(1rem,1.15vw,1.18rem)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,.55)',
                maxWidth: 580,
                marginBottom: 28,
              }}
            >
              Secure, deploy, and manage{' '}
              <strong style={{ color: 'rgba(255,255,255,.75)' }}>Android</strong>,{' '}
              <strong style={{ color: 'rgba(255,255,255,.75)' }}>iOS</strong>, and{' '}
              <strong style={{ color: 'rgba(255,255,255,.75)' }}>Windows</strong> devices at
              enterprise scale — one dashboard, zero complexity.
            </p>

            <div
              className="pill-row reveal reveal-4"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 10,
                marginBottom: 32,
                justifyContent: 'flex-start',
              }}
            >
              {pills.map((p, i) => (
                <div className="pill" key={i}>
                  <span style={{ fontSize: '1.1rem' }}>{p.icon}</span>
                  <span
                    style={{ color: 'rgba(255,255,255,.82)', fontSize: '.93rem', fontWeight: 600 }}
                  >
                    {p.label}
                  </span>
                </div>
              ))}
            </div>

            <div
              className="btn-row reveal reveal-5"
              style={{
                display: 'flex',
                gap: 14,
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <button className="btn-primary" onClick={() => window.location.href = "/auth?mode=signup&redirect=/apps/mdm/console"}>
                <div className="ripple" />
                <span style={{ position: 'relative', zIndex: 1 }}>Start Free Trial</span>
                <span style={{ position: 'relative', zIndex: 1, fontSize: 18 }}>→</span>
              </button>
              <button className="btn-ghost">
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: '50%',
                    background: 'rgba(0,245,255,.1)',
                    border: '1px solid rgba(0,245,255,.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid rgba(0,245,255,.9)',
                      borderTop: '5px solid transparent',
                      borderBottom: '5px solid transparent',
                      marginLeft: 2,
                    }}
                  />
                </div>
                Watch Demo
              </button>
            </div>

            <div
              className="trust-row reveal reveal-6"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                marginTop: 10,
                justifyContent: 'flex-start',
              }}
            >
              <div style={{ display: 'flex', gap: 3 }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1L8.5 5.5H13L9.5 8.2L10.8 13L7 10L3.2 13L4.5 8.2L1 5.5H5.5L7 1Z"
                      fill="rgba(255,183,0,.85)"
                    />
                  </svg>
                ))}
              </div>
              <span className="mono" style={{ fontSize: 10, color: 'rgba(255,255,255,.37)' }}>
                Trusted by 2,400+ enterprise teams
              </span>
            </div>
          </div>

          <div
            className="hero-right"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: 'absolute',
                width: 'clamp(300px, 35vw, 440px)',
                height: 'clamp(300px, 35vw, 440px)',
                borderRadius: '50%',
                border: '1px solid rgba(0,245,255,.06)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                width: 'clamp(360px, 42vw, 520px)',
                height: 'clamp(360px, 42vw, 520px)',
                borderRadius: '50%',
                border: '1px dashed rgba(0,245,255,.045)',
                pointerEvents: 'none',
              }}
            />
            <Phone />
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg,transparent,rgba(0,245,255,.35),transparent)',
            pointerEvents: 'none',
          }}
        />
      </section>
    </>
  );
}
