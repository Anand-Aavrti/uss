// import { useState } from 'react';
// import { Zap, Shield, RefreshCw, Lock, Rocket, BarChart } from 'lucide-react';

// /* ═══════════════════════════════════════════
//    KEYFRAMES & STYLES
//    ═══════════════════════════════════════════ */
// const CSS = `
//

//   @keyframes fadeInUp {
//     from { opacity:0; transform:translateY(32px); }
//     to   { opacity:1; transform:translateY(0); }
//   }
//   @keyframes float {
//     0%,100% { transform:translateY(0px); }
//     50%     { transform:translateY(-8px); }
//   }
//   @keyframes glow {
//     0%,100% { box-shadow: 0 0 20px rgba(0,245,255,.2), inset 0 0 20px rgba(0,245,255,.05); }
//     50%     { box-shadow: 0 0 30px rgba(0,245,255,.4), inset 0 0 30px rgba(0,245,255,.1); }
//   }
//   @keyframes pulse {
//     0%,100% { opacity:.6; transform:scale(1); }
//     50%     { opacity:1; transform:scale(1.05); }
//   }
//   @keyframes scan {
//     0%   { transform:translateY(-100%); }
//     100% { transform:translateY(100%); }
//   }
//   @keyframes rotate {
//     from { transform:rotate(0deg); }
//     to   { transform:rotate(360deg); }
//   }

//   .bento-root {
//
//     background:#080b12;
//     position:relative;
//     padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px);
//     overflow:hidden;
//   }
//   .mono { font-family:'Share Tech Mono',monospace; }

//   .reveal { opacity:0; animation:fadeInUp .8s cubic-bezier(.22,1,.36,1) forwards; }
//   .reveal-1 { animation-delay:.1s; }
//   .reveal-2 { animation-delay:.2s; }
//   .reveal-3 { animation-delay:.3s; }
//   .reveal-4 { animation-delay:.4s; }
//   .reveal-5 { animation-delay:.5s; }
//   .reveal-6 { animation-delay:.6s; }
//   .reveal-7 { animation-delay:.7s; }

//   .bento-card {
//     background:linear-gradient(165deg, rgba(22,27,38,.85) 0%, rgba(12,15,22,.95) 100%);
//     border:1px solid rgba(0,245,255,.15);
//     border-radius:20px;
//     padding:clamp(24px, 3vw, 36px);
//     position:relative;
//     overflow:hidden;
//     transition:all .4s cubic-bezier(.22,1,.36,1);
//     cursor:pointer;
//   }
//   .bento-card::before {
//     content:'';
//     position:absolute;
//     inset:0;
//     background:linear-gradient(140deg, rgba(0,245,255,.08) 0%, transparent 50%);
//     opacity:0;
//     transition:opacity .4s;
//   }
//   .bento-card:hover::before { opacity:1; }
//   .bento-card:hover {
//     transform:translateY(-6px);
//     border-color:rgba(0,245,255,.4);
//     box-shadow:0 20px 60px rgba(0,245,255,.15), inset 0 1px 0 rgba(255,255,255,.1);
//   }

//   .corner-accent {
//     position:absolute;
//     width:20px;
//     height:20px;
//     pointer-events:none;
//   }
//   .corner-accent--tl {
//     top:12px;
//     left:12px;
//     border-top:2px solid rgba(0,245,255,.5);
//     border-left:2px solid rgba(0,245,255,.5);
//   }
//   .corner-accent--br {
//     bottom:12px;
//     right:12px;
//     border-bottom:2px solid rgba(0,245,255,.5);
//     border-right:2px solid rgba(0,245,255,.5);
//   }

//   @media (max-width:768px) {
//     .bento-grid {
//       grid-template-columns:1fr !important;
//       gap:20px !important;
//     }
//   }
// `;

// /* ═══════════════════════════════════════════
//    FEATURE CARD COMPONENT
//    ═══════════════════════════════════════════ */
// function FeatureCard({ feature, delay, span = 1 }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className={`bento-card reveal reveal-${delay}`}
//       style={{ gridColumn: `span ${span}` }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Corner accents */}
//       <div className="corner-accent corner-accent--tl" />
//       <div className="corner-accent corner-accent--br" />

