import { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════
   KEYFRAMES & STYLES
   ═══════════════════════════════════════════ */
const CSS = `
  

  @keyframes fadeIn {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes scroll {
    0%   { transform:translateX(0); }
    100% { transform:translateX(-50%); }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 15px rgba(0,245,255,.1); }
    50%     { box-shadow: 0 0 25px rgba(0,245,255,.25); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  .carousel-root { 
     
    
    position:relative; 
    padding: clamp(60px, 8vw, 100px) 0;
    overflow:hidden;
  }
  .mono { font-family:'Share Tech Mono',monospace; }

  .reveal { opacity:0; animation:fadeIn .8s cubic-bezier(.22,1,.36,1) forwards; }
  .delay-1 { animation-delay:.1s; }
  .delay-2 { animation-delay:.2s; }
  .delay-3 { animation-delay:.3s; }

  .carousel-track {
    display:flex;
    gap:clamp(24px, 3vw, 40px);
    animation:scroll 40s linear infinite;
  }
  .carousel-track:hover {
    animation-play-state:paused;
  }

  .logo-card {
    flex-shrink:0;
    width:clamp(180px, 20vw, 240px);
    height:clamp(100px, 12vw, 140px);
 
    border-radius:16px;
    display:flex;
    align-items:center;
    justify-content:center;
    position:relative;
    transition:all .4s cubic-bezier(.22,1,.36,1);
    cursor:pointer;
    overflow:hidden;
  }
 

  @media (max-width:768px) {
    .carousel-track { gap:20px; }
    .logo-card { 
      width:160px !important; 
      height:90px !important;
    }
  }
`;

/* ═══════════════════════════════════════════
   LOGO CARD COMPONENT
   ═══════════════════════════════════════════ */
function LogoCard({ company }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="logo-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scan line effect on hover */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 2,
            // background: 'linear-gradient(90deg, transparent, rgba(0,245,255,.6), transparent)',
            animation: 'scroll 1.5s linear infinite',
          }}
        />
      )}

      {/* Logo container */}
      {/* <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          position: 'relative',
          zIndex: 1,
          transition: 'transform .4s',
          transform: isHovered ? 'scale(1.08)' : 'scale(1)',
        }}
      > */}
      {/* Logo image (replaces emoji icon) */}
      <img
        src={company.logo}
        alt={company.name}
        style={{
          maxWidth: '75%',
          maxHeight: 'clamp(40px, 5vw, 60px)',
          width: 'auto',
          height: 'auto',
          objectFit: 'contain',
          // filter: isHovered
          //   ? 'drop-shadow(0 4px 12px rgba(0,245,255,.6)) brightness(1.15)'
          //   : 'drop-shadow(0 2px 6px rgba(0,0,0,.3))',
          transition: 'filter .4s, transform .4s',
          transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        }}
      />

      {/* Company name */}
      {/* <div
          style={{
            fontSize: 'clamp(0.95rem, 1.1vw, 1.1rem)',
            fontWeight: 700,
            color: isHovered ? '#00f5ff' : 'rgba(255,255,255,.7)',
            letterSpacing: '.5px',
            transition: 'color .4s',
          }}
        >
          {company.name}
        </div> */}
      {/* </div> */}

      {/* Glow effect on hover */}
      {/* {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: -20,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(0,245,255,.22) 0%, transparent 70%)`,
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />
      )} */}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function TrustedByCarousel() {
  const clients = [
    {
      name: 'Microsoft',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
    },
    {
      name: 'Google',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    },
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    },
    {
      name: 'Samsung',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Samsung_wordmark.svg',
    },
    {
      name: 'IBM',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    },
    {
      name: 'Oracle',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
    },
    {
      name: 'Apple',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    },
    {
      name: 'Intel',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg',
    },
    {
      name: 'Cisco',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
    },
    {
      name: 'Dell',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
    },
    {
      name: 'HP',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
    },
    {
      name: 'Lenovo',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg',
    },
    {
      name: 'Sony',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
    },
    {
      name: 'Adobe',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg',
    },
  ];

  // Duplicate clients for seamless loop
  const duplicatedClients = [...clients, ...clients];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="carousel-root">
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(90deg, rgba(0,245,255,.006) 0px, transparent 1px, transparent 80px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            height: '100%',
            background: 'radial-gradient(ellipse, rgba(0,245,255,.04) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(40px, 5vw, 56px)',
              padding: '0 20px',
            }}
          >
            {/* Badge */}
            <div className="reveal delay-1" style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(0,245,255,.08)',
                  border: '1px solid rgba(0,245,255,.2)',
                  borderRadius: 20,
                  padding: '5px 14px',
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#00e676',
                    boxShadow: '0 0 8px #00e676',
                    animation: 'glow 2s ease-in-out infinite',
                  }}
                />
                <span
                  className="mono"
                  style={{ fontSize: 11, color: 'rgba(0,245,255,.9)', letterSpacing: '.5px' }}
                >
                  TRUSTED WORLDWIDE
                </span>
              </div>
            </div>

            {/* Title */}
            <h2
              className="reveal delay-2"
              style={{
                fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                fontWeight: 700,
                lineHeight: 1.3,
                marginBottom: 14,
              }}
            >
              <span style={{ color: 'rgba(255,255,255,.65)' }}>Trusted by </span>
              <span
                style={{
                  background: 'linear-gradient(90deg, #00f5ff 0%, #00e676 50%, #ffb300 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 4s linear infinite',
                }}
              >
                2,400+ Enterprises
              </span>
            </h2>

            <p
              className="reveal delay-3"
              style={{
                fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
                color: 'rgba(255,255,255,.45)',
                maxWidth: 600,
                margin: '0 auto',
              }}
            >
              From Fortune 500 companies to fast-growing startups, leading organizations choose our
              platform for enterprise device management.
            </p>
          </div>

          {/* Carousel container */}
          <div
            className="reveal delay-3"
            style={{
              position: 'relative',
              overflow: 'hidden',
              padding: '20px 0',
            }}
          >
            {/* Gradient overlays for fade effect */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: 'clamp(60px, 10vw, 120px)',
                background: 'linear-gradient(90deg, #080b12 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 'clamp(60px, 10vw, 120px)',
                background: 'linear-gradient(270deg, #080b12 0%, transparent 100%)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />

            {/* Scrolling track */}
            <div className="carousel-track">
              {duplicatedClients.map((company, i) => (
                <LogoCard key={i} company={company} />
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div
            className="reveal delay-3"
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 'clamp(32px, 5vw, 60px)',
              marginTop: 'clamp(40px, 5vw, 56px)',
              padding: '0 20px',
              flexWrap: 'wrap',
            }}
          >
            {[
              { value: '2.4M+', label: 'Devices Managed' },
              { value: '140+', label: 'Countries' },
              { value: '99.9%', label: 'Platform Uptime' },
            ].map((stat, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    fontSize: 'clamp(1.6rem, 2.5vw, 2rem)',
                    fontWeight: 700,
                    background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: 6,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  className="mono"
                  style={{
                    fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
                    color: 'rgba(255,255,255,.4)',
                    letterSpacing: '.4px',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top line */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,.2), transparent)',
          }}
        />

        {/* Bottom line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,245,255,.2), transparent)',
          }}
        />
      </section>
    </>
  );
}
