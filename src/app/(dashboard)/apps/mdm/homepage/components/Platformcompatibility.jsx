// import { useState } from 'react';

// /* ═══════════════════════════════════════════
//    KEYFRAMES & STYLES
//    ═══════════════════════════════════════════ */
// const CSS = `
//

//   @keyframes fadeInScale {
//     from { opacity:0; transform:scale(.92); }
//     to   { opacity:1; transform:scale(1); }
//   }
//   @keyframes float {
//     0%,100% { transform:translateY(0px); }
//     50%     { transform:translateY(-12px); }
//   }
//   @keyframes syncPulse {
//     0%   { transform:scale(1); opacity:.7; }
//     50%  { transform:scale(1.3); opacity:1; }
//     100% { transform:scale(1); opacity:.7; }
//   }
//   @keyframes dataFlow {
//     0%   { offset-distance:0%; opacity:0; }
//     10%  { opacity:1; }
//     90%  { opacity:1; }
//     100% { offset-distance:100%; opacity:0; }
//   }
//   @keyframes shimmer {
//     0%   { background-position: -200% center; }
//     100% { background-position: 200% center; }
//   }
//   @keyframes ping {
//     0%   { transform:scale(1); opacity:.6; }
//     100% { transform:scale(2.2); opacity:0; }
//   }

//   .platform-root {
//

//     position:relative;
//     padding: clamp(70px, 10vw, 120px) clamp(20px, 5vw, 80px);
//     overflow:hidden;
//   }
//   .mono { font-family:'Share Tech Mono',monospace; }

//   .reveal { opacity:0; animation:fadeInScale .8s cubic-bezier(.22,1,.36,1) forwards; }
//   .delay-1 { animation-delay:.15s; }
//   .delay-2 { animation-delay:.3s; }
//   .delay-3 { animation-delay:.45s; }
//   .delay-4 { animation-delay:.6s; }
//   .delay-5 { animation-delay:.75s; }

//   .device-card {
//     background:linear-gradient(165deg, rgba(22,27,38,.7) 0%, rgba(12,15,22,.9) 100%);
//     border:1px solid rgba(0,245,255,.12);
//     border-radius:20px;
//     padding:clamp(28px, 3.5vw, 40px);
//     position:relative;
//     transition:all .4s cubic-bezier(.22,1,.36,1);
//     cursor:pointer;
//   }
//   .device-card:hover {
//     transform:translateY(-8px) scale(1.02);
//     border-color:rgba(0,245,255,.35);
//     box-shadow:0 24px 60px rgba(0,245,255,.2), inset 0 1px 0 rgba(255,255,255,.08);
//   }
//   .device-card::before {
//     content:'';
//     position:absolute;
//     inset:0;
//     background:linear-gradient(140deg, rgba(0,245,255,.06) 0%, transparent 60%);
//     border-radius:20px;
//     opacity:0;
//     transition:opacity .4s;
//   }
//   .device-card:hover::before { opacity:1; }

//   @media (max-width:968px) {
//     .devices-grid {
//       grid-template-columns:1fr !important;
//       gap:24px !important;
//     }
//   }
// `;

// /* ═══════════════════════════════════════════
//    DEVICE CARD COMPONENT
//    ═══════════════════════════════════════════ */
// function DeviceCard({ device, delay }) {
//   const [isActive, setIsActive] = useState(false);

//   return (
//     <div
//       className={`device-card reveal delay-${delay}`}
//       onMouseEnter={() => setIsActive(true)}
//       onMouseLeave={() => setIsActive(false)}
//     >
//       {/* Status indicator */}
//       <div
//         style={{
//           position: 'absolute',
//           top: 20,
//           right: 20,
//           display: 'flex',
//           alignItems: 'center',
//           gap: 6,
//           background: 'rgba(0,230,118,.12)',
//           border: '1px solid rgba(0,230,118,.25)',
//           borderRadius: 20,
//           padding: '4px 12px',
//         }}
//       >
//         <div
//           style={{
//             width: 6,
//             height: 6,
//             borderRadius: '50%',
//             background: '#00e676',
//             boxShadow: '0 0 8px #00e676',
//             animation: isActive ? 'syncPulse 1.2s ease-in-out infinite' : 'none',
//           }}
//         />
//         <span className="mono" style={{ fontSize: 10, color: '#00e676', letterSpacing: '.4px' }}>
//           SYNCED
//         </span>
//       </div>