//       {/* Icon container */}
//       <div
//         style={{
//           width: 64,
//           height: 64,
//           borderRadius: 14,
//           background: `linear-gradient(135deg, ${feature.color}22, ${feature.color}11)`,
//           border: `1px solid ${feature.color}44`,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           marginBottom: 20,
//           position: 'relative',
//           transition: 'transform .4s',
//           transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
//         }}
//       >
//         {/* Glow effect */}
//         <div
//           style={{
//             position: 'absolute',
//             inset: -10,
//             borderRadius: 14,
//             background: `radial-gradient(circle, ${feature.color}33 0%, transparent 70%)`,
//             opacity: isHovered ? 1 : 0,
//             transition: 'opacity .4s',
//             filter: 'blur(12px)',
//           }}
//         />
//         <feature.icon size={32} strokeWidth={2.2} style={{ position: 'relative', zIndex: 1 }} />
//       </div>

//       {/* Content */}
//       <h3
//         style={{
//           fontSize: 'clamp(1.3rem, 2vw, 1.6rem)',
//           fontWeight: 700,
//           color: '#fff',
//           marginBottom: 10,
//           lineHeight: 1.2,
//         }}
//       >
//         {feature.title}
//       </h3>
//       <p
//         style={{
//           fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)',
//           lineHeight: 1.65,
//           color: 'rgba(255,255,255,.55)',
//           marginBottom: 18,
//         }}
//       >
//         {feature.description}
//       </p>

//       {/* Stats or badge */}
//       {feature.stat && (
//         <div
//           style={{
//             display: 'inline-flex',
//             alignItems: 'center',
//             gap: 8,
//             background: `${feature.color}15`,
//             border: `1px solid ${feature.color}33`,
//             borderRadius: 8,
//             padding: '6px 14px',
//           }}
//         >
//           <div
//             style={{
//               width: 6,
//               height: 6,
//               borderRadius: '50%',
//               background: feature.color,
//               boxShadow: `0 0 8px ${feature.color}`,
//               animation: 'pulse 2s ease-in-out infinite',
//             }}
//           />
//           <span
//             className="mono"
//             style={{
//               fontSize: 11,
//               fontWeight: 600,
//               color: feature.color,
//               letterSpacing: '.5px',
//             }}
//           >
//             {feature.stat}
//           </span>
//         </div>
//       )}

//       {/* Hover arrow */}
//       <div
//         style={{
//           position: 'absolute',
//           bottom: 24,
//           right: 24,
//           width: 32,
//           height: 32,
//           borderRadius: '50%',
//           background: `${feature.color}22`,
//           border: `1px solid ${feature.color}44`,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           opacity: isHovered ? 1 : 0,
//           transform: isHovered ? 'translateX(0)' : 'translateX(-10px)',
//           transition: 'all .3s',
//         }}
//       >
//         <span style={{ color: feature.color, fontSize: 18 }}>→</span>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    MAIN COMPONENT
//    ═══════════════════════════════════════════ */
// export default function FeaturesShowcase() {
//   const features = [
//     {
//       icon: Zap,
//       title: 'Real-time Monitoring',
//       description:
//         'Track device health, location, and compliance status in real-time with AI-powered anomaly detection.',
//       stat: 'SUB-100MS LATENCY',
//       color: '#00f5ff',
//     },
//     {
//       icon: Shield,
//       title: 'AI Threat Detection',
//       description:
//         'Machine learning models identify and neutralize security threats before they compromise your fleet.',
//       stat: '99.8% ACCURACY',
//       color: '#00e676',
//     },
//     {
//       icon: RefreshCw,
//       title: 'Multi-Platform Sync',
//       description:
//         'Seamlessly manage Android, iOS, and Windows devices from a single unified dashboard.',
//       stat: '3 PLATFORMS',
//       color: '#ffb300',
//     },
//     {
//       icon: Lock,
//       title: 'Zero-Trust Security',
//       description:
//         'Enterprise-grade encryption, biometric auth, and conditional access policies protect every endpoint.',
//       stat: 'SOC 2 COMPLIANT',
//       color: '#ff6b9d',
//     },
//     {
//       icon: Rocket,
//       title: 'Zero-Touch Deploy',
//       description:
//         'Automated device provisioning and configuration right out of the box. No IT intervention required.',
//       stat: '5-MIN SETUP',
//       color: '#7c4dff',
//     },
//     {
//       icon: BarChart,
//       title: 'Advanced Analytics',
//       description:
//         'Deep insights into device usage, app performance, and security posture with custom reporting.',
//       stat: 'REAL-TIME DASHBOARDS',
//       color: '#00bcd4',
//     },
//   ];

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: CSS }} />

