import { useState, useEffect, useRef } from 'react';
import { Building2, Users, Star, CheckCircle, Quote } from 'lucide-react';

/* ═══════════════════════════════════════════
   KEYFRAMES & STYLES
   ═══════════════════════════════════════════ */
const CSS = `
  

  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(30px); }
    to   { opacity:1; transform:translateY(0); }
  }
  @keyframes scrollLeft {
    0%   { transform:translateX(0); }
    100% { transform:translateX(-50%); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes pulse {
    0%,100% { opacity:.6; transform:scale(1); }
    50%     { opacity:1; transform:scale(1.05); }
  }
  @keyframes glow {
    0%,100% { box-shadow: 0 0 20px rgba(0,245,255,.2); }
    50%     { box-shadow: 0 0 35px rgba(0,245,255,.4); }
  }
  @keyframes float {
    0%,100% { transform:translateY(0px); }
    50%     { transform:translateY(-6px); }
  }

  .testimonials-root { 
     
    // background:#080b12; 
    position:relative; 
    padding: clamp(70px, 10vw, 120px) 0;
    overflow:hidden;
  }
  .mono { font-family:'Share Tech Mono',monospace; }

  .reveal { opacity:0; animation:fadeInUp .8s cubic-bezier(.22,1,.36,1) forwards; }
  .delay-1 { animation-delay:.1s; }
  .delay-2 { animation-delay:.2s; }
  .delay-3 { animation-delay:.3s; }

  .carousel-container {
    overflow:hidden;
    position:relative;
    padding:20px 0;
    margin:0 -20px;
  }

  .carousel-track {
    display:flex;
    gap:clamp(20px, 2.5vw, 32px);
    animation:scrollLeft 40s linear infinite;
    width:max-content;
  }
  .carousel-track:hover {
    animation-play-state:paused;
  }

  .testimonial-card {
    flex-shrink:0;
    width:clamp(360px, 40vw, 480px);
    background:linear-gradient(165deg, rgba(22,27,38,.7) 0%, rgba(12,15,22,.95) 100%);
    border:1px solid rgba(0,245,255,.15);
    border-radius:20px;
    padding:clamp(28px, 3.5vw, 36px);
    position:relative;
    overflow:hidden;
    transition:all .4s cubic-bezier(.22,1,.36,1);
    cursor:pointer;
    display:flex;
    flex-direction:column;
    min-height:340px;
  }
  .testimonial-card::before {
    content:'';
    position:absolute;
    inset:0;
    background:linear-gradient(135deg, rgba(0,245,255,.08) 0%, transparent 60%);
    opacity:0;
    transition:opacity .4s;
    pointer-events:none;
  }
  .testimonial-card:hover::before { opacity:1; }
  .testimonial-card:hover {
    transform:translateY(-8px) scale(1.02);
    border-color:rgba(0,245,255,.4);
    box-shadow:0 24px 60px rgba(0,245,255,.2), inset 0 1px 0 rgba(255,255,255,.1);
  }
 
  @keyframes scanDown {
    0%   { top:-2px; }
    100% { top:102%; }
  }

  @media (max-width:768px) {
    .testimonial-card { width:320px !important; min-height:360px; }
  }
`;

/* ═══════════════════════════════════════════
   TESTIMONIAL CARD COMPONENT
   ═══════════════════════════════════════════ */