//       {/* Device illustration */}
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: 180,
//           marginBottom: 24,
//           position: 'relative',
//         }}
//       >
//         <div
//           style={{
//             fontSize: device.iconSize || 100,
//             animation: isActive ? 'float 2s ease-in-out infinite' : 'none',
//             filter: 'drop-shadow(0 8px 24px rgba(0,245,255,.2))',
//           }}
//         >
//           {device.icon}
//         </div>

//         {/* Glow effect */}
//         <div
//           style={{
//             position: 'absolute',
//             inset: 20,
//             borderRadius: '50%',
//             background: `radial-gradient(circle, ${device.color}33 0%, transparent 70%)`,
//             filter: 'blur(40px)',
//             opacity: isActive ? 1 : 0.5,
//             transition: 'opacity .4s',
//           }}
//         />

//         {/* Ping rings */}
//         {isActive &&
//           [0, 0.4, 0.8].map((delay, i) => (
//             <div
//               key={i}
//               style={{
//                 position: 'absolute',
//                 inset: 40,
//                 border: `2px solid ${device.color}`,
//                 borderRadius: '50%',
//                 animation: 'ping 2s ease-out infinite',
//                 animationDelay: `${delay}s`,
//               }}
//             />
//           ))}
//       </div>

//       {/* Device info */}
//       <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
//         <h3
//           style={{
//             fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)',
//             fontWeight: 700,
//             color: '#fff',
//             marginBottom: 8,
//           }}
//         >
//           {device.name}
//         </h3>
//         <p
//           className="mono"
//           style={{
//             fontSize: 'clamp(0.9rem, 1vw, 1rem)',
//             color: 'rgba(255,255,255,.5)',
//             marginBottom: 18,
//           }}
//         >
//           {device.description}
//         </p>

//         {/* Features */}
//         <div
//           style={{
//             display: 'flex',
//             flexWrap: 'wrap',
//             gap: 8,
//             justifyContent: 'center',
//             marginBottom: 20,
//           }}
//         >
//           {device.features.map((f, i) => (
//             <div
//               key={i}
//               style={{
//                 background: `${device.color}15`,
//                 border: `1px solid ${device.color}33`,
//                 borderRadius: 6,
//                 padding: '5px 12px',
//               }}
//             >
//               <span className="mono" style={{ fontSize: 10, color: device.color, fontWeight: 600 }}>
//                 {f}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Stats */}
//         <div
//           style={{
//             display: 'flex',
//             gap: 20,
//             justifyContent: 'center',
//             paddingTop: 18,
//             borderTop: '1px solid rgba(255,255,255,.08)',
//           }}
//         >
//           <div>
//             <div
//               style={{
//                 fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
//                 fontWeight: 700,
//                 color: device.color,
//               }}
//             >
//               {device.devices}
//             </div>
//             <div
//               className="mono"
//               style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 2 }}
//             >
//               Devices
//             </div>
//           </div>
//           <div>
//             <div
//               style={{
//                 fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
//                 fontWeight: 700,
//                 color: device.color,
//               }}
//             >
//               {device.uptime}
//             </div>
//             <div
//               className="mono"
//               style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 2 }}
//             >
//               Uptime
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    SYNC VISUALIZATION
//    ═══════════════════════════════════════════ */
// function SyncVisualization() {
//   return (
//     <div
//       style={{
//         position: 'relative',
//         height: 200,
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         margin: '60px 0',
//       }}
//     >
//       {/* Center hub */}
//       <div
//         style={{
//           width: 80,
//           height: 80,
//           borderRadius: '50%',
//           background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           fontSize: 36,
//           boxShadow: '0 0 40px rgba(0,245,255,.5), inset 0 2px 0 rgba(255,255,255,.2)',
//           position: 'relative',
//           zIndex: 2,
//         }}
//       >
//         🔄
//       </div>

//       {/* Connection lines */}
//       {[0, 120, 240].map((angle, i) => {
//         const rad = (angle * Math.PI) / 180;
//         const distance = 160;
//         const x = Math.cos(rad) * distance;
//         const y = Math.sin(rad) * distance;