//       <section className="bento-root">
//         {/* Background effects */}
//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             background:
//               'repeating-linear-gradient(0deg, rgba(0,245,255,.012) 0px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(0,245,255,.012) 0px, transparent 1px, transparent 48px)',
//             pointerEvents: 'none',
//           }}
//         />
//         <div
//           style={{
//             position: 'absolute',
//             top: '-20%',
//             right: '-10%',
//             width: '40%',
//             height: '60%',
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(0,245,255,.08) 0%, transparent 70%)',
//             filter: 'blur(80px)',
//             pointerEvents: 'none',
//           }}
//         />

//         {/* Content container */}
//         <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
//           {/* Header */}
//           <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
//             {/* Badge */}
//             <div className="reveal reveal-1" style={{ marginBottom: 20 }}>
//               <div
//                 style={{
//                   display: 'inline-flex',
//                   alignItems: 'center',
//                   gap: 8,
//                   background: 'rgba(0,245,255,.08)',
//                   border: '1px solid rgba(0,245,255,.25)',
//                   borderRadius: 20,
//                   padding: '6px 16px',
//                 }}
//               >
//                 <div
//                   style={{
//                     width: 6,
//                     height: 6,
//                     borderRadius: '50%',
//                     background: '#00e676',
//                     boxShadow: '0 0 8px #00e676',
//                     animation: 'pulse 2s ease-in-out infinite',
//                   }}
//                 />
//                 <span
//                   className="mono"
//                   style={{ fontSize: 11, color: 'rgba(0,245,255,.9)', letterSpacing: '.5px' }}
//                 >
//                   PLATFORM CAPABILITIES
//                 </span>
//               </div>
//             </div>

//             {/* Title */}
//             <h2
//               className="reveal reveal-2"
//               style={{
//                 fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
//                 fontWeight: 700,
//                 lineHeight: 1.15,
//                 marginBottom: 18,
//               }}
//             >
//               <span style={{ color: '#fff' }}>Enterprise-Grade Features</span>
//               <br />
//               <span
//                 style={{
//                   background: 'linear-gradient(90deg, #00f5ff 0%, #0099dd 100%)',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                 }}
//               >
//                 Built for Scale
//               </span>
//             </h2>

//             {/* Subtitle */}
//             <p
//               className="reveal reveal-3"
//               style={{
//                 fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
//                 lineHeight: 1.7,
//                 color: 'rgba(255,255,255,.5)',
//                 maxWidth: 680,
//                 margin: '0 auto',
//               }}
//             >
//               Everything you need to secure, manage, and monitor thousands of devices across your
//               organization—powered by AI and zero-trust architecture.
//             </p>
//           </div>

//           {/* Bento Grid */}
//           <div
//             className="bento-grid"
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(2, 1fr)',
//               gap: 'clamp(20px, 2.5vw, 32px)',
//             }}
//           >
//             {features.map((feature, i) => (
//               <FeatureCard
//                 key={i}
//                 feature={feature}
//                 delay={i + 4}
//                 span={i === 0 || i === 1 ? 1 : 1}
//               />
//             ))}
//           </div>
//         </div>

//         {/* Bottom gradient */}
//         <div
//           style={{
//             position: 'absolute',
//             bottom: 0,
//             left: 0,
//             right: 0,
//             height: 1,
//             background: 'linear-gradient(90deg, transparent, rgba(0,245,255,.3), transparent)',
//           }}
//         />
//       </section>
//     </>
//   );
// }