function TestimonialCard({ testimonial }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="testimonial-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Scan line */}
      <div className="scan-line" />

      {/* Header with avatar and company */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 20 }}>
        {/* Avatar/Image */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 14,
            background: testimonial.image
              ? `url(${testimonial.image})`
              : `linear-gradient(135deg, ${testimonial.color}33, ${testimonial.color}11)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            border: `2px solid ${testimonial.color}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            position: 'relative',
            transition: 'transform .4s',
            transform: isHovered ? 'scale(1.08) rotate(-3deg)' : 'scale(1)',
            overflow: 'hidden',
          }}
        >
          {/* Glow effect */}
          <div
            style={{
              position: 'absolute',
              inset: -8,
              borderRadius: 14,
              background: `radial-gradient(circle, ${testimonial.color}55 0%, transparent 70%)`,
              opacity: isHovered ? 1 : 0,
              transition: 'opacity .4s',
              filter: 'blur(12px)',
            }}
          />
          {/* If no image, show icon */}
          {!testimonial.image && (
            <Users
              size={32}
              color={testimonial.color}
              style={{ position: 'relative', zIndex: 1 }}
            />
          )}
        </div>

        {/* Author info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontSize: 'clamp(1.1rem, 1.25vw, 1.2rem)',
              fontWeight: 700,
              color: '#fff',
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            {testimonial.name}
            <CheckCircle size={16} color="#00e676" strokeWidth={2.5} />
          </div>
          <div
            className="mono"
            style={{
              fontSize: 'clamp(0.85rem, 0.95vw, 0.95rem)',
              color: 'rgba(255,255,255,.5)',
              marginBottom: 8,
            }}
          >
            {testimonial.role}
          </div>
          {/* Company badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: `${testimonial.color}15`,
              border: `1px solid ${testimonial.color}33`,
              borderRadius: 8,
              padding: '4px 12px',
            }}
          >
            <Building2 size={14} color={testimonial.color} />
            <span
              className="mono"
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: testimonial.color,
                letterSpacing: '.3px',
              }}
            >
              {testimonial.company}
            </span>
          </div>
        </div>
      </div>

      {/* Quote icon */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          opacity: 0.15,
          animation: isHovered ? 'float 3s ease-in-out infinite' : 'none',
        }}
      >
        <Quote size={48} color={testimonial.color} strokeWidth={1.5} />
      </div>

      {/* Rating stars */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 16, position: 'relative', zIndex: 1 }}>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill="#ffb300"
            color="#ffb300"
            strokeWidth={1.5}
            style={{
              animation: isHovered ? `pulse 0.6s ease-in-out ${i * 0.1}s infinite` : 'none',
            }}
          />
        ))}
      </div>

      {/* Testimonial text */}
      <p
        style={{
          fontSize: 'clamp(1rem, 1.15vw, 1.1rem)',
          lineHeight: 1.75,
          color: 'rgba(255,255,255,.75)',
          flex: 1,
          position: 'relative',
          zIndex: 1,
          fontStyle: 'italic',
        }}
      >
        "{testimonial.quote}"
      </p>

      {/* Bottom gradient line */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${testimonial.color}, transparent)`,
          opacity: isHovered ? 1 : 0,
          transition: 'opacity .4s',
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════
   STATS BAR
   ═══════════════════════════════════════════ */
function StatsBar() {
  const stats = [
    { value: '2,400+', label: 'Enterprise Customers', icon: Building2, color: '#00f5ff' },
    { value: '4.9/5', label: 'Average Rating', icon: Star, color: '#ffb300' },
    { value: '99.2%', label: 'Customer Satisfaction', icon: CheckCircle, color: '#00e676' },
  ];

  return (
    <div
      className="reveal delay-3"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'clamp(20px, 3vw, 32px)',
        marginTop: 64,
        padding: 'clamp(28px, 4vw, 40px)',
        background: 'rgba(0,245,255,.04)',
        border: '1px solid rgba(0,245,255,.15)',
        borderRadius: 20,
        position: 'relative',
        overflow: 'hidden',
        maxWidth: 1200,
        margin: '64px auto 0',
      }}
    >
      {stats.map((stat, i) => (
        <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 56,
              height: 56,
              borderRadius: 12,
              background: `${stat.color}15`,
              border: `1px solid ${stat.color}33`,
              marginBottom: 12,
            }}
          >
            <stat.icon size={28} color={stat.color} strokeWidth={2} />
          </div>
          <div
            style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 700,
              background: `linear-gradient(135deg, ${stat.color}, ${stat.color}cc)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8,
            }}
          >
            {stat.value}
          </div>
          <div
            className="mono"
            style={{
              fontSize: 'clamp(0.85rem, 1vw, 0.95rem)',
              color: 'rgba(255,255,255,.5)',
              letterSpacing: '.3px',
            }}
          >
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "Switching to this MDM platform cut our device management time by 70%. The AI-powered threat detection has caught issues we didn't even know existed.",
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      company: 'TechCorp Solutions',
      image: null, // Add image URL here if available
      color: '#00f5ff',
    },
    {
      quote:
        'The zero-touch deployment is a game changer. We onboarded 500 new devices in under a week with minimal IT involvement. Absolutely incredible.',
      name: 'Michael Rodriguez',
      role: 'IT Director',
      company: 'FinanceHub Inc',
      image: null,
      color: '#00e676',
    },
    {
      quote:
        'Cross-platform management that actually works. Managing iOS, Android, and Windows from one dashboard has simplified our entire infrastructure.',
      name: 'Emily Watson',
      role: 'Head of Operations',
      company: 'GlobalCo Enterprise',
      image: null,
      color: '#ffb300',
    },
    {
      quote:
        'Security compliance was our biggest nightmare. Now we maintain SOC 2 and GDPR compliance effortlessly with automated reporting.',
      name: 'David Kim',
      role: 'Security Lead',
      company: 'SecureNet Systems',
      image: null,
      color: '#ff6b9d',
    },
    {
      quote:
        'The real-time analytics dashboard gives us insights we never had before. We can predict device issues before they become problems.',
      name: 'Lisa Martinez',
      role: 'VP of IT',
      company: 'DataFlow Analytics',
      image: null,
      color: '#7c4dff',
    },
    {
      quote:
        'Best support team in the industry. They helped us migrate 2,000+ devices with zero downtime. The ROI was evident within the first month.',
      name: 'James Thompson',
      role: 'Infrastructure Manager',
      company: 'CloudScale Tech',
      image: null,
      color: '#00bcd4',
    },
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="testimonials-root">
        {/* Background */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(0,245,255,.008) 0px, transparent 1px, transparent 56px), repeating-linear-gradient(90deg, rgba(0,245,255,.008) 0px, transparent 1px, transparent 56px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '50%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,245,255,.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: 'clamp(48px, 6vw, 64px)',
              padding: '0 clamp(20px, 5vw, 80px)',
            }}
          >
            {/* Badge */}
            <div className="reveal delay-1" style={{ marginBottom: 20 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255,183,0,.1)',
                  border: '1px solid rgba(255,183,0,.3)',
                  borderRadius: 20,
                  padding: '6px 16px',
                }}
              >
                <Quote size={16} color="#ffb300" strokeWidth={2.5} />
                <span
                  className="mono"
                  style={{ fontSize: 11, color: '#ffb300', letterSpacing: '.5px' }}
                >
                  TRUSTED BY LEADERS
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
              <span style={{ color: '#fff' }}>What Our Customers</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #ffb300 0%, #ff9100 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Are Saying
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
              Join thousands of IT leaders who trust us to manage their enterprise device fleets.
            </p>
          </div>

          {/* Horizontal Scrolling Carousel */}
          <div className="carousel-container">
            {/* Gradient overlays */}
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
              {duplicatedTestimonials.map((testimonial, i) => (
                <TestimonialCard key={i} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <StatsBar />
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