//         return (
//           <div key={i}>
//             {/* Line */}
//             <svg
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: `translate(-50%, -50%) rotate(${angle}deg)`,
//                 width: distance * 2,
//                 height: 2,
//                 pointerEvents: 'none',
//               }}
//               viewBox={`0 0 ${distance * 2} 2`}
//             >
//               <line
//                 x1="0"
//                 y1="1"
//                 x2={distance * 2}
//                 y2="1"
//                 stroke="url(#lineGradient)"
//                 strokeWidth="2"
//                 strokeDasharray="4 4"
//               />
//               <defs>
//                 <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
//                   <stop offset="0%" stopColor="rgba(0,245,255,.1)" />
//                   <stop offset="50%" stopColor="rgba(0,245,255,.4)" />
//                   <stop offset="100%" stopColor="rgba(0,245,255,.1)" />
//                 </linearGradient>
//               </defs>
//             </svg>

//             {/* Data packets */}
//             <div
//               style={{
//                 position: 'absolute',
//                 top: `calc(50% + ${y}px)`,
//                 left: `calc(50% + ${x}px)`,
//                 width: 8,
//                 height: 8,
//                 borderRadius: '50%',
//                 background: ['#00f5ff', '#00e676', '#ffb300'][i],
//                 boxShadow: `0 0 12px ${['#00f5ff', '#00e676', '#ffb300'][i]}`,
//                 animation: 'syncPulse 2s ease-in-out infinite',
//                 animationDelay: `${i * 0.3}s`,
//               }}
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════
//    MAIN COMPONENT
//    ═══════════════════════════════════════════ */
// export default function PlatformCompatibility() {
//   const devices = [
//     {
//       name: 'Android',
//       icon: '📱',
//       iconSize: 100,
//       description: 'Complete device management',
//       color: '#00e676',
//       devices: '1.2K',
//       uptime: '99.9%',
//       features: ['KNOX', 'Work Profile', 'BYOD'],
//     },
//     {
//       name: 'iOS / iPadOS',
//       icon: '🍎',
//       iconSize: 95,
//       description: 'Native Apple integration',
//       color: '#00f5ff',
//       devices: '890',
//       uptime: '99.8%',
//       features: ['DEP', 'VPP', 'Supervised'],
//     },
//     {
//       name: 'Windows',
//       icon: '💻',
//       iconSize: 100,
//       description: 'Enterprise desktop control',
//       color: '#ffb300',
//       devices: '340',
//       uptime: '99.7%',
//       features: ['Autopilot', 'Intune', 'BitLocker'],
//     },
//   ];

//   return (
//     <>
//       <style dangerouslySetInnerHTML={{ __html: CSS }} />

//       <section className="platform-root">
//         {/* Background */}
//         <div
//           style={{
//             position: 'absolute',
//             inset: 0,
//             background:
//               'repeating-linear-gradient(0deg, rgba(0,245,255,.01) 0px, transparent 1px, transparent 52px), repeating-linear-gradient(90deg, rgba(0,245,255,.01) 0px, transparent 1px, transparent 52px)',
//             pointerEvents: 'none',
//           }}
//         />
//         <div
//           style={{
//             position: 'absolute',
//             bottom: '-10%',
//             right: '-10%',
//             width: '50%',
//             height: '60%',
//             borderRadius: '50%',
//             background: 'radial-gradient(circle, rgba(0,153,221,.08) 0%, transparent 70%)',
//             filter: 'blur(90px)',
//             pointerEvents: 'none',
//           }}
//         />

//         {/* Content */}
//         <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
//           {/* Header */}
//           <div style={{ textAlign: 'center', marginBottom: 48 }}>
//             {/* Badge */}
//             <div className="reveal delay-1" style={{ marginBottom: 20 }}>
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
//                 <span style={{ fontSize: 16 }}>🔗</span>
//                 <span
//                   className="mono"
//                   style={{ fontSize: 11, color: 'rgba(0,245,255,.9)', letterSpacing: '.5px' }}
//                 >
//                   CROSS-PLATFORM
//                 </span>
//               </div>
//             </div>