import { useState, useRef } from 'react';
import {
  Zap,
  Shield,
  RefreshCw,
  Lock,
  Rocket,
  BarChart,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

/* ═══════════════════════════════════════════
   KEYFRAMES & STYLES – updated for carousel
   ═══════════════════════════════════════════ */
const CSS = `
 
  @keyframes fadeInUp {
    from { opacity:0; transform:translateY(20px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .bento-root { 
     color: #f1f5f9;
    position:relative; 
    padding: clamp(60px, 8vw, 100px) clamp(20px, 5vw, 80px);
    overflow:hidden;
  }
  .mono { font-family:'Share Tech Mono',monospace; }

  .reveal { opacity:0; animation:fadeInUp .7s ease-out forwards; }
  .reveal-1 { animation-delay:.1s; }
  .reveal-2 { animation-delay:.2s; }
  .reveal-3 { animation-delay:.3s; }
  .reveal-4 { animation-delay:.4s; }
  .reveal-5 { animation-delay:.5s; }
  .reveal-6 { animation-delay:.6s; }

  .bento-card {
    background: linear-gradient(165deg, rgba(30,41,59,.92) 0%, rgba(15,23,42,.96) 100%);
    border: 1px solid rgba(59,130,246,.16);
    border-radius: 16px;
    padding: clamp(24px, 3vw, 32px);
    position: relative;
    overflow: hidden;
    transition: all .35s ease;
    cursor: pointer;
    height: 100%;
  }
  .bento-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(140deg, rgba(59,130,246,.05) 0%, transparent 60%);
    opacity: 0;
    transition: opacity .35s;
  }
  .bento-card:hover::before { opacity: 1; }
  .bento-card:hover {
    transform: translateY(-4px);
    border-color: rgba(59,130,246,.32);
    box-shadow: 0 12px 32px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.06);
  }

  .corner-accent {
    position: absolute;
    width: 18px;
    height: 18px;
    pointer-events: none;
  }
  .corner-accent--tl { 
    top: 12px; 
    left: 12px; 
    border-top: 2px solid rgba(59,130,246,.3); 
    border-left: 2px solid rgba(59,130,246,.3); 
  }
  .corner-accent--br { 
    bottom: 12px; 
    right: 12px; 
    border-bottom: 2px solid rgba(59,130,246,.3); 
    border-right: 2px solid rgba(59,130,246,.3); 
  }

  /* Carousel styles */
  .bento-carousel {
    display: flex;
    overflow-x: auto;
    gap: clamp(24px, 3vw, 32px);
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
    padding-bottom: 12px;
    -webkit-overflow-scrolling: touch;
  }
  .bento-carousel::-webkit-scrollbar { display: none; }
  .bento-carousel { -ms-overflow-style: none; scrollbar-width: none; }

  .bento-carousel-item {
    flex: 0 0 100%;
    scroll-snap-align: start;
    min-width: 280px;
  }
  @media (min-width: 768px) {
    .bento-carousel-item { flex: 0 0 48%; }
  }
  @media (min-width: 1024px) {
    .bento-carousel-item { flex: 0 0 32%; }
  }
  @media (min-width: 1280px) {
    .bento-carousel-item { flex: 0 0 24%; }
  }

  /* Navigation buttons (right-aligned) */
  .carousel-nav {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    margin-bottom: 24px;
  }
  .carousel-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(59,130,246,.08);
    border: 1px solid rgba(59,130,246,.25);
    color: #60a5fa;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all .3s ease;
    backdrop-filter: blur(8px);
  }
  .carousel-btn:hover {
    background: rgba(59,130,246,.15);
    border-color: rgba(59,130,246,.4);
    transform: scale(1.05);
  }
  .carousel-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width:768px) {
    .carousel-nav { justify-content: center; }
  }
`;

/* ═══════════════════════════════════════════
   FEATURE CARD COMPONENT (unchanged except no gridColumn)
   ═══════════════════════════════════════════ */
function FeatureCard({ feature, delay }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bento-card reveal reveal-${delay}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="corner-accent corner-accent--tl" />
      <div className="corner-accent corner-accent--br" />

      {/* Icon container */}
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 12,
          background: `linear-gradient(135deg, ${feature.color}12, ${feature.color}08)`,
          border: `1px solid ${feature.color}22`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
          position: 'relative',
          transition: 'transform .35s ease',
          transform: isHovered ? 'scale(1.06)' : 'scale(1)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: -8,
            borderRadius: 12,
            background: `radial-gradient(circle, ${feature.color}18 0%, transparent 75%)`,
            opacity: isHovered ? 0.6 : 0,
            transition: 'opacity .4s',
            filter: 'blur(10px)',
          }}
        />
        <feature.icon
          size={32}
          strokeWidth={2}
          color={feature.color}
          style={{ position: 'relative', zIndex: 1 }}
        />
      </div>

      <h3
        style={{
          fontSize: 'clamp(1.25rem, 1.9vw, 1.5rem)',
          fontWeight: 600,
          color: '#f1f5f9',
          marginBottom: 12,
          lineHeight: 1.3,
        }}
      >
        {feature.title}
      </h3>
      <p
        style={{
          fontSize: 'clamp(0.95rem, 1.1vw, 1rem)',
          lineHeight: 1.6,
          color: '#94a3b8',
          marginBottom: 20,
        }}
      >
        {feature.description}
      </p>

      {feature.stat && (
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: `${feature.color}0f`,
            border: `1px solid ${feature.color}20`,
            borderRadius: 8,
            padding: '6px 12px',
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: feature.color,
              boxShadow: `0 0 6px ${feature.color}80`,
            }}
          />
          <span
            className="mono"
            style={{
              fontSize: 11,
              fontWeight: 500,
              color: feature.color,
              letterSpacing: '.4px',
            }}
          >
            {feature.stat}
          </span>
        </div>
      )}

      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: `${feature.color}10`,
          border: `1px solid ${feature.color}20`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
          transition: 'all .3s ease',
        }}
      >
        <span style={{ color: feature.color, fontSize: 18 }}>→</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT – now with horizontal carousel + right-aligned chevrons
   ═══════════════════════════════════════════ */