//             {/* Title */}
//             <h2
//               className="reveal delay-2"
//               style={{
//                 fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
//                 fontWeight: 700,
//                 lineHeight: 1.15,
//                 marginBottom: 18,
//               }}
//             >
//               <span style={{ color: '#fff' }}>One Dashboard</span>
//               <br />
//               <span
//                 style={{
//                   background: 'linear-gradient(90deg, #00f5ff 0%, #00e676 50%, #ffb300 100%)',
//                   backgroundSize: '200% auto',
//                   WebkitBackgroundClip: 'text',
//                   WebkitTextFillColor: 'transparent',
//                   animation: 'shimmer 4s linear infinite',
//                 }}
//               >
//                 Every Platform
//               </span>
//             </h2>

//             {/* Subtitle */}
//             <p
//               className="reveal delay-3"
//               style={{
//                 fontSize: 'clamp(1.05rem, 1.3vw, 1.2rem)',
//                 lineHeight: 1.7,
//                 color: 'rgba(255,255,255,.5)',
//                 maxWidth: 680,
//                 margin: '0 auto',
//               }}
//             >
//               Seamlessly manage Android, iOS, and Windows devices from a single unified interface.
//               Real-time sync across all platforms.
//             </p>
//           </div>

//           {/* Sync visualization */}
//           <div className="reveal delay-4">
//             <SyncVisualization />
//           </div>

//           {/* Device cards grid */}
//           <div
//             className="devices-grid"
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(3, 1fr)',
//               gap: 'clamp(24px, 3vw, 36px)',
//             }}
//           >
//             {devices.map((device, i) => (
//               <DeviceCard key={i} device={device} delay={i + 1} />
//             ))}
//           </div>

//           {/* Bottom CTA */}
//           <div
//             className="reveal delay-5"
//             style={{
//               textAlign: 'center',
//               marginTop: 64,
//               padding: '40px 32px',
//               background: 'rgba(0,245,255,.04)',
//               border: '1px solid rgba(0,245,255,.15)',
//               borderRadius: 20,
//             }}
//           >
//             <h3
//               style={{
//                 fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
//                 fontWeight: 700,
//                 color: '#fff',
//                 marginBottom: 12,
//               }}
//             >
//               Ready to unify your device management?
//             </h3>
//             <p
//               style={{
//                 fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
//                 color: 'rgba(255,255,255,.55)',
//                 marginBottom: 24,
//               }}
//             >
//               Start managing all your devices in one place. No credit card required.
//             </p>
//             <button
//               style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 gap: 10,
//                 background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
//                 color: '#080b12',
//                 fontFamily: 'Rajdhani, sans-serif',
//                 fontWeight: 700,
//                 fontSize: '1rem',
//                 padding: '14px 32px',
//                 borderRadius: 10,
//                 border: 'none',
//                 cursor: 'pointer',
//                 transition: 'all .3s',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.filter = 'brightness(1.15)';
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.filter = 'brightness(1)';
//                 e.currentTarget.style.transform = 'translateY(0)';
//               }}
//             >
//               Get Started Free
//               <span style={{ fontSize: 18 }}>→</span>
//             </button>
//           </div>
//         </div>

//         {/* Bottom line */}
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

import { useState } from 'react';
import { IoLogoAndroid } from 'react-icons/io';
import { FaApple, FaWindows } from 'react-icons/fa';
import { Link, RefreshCw } from 'lucide-react';

/* ═══════════════════════════════════════════
   KEYFRAMES & STYLES
   ═══════════════════════════════════════════ */
const CSS = `
  

  @keyframes fadeInScale {
    from { opacity:0; transform:scale(.92); }
    to   { opacity:1; transform:scale(1); }
  }
  @keyframes float {
    0%,100% { transform:translateY(0px); }
    50%     { transform:translateY(-12px); }
  }
  @keyframes syncPulse {
    0%   { transform:scale(1); opacity:.7; }
    50%  { transform:scale(1.3); opacity:1; }
    100% { transform:scale(1); opacity:.7; }
  }
  @keyframes dataFlow {
    0%   { offset-distance:0%; opacity:0; }
    10%  { opacity:1; }
    90%  { opacity:1; }
    100% { offset-distance:100%; opacity:0; }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position: 200% center; }
  }
  @keyframes ping {
    0%   { transform:scale(1); opacity:.6; }
    100% { transform:scale(2.2); opacity:0; }
  }
  @keyframes rotate {
    from { transform:rotate(0deg); }
    to   { transform:rotate(360deg); }
  }

  .platform-root { 
     
    position:relative; 
    padding: clamp(70px, 10vw, 120px) clamp(20px, 5vw, 80px);
    overflow:hidden;
  }
  .mono { font-family:'Share Tech Mono',monospace; }

  .reveal { opacity:0; animation:fadeInScale .8s cubic-bezier(.22,1,.36,1) forwards; }
  .delay-1 { animation-delay:.15s; }
  .delay-2 { animation-delay:.3s; }
  .delay-3 { animation-delay:.45s; }
  .delay-4 { animation-delay:.6s; }
  .delay-5 { animation-delay:.75s; }

  .device-card {
    background:linear-gradient(165deg, rgba(22,27,38,.7) 0%, rgba(12,15,22,.9) 100%);
    border:1px solid rgba(0,245,255,.12);
    border-radius:20px;
    padding:clamp(28px, 3.5vw, 40px);
    position:relative;
    transition:all .4s cubic-bezier(.22,1,.36,1);
    cursor:pointer;
  }
  .device-card:hover {
    transform:translateY(-8px) scale(1.02);
    border-color:rgba(0,245,255,.35);
    box-shadow:0 24px 60px rgba(0,245,255,.2), inset 0 1px 0 rgba(255,255,255,.08);
  }
  .device-card::before {
    content:'';
    position:absolute;
    inset:0;
    background:linear-gradient(140deg, rgba(0,245,255,.06) 0%, transparent 60%);
    border-radius:20px;
    opacity:0;
    transition:opacity .4s;
  }
  .device-card:hover::before { opacity:1; }

  @media (max-width:968px) {
    .devices-grid { 
      grid-template-columns:1fr !important; 
      gap:24px !important;
    }
  }
`;

/* ═══════════════════════════════════════════
   DEVICE CARD COMPONENT
   ═══════════════════════════════════════════ */