export default function FeaturesShowcase() {
  const features = [
    {
      icon: Zap,
      title: 'Real-time Monitoring',
      description:
        'Track device health, location, and compliance status in real-time with AI-powered anomaly detection.',
      stat: 'SUB-100MS LATENCY',
      color: '#3b82f6', // blue-500
    },
    {
      icon: Shield,
      title: 'AI Threat Detection',
      description:
        'Machine learning models identify and neutralize security threats before they compromise your fleet.',
      stat: '99.8% ACCURACY',
      color: '#10b981', // emerald-500
    },
    {
      icon: RefreshCw,
      title: 'Multi-Platform Sync',
      description:
        'Seamlessly manage Android, iOS, and Windows devices from a single unified dashboard.',
      stat: '3 PLATFORMS',
      color: '#6366f1', // indigo-500
    },
    {
      icon: Lock,
      title: 'Zero-Trust Security',
      description:
        'Enterprise-grade encryption, biometric auth, and conditional access policies protect every endpoint.',
      stat: 'SOC 2 COMPLIANT',
      color: '#64748b', // slate-500 (neutral/security tone)
    },
    {
      icon: Rocket,
      title: 'Zero-Touch Deploy',
      description:
        'Automated device provisioning and configuration right out of the box. No IT intervention required.',
      stat: '5-MIN SETUP',
      color: '#8b5cf6', // violet-500
    },
    {
      icon: BarChart,
      title: 'Advanced Analytics',
      description:
        'Deep insights into device usage, app performance, and security posture with custom reporting.',
      stat: 'REAL-TIME DASHBOARDS',
      color: '#06b6d4', // cyan-500 (muted/teal-ish)
    },
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { current } = scrollRef;
    const scrollAmount = current.clientWidth * 0.8; // Scroll ~80% of visible area (approx one card)
    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="bento-root">
        {/* Subtle background overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'repeating-linear-gradient(0deg, rgba(59,130,246,.006) 0px, transparent 1px, transparent 48px), repeating-linear-gradient(90deg, rgba(59,130,246,.006) 0px, transparent 1px, transparent 48px)',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-15%',
            right: '-10%',
            width: '45%',
            height: '65%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,.04) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(48px, 6vw, 72px)' }}>
            <div className="reveal reveal-1" style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(59,130,246,.08)',
                  border: '1px solid rgba(59,130,246,.20)',
                  borderRadius: 9999,
                  padding: '8px 18px',
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: '#10b981',
                  }}
                />
                <span
                  className="mono"
                  style={{ fontSize: 12, color: '#60a5fa', letterSpacing: '.6px', fontWeight: 500 }}
                >
                  PLATFORM CAPABILITIES
                </span>
              </div>
            </div>

            <h2
              className="reveal reveal-2"
              style={{
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 700,
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              <span style={{ color: '#f1f5f9' }}>Enterprise-Grade Features</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00e676 0%, #00f5ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Built for Scale
              </span>
            </h2>

            <p
              className="reveal reveal-3"
              style={{
                fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)',
                lineHeight: 1.7,
                color: '#94a3b8',
                maxWidth: 720,
                margin: '0 auto',
              }}
            >
              Comprehensive tools to securely manage, monitor, and protect thousands of endpoints
              across your organization — powered by intelligent automation and zero-trust
              principles.
            </p>
          </div>

          {/* Right-aligned navigation buttons */}
          <div className="carousel-nav">
            <button
              className="carousel-btn"
              onClick={() => scroll('left')}
              aria-label="Previous features"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              className="carousel-btn"
              onClick={() => scroll('right')}
              aria-label="Next features"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Horizontal Carousel */}
          <div ref={scrollRef} className="bento-carousel">
            {features.map((feature, i) => (
              <div key={i} className="bento-carousel-item">
                <FeatureCard feature={feature} delay={i + 4} />
              </div>
            ))}
          </div>
        </div>

        {/* Subtle bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(59,130,246,.15), transparent)',
          }}
        />
      </section>
    </>
  );
}