function DeviceCard({ device, delay }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className={`device-card reveal delay-${delay}`}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      {/* Status indicator */}
      <div
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(0,230,118,.12)',
          border: '1px solid rgba(0,230,118,.25)',
          borderRadius: 20,
          padding: '4px 12px',
        }}
      >
        <div
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: '#00e676',
            boxShadow: '0 0 8px #00e676',
            animation: isActive ? 'syncPulse 1.2s ease-in-out infinite' : 'none',
          }}
        />
        <span className="mono" style={{ fontSize: 10, color: '#00e676', letterSpacing: '.4px' }}>
          SYNCED
        </span>
      </div>

      {/* Device illustration */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 180,
          marginBottom: 24,
          position: 'relative',
        }}
      >
        <div
          style={{
            animation: isActive ? 'float 2s ease-in-out infinite' : 'none',
            filter: 'drop-shadow(0 8px 24px rgba(0,245,255,.2))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {device.icon}
        </div>

        {/* Glow effect */}
        <div
          style={{
            position: 'absolute',
            inset: 20,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${device.color}33 0%, transparent 70%)`,
            filter: 'blur(40px)',
            opacity: isActive ? 1 : 0.5,
            transition: 'opacity .4s',
          }}
        />

        {/* Ping rings */}
      </div>

      {/* Device info */}
      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <h3
          style={{
            fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 8,
          }}
        >
          {device.name}
        </h3>
        <p
          className="mono"
          style={{
            fontSize: 'clamp(0.9rem, 1vw, 1rem)',
            color: 'rgba(255,255,255,.5)',
            marginBottom: 18,
          }}
        >
          {device.description}
        </p>

        {/* Features */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          {device.features.map((f, i) => (
            <div
              key={i}
              style={{
                background: `${device.color}15`,
                border: `1px solid ${device.color}33`,
                borderRadius: 6,
                padding: '5px 12px',
              }}
            >
              <span className="mono" style={{ fontSize: 10, color: device.color, fontWeight: 600 }}>
                {f}
              </span>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'flex',
            gap: 20,
            justifyContent: 'center',
            paddingTop: 18,
            borderTop: '1px solid rgba(255,255,255,.08)',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                fontWeight: 700,
                color: device.color,
              }}
            >
              {device.devices}
            </div>
            <div
              className="mono"
              style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 2 }}
            >
              Devices
            </div>
          </div>
          <div>
            <div
              style={{
                fontSize: 'clamp(1.4rem, 2vw, 1.8rem)',
                fontWeight: 700,
                color: device.color,
              }}
            >
              {device.uptime}
            </div>
            <div
              className="mono"
              style={{ fontSize: 10, color: 'rgba(255,255,255,.35)', marginTop: 2 }}
            >
              Uptime
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SYNC VISUALIZATION
   ═══════════════════════════════════════════ */

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function PlatformCompatibility() {
  const devices = [
    {
      name: 'Android',
      icon: (
        <IoLogoAndroid
          size={100}
          color="#00e676"
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,230,118,.4))', color: 'greenyellow' }}
        />
      ),
      description: 'Complete device management',
      color: '#00e676',
      devices: '1.2K',
      uptime: '99.9%',
      features: ['KNOX', 'Work Profile', 'BYOD'],
    },
    {
      name: 'iOS / iPadOS',
      icon: (
        <FaApple
          size={95}
          style={{ filter: 'drop-shadow(0 4px 12px rgba(0,245,255,.4))', color: 'skyblue' }}
        />
      ),
      description: 'Native Apple integration',
      color: '#00f5ff',
      devices: '890',
      uptime: '99.8%',
      features: ['DEP', 'VPP', 'Supervised'],
    },
    {
      name: 'Windows',
      icon: (
        <FaWindows
          size={100}
          style={{ color: 'skyblue', filter: 'drop-shadow(0 4px 12px rgba(255,179,0,.4))' }}
        />
      ),
      description: 'Enterprise desktop control',
      color: '#ffb300',
      devices: '340',
      uptime: '99.7%',
      features: ['Autopilot', 'Intune', 'BitLocker'],
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <section className="platform-root">
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
            bottom: '-10%',
            right: '-10%',
            width: '50%',
            height: '60%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(0,153,221,.08) 0%, transparent 70%)',
            filter: 'blur(90px)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
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
                <Link size={16} color="rgba(0,245,255,.9)" strokeWidth={2.5} />
                <span
                  className="mono"
                  style={{ fontSize: 11, color: 'rgba(0,245,255,.9)', letterSpacing: '.5px' }}
                >
                  CROSS-PLATFORM
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
              <span style={{ color: '#fff' }}>One Dashboard</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #00f5ff 0%, #00e676 50%, #ffb300 100%)',
                  backgroundSize: '200% auto',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  animation: 'shimmer 4s linear infinite',
                }}
              >
                Every Platform
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
              Seamlessly manage Android, iOS, and Windows devices from a single unified interface.
              Real-time sync across all platforms.
            </p>
          </div>

          {/* Sync visualization */}

          {/* Device cards grid */}
          <div
            className="devices-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'clamp(24px, 3vw, 36px)',
            }}
          >
            {devices.map((device, i) => (
              <DeviceCard key={i} device={device} delay={i + 1} />
            ))}
          </div>

          {/* Bottom CTA */}
          <div
            className="reveal delay-5"
            style={{
              textAlign: 'center',
              marginTop: 64,
              padding: '40px 32px',
              background: 'rgba(0,245,255,.04)',
              border: '1px solid rgba(0,245,255,.15)',
              borderRadius: 20,
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                fontWeight: 700,
                color: '#fff',
                marginBottom: 12,
              }}
            >
              Ready to unify your device management?
            </h3>
            <p
              style={{
                fontSize: 'clamp(1rem, 1.1vw, 1.1rem)',
                color: 'rgba(255,255,255,.55)',
                marginBottom: 24,
              }}
            >
              Start managing all your devices in one place. No credit card required.
            </p>
            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'linear-gradient(135deg, #00f5ff, #0099dd)',
                color: '#080b12',
                 
                fontWeight: 700,
                fontSize: '1rem',
                padding: '14px 32px',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                transition: 'all .3s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.15)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Get Started Free
              <span style={{ fontSize: 18 }}>→</span>
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
