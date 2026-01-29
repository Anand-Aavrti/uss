// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { useTranslation } from 'react-i18next';

// const HeroSection = () => {
//   const { i18n } = useTranslation();
//   const isRTL = i18n.language === 'ar';

//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [activeTab, setActiveTab] = useState(0); // 0 = MDM, 1 = Video SDK
//   const [isLargeScreen, setIsLargeScreen] = useState(false);
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   // ─── Mouse Tilt Control ────────────────────────────────────────
//   useEffect(() => {
//     const updateScreenSize = () => {
//       setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
//     };

//     updateScreenSize();
//     window.addEventListener('resize', updateScreenSize);

//     const handleMouse = (e: MouseEvent) => {
//       if (!isLargeScreen) return;
//       const x = (e.clientX / window.innerWidth - 0.5) * 12;
//       const y = (e.clientY / window.innerHeight - 0.5) * 12;
//       setMousePos({ x, y });
//     };

//     window.addEventListener('mousemove', handleMouse);

//     return () => {
//       window.removeEventListener('resize', updateScreenSize);
//       window.removeEventListener('mousemove', handleMouse);
//     };
//   }, [isLargeScreen]);

//   // ─── Background Particles ──────────────────────────────────────
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const resize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };
//     resize();
//     window.addEventListener('resize', resize);

//     const particles = Array.from({ length: isLargeScreen ? 60 : 40 }, () => ({
//       x: Math.random() * canvas.width,
//       y: Math.random() * canvas.height,
//       vx: (Math.random() - 0.5) * 0.5,
//       vy: (Math.random() - 0.5) * 0.5,
//       size: Math.random() * 2 + 0.5,
//     }));

//     let frameId: number;
//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       ctx.fillStyle = 'rgba(14, 165, 233, 0.35)';

//       particles.forEach((p) => {
//         p.x += p.vx;
//         p.y += p.vy;
//         if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
//         ctx.fill();
//       });

//       ctx.strokeStyle = 'rgba(14, 165, 233, 0.12)';
//       ctx.lineWidth = 0.8;
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           if (Math.hypot(dx, dy) < 110) {
//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.stroke();
//           }
//         }
//       }

//       frameId = requestAnimationFrame(draw);
//     };
//     draw();

//     return () => {
//       cancelAnimationFrame(frameId);
//       window.removeEventListener('resize', resize);
//     };
//   }, [isLargeScreen]);

//   // Auto-rotate tabs
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setActiveTab((prev) => (prev + 1) % 2);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const tabs = [
//     {
//       icon: '📱',
//       name: 'MDM Solution',
//       subtitle: 'Complete device management',
//       gradient: 'from-[#0EA5E9] to-[#1B365D]',
//     },
//     {
//       icon: '🎥',
//       name: 'Video SDK',
//       subtitle: 'HD calls with live translation',
//       gradient: 'from-[#1B365D] to-[#0EA5E9]',
//     },
//   ];

//   return (
//     <section
//       dir={isRTL ? 'rtl' : 'ltr'}
//       className="relative min-h-[85vh] md:min-h-screen pt-[72px] flex items-center bg-[#0B1220] overflow-hidden"
//     >
//       {/* Particles canvas */}
//       <canvas
//         ref={canvasRef}
//         className="absolute inset-0 w-full h-full opacity-40 md:opacity-50 pointer-events-none"
//       />

//       {/* Decorative orbs */}
//       <div className="absolute -top-24 -left-20 w-80 h-80 sm:w-96 sm:h-96 bg-[#0EA5E9]/15 rounded-full blur-3xl animate-pulse" />
//       <div
//         className="absolute -bottom-32 -right-20 w-80 h-80 sm:w-96 sm:h-96 bg-[#1B365D]/20 rounded-full blur-3xl animate-pulse"
//         style={{ animationDelay: '1.3s' }}
//       />

//       <div className="relative container mx-auto px-5 sm:px-6 lg:px-8 py-10 sm:py-16 z-10">
//         <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
//           {/* ─── LEFT ─── Text + CTA ─────────────────────────────────── */}
//           <div className={`w-full space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
//             <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 backdrop-blur-md">
//               <div className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] animate-pulse" />
//               <span className="text-sm font-medium text-[#0EA5E9]">
//                 Next-Gen Enterprise Solutions
//               </span>
//             </div>

//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
//               <span className="bg-gradient-to-r from-[#0EA5E9] via-[#1B365D] to-[#0EA5E9] bg-clip-text text-transparent">
//                 Unified Smart
//               </span>
//               <br />
//               <span className="text-white">Solutions</span>
//             </h1>

//             <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-3xl">
//               Enterprise-grade MDM and Video SDK with real-time translation. Superior performance,
//               military-grade security, unmatched global reliability.
//             </p>

//             {/* Tab selector */}
//             <div className="flex flex-wrap gap-3 sm:gap-4">
//               {tabs.map((tab, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => setActiveTab(idx)}
//                   className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
//                     activeTab === idx
//                       ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl shadow-[#0EA5E9]/30 scale-[1.04]`
//                       : 'bg-white/6 text-white/80 hover:bg-white/12 border border-white/10'
//                   }`}
//                 >
//                   <span className="flex items-center gap-2.5">
//                     <span className="text-2xl">{tab.icon}</span>
//                     {tab.name}
//                   </span>
//                 </button>
//               ))}
//             </div>

//             {/* CTAs */}
//             <div
//               className={`flex flex-col sm:flex-row gap-4 pt-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
//             >
//               <Link
//                 href="/pricing-plans"
//                 className="group relative px-7 py-4 rounded-xl font-semibold text-base bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white overflow-hidden shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 transition-all duration-300"
//               >
//                 <span className="relative flex items-center justify-center gap-2.5">
//                   Start Free Trial
//                   <svg
//                     className="w-5 h-5 group-hover:translate-x-1.5 transition-transform"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M13 7l5 5m0 0l-5 5m5-5H6"
//                     />
//                   </svg>
//                 </span>
//               </Link>

//               <Link
//                 href="/pricing-plans"
//                 className="px-7 py-4 rounded-xl font-semibold border-2 border-white/20 text-white hover:bg-white/5 hover:border-[#0EA5E9]/50 transition-all duration-300 text-center"
//               >
//                 View Demo
//               </Link>
//             </div>

//             {/* Stats */}
//             <div className="grid grid-cols-3 gap-5 pt-8">
//               {[
//                 { value: '99.99%', label: 'Uptime' },
//                 { value: '85+', label: 'Countries' },
//                 { value: '<50ms', label: 'Latency' },
//               ].map((item, i) => (
//                 <div key={i} className="text-center">
//                   <div className="text-3xl md:text-4xl font-bold text-[#0EA5E9]">{item.value}</div>
//                   <div className="text-sm text-white/70 mt-1.5">{item.label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ─── RIGHT ─── Visual Card ───────────────────────────────── */}
//           <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mt-8 lg:mt-0">
//             <div
//               className="relative w-full aspect-square mx-auto"
//               style={{
//                 transform: isLargeScreen
//                   ? `perspective(1100px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
//                   : 'none',
//                 transition: 'transform 0.18s ease-out',
//               }}
//             >
//               <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#1B365D]/65 to-[#0B1220]/75 backdrop-blur-xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8 overflow-hidden">
//                 {activeTab === 0 ? (
//                   <div className="h-full flex flex-col space-y-4 animate-fadeIn">
//                     {/* MDM content placeholder – paste your original MDM block here */}
//                     <div className="space-y-3 sm:space-y-4 h-full flex flex-col animate-fadeIn">
//                       {/* Header */}
//                       <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
//                         <div className="flex items-center gap-2 sm:gap-3">
//                           <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center">
//                             <svg
//                               className="w-4 h-4 sm:w-6 sm:h-6 text-white"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//                               />
//                             </svg>
//                           </div>
//                           <div>
//                             <div className="text-white font-semibold text-sm sm:text-base">
//                               Device Management
//                             </div>
//                             <div className="text-xs text-white/60">1,247 devices monitored</div>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-1.5 sm:gap-2">
//                           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                           <span className="text-xs text-green-400">Active</span>
//                         </div>
//                       </div>

//                       {/* Device Grid */}
//                       <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 flex-1">
//                         {[
//                           { type: 'iOS', count: '342', status: 'Secure', icon: '📱' },
//                           { type: 'Android', count: '289', status: 'Secure', icon: '📱' },
//                           { type: 'Windows', count: '156', status: 'Secure', icon: '💻' },
//                           { type: 'macOS', count: '234', status: 'Secure', icon: '💻' },
//                           { type: 'Linux', count: '89', status: 'Secure', icon: '🖥️' },
//                           { type: 'Tablets', count: '137', status: 'Secure', icon: '📱' },
//                         ].map((device, index) => (
//                           <div
//                             key={index}
//                             className="relative rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1B365D]/40 to-[#0B1220]/40 border border-white/10 p-2.5 sm:p-4 group hover:border-[#0EA5E9]/50 transition-all"
//                           >
//                             <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg sm:rounded-xl" />
//                             <div className="relative space-y-1.5 sm:space-y-2">
//                               <div className="text-xl sm:text-2xl">{device.icon}</div>
//                               <div>
//                                 <div className="text-white text-xs sm:text-sm font-medium">
//                                   {device.type}
//                                 </div>
//                                 <div className="text-[#0EA5E9] text-lg sm:text-xl font-bold">
//                                   {device.count}
//                                 </div>
//                               </div>
//                               <div className="flex items-center gap-1">
//                                 <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500" />
//                                 <span className="text-xs text-green-400">{device.status}</span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       {/* MDM Features Banner */}
//                       <div className="relative rounded-lg sm:rounded-xl bg-gradient-to-r from-[#0EA5E9]/20 to-[#1B365D]/20 border border-[#0EA5E9]/30 p-3 sm:p-4 overflow-hidden">
//                         <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 to-transparent animate-pulse" />
//                         <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
//                           <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center flex-shrink-0">
//                             <svg
//                               className="w-3 h-3 sm:w-5 sm:h-5 text-white"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                               />
//                             </svg>
//                           </div>
//                           <div className="flex-1">
//                             <div className="text-white text-xs sm:text-sm font-medium">
//                               Real-time Security Monitoring
//                             </div>
//                             <div className="text-xs text-white/70">
//                               Remote wipe • App management • Policy enforcement
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>{' '}
//                   </div>
//                 ) : (
//                   <div className="space-y-3 sm:space-y-4 h-full flex flex-col animate-fadeIn">
//                     {/* Header */}
//                     <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
//                       <div className="flex items-center gap-2 sm:gap-3">
//                         <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center">
//                           <svg
//                             className="w-4 h-4 sm:w-6 sm:h-6 text-white"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
//                             />
//                           </svg>
//                         </div>
//                         <div>
//                           <div className="text-white font-semibold text-sm sm:text-base">
//                             Global Conference
//                           </div>
//                           <div className="text-xs text-white/60">4 participants • HD Quality</div>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-1.5 sm:gap-2">
//                         <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                         <span className="text-xs text-green-400">Live</span>
//                       </div>
//                     </div>

//                     {/* Video Grid */}
//                     <div className="grid grid-cols-2 gap-2 sm:gap-3 flex-1">
//                       {[
//                         { name: 'Sarah Chen', location: 'San Francisco', lang: '🇺🇸' },
//                         { name: 'Ahmed Al-Rashid', location: 'Dubai', lang: '🇦🇪' },
//                         { name: 'Yuki Tanaka', location: 'Tokyo', lang: '🇯🇵' },
//                         { name: 'Maria Garcia', location: 'Madrid', lang: '🇪🇸' },
//                       ].map((participant, index) => (
//                         <div
//                           key={index}
//                           className="relative rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1B365D]/50 to-[#0B1220]/50 border border-white/10 overflow-hidden group hover:border-[#0EA5E9]/50 transition-all"
//                         >
//                           <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
//                           <div className="relative p-2.5 sm:p-4 h-full flex flex-col justify-between">
//                             <div className="flex items-center justify-between">
//                               <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded bg-black/30 backdrop-blur-sm text-xs text-white">
//                                 {participant.lang}
//                               </div>
//                               <svg
//                                 className="w-3 h-3 sm:w-4 sm:h-4 text-green-400"
//                                 fill="currentColor"
//                                 viewBox="0 0 20 20"
//                               >
//                                 <path
//                                   fillRule="evenodd"
//                                   d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                   clipRule="evenodd"
//                                 />
//                               </svg>
//                             </div>
//                             <div>
//                               <div className="text-white text-xs sm:text-sm font-medium">
//                                 {participant.name}
//                               </div>
//                               <div className="text-xs text-white/60">{participant.location}</div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {/* Live Translation Banner */}
//                     <div className="relative rounded-lg sm:rounded-xl bg-gradient-to-r from-[#0EA5E9]/20 to-[#1B365D]/20 border border-[#0EA5E9]/30 p-3 sm:p-4 overflow-hidden">
//                       <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 to-transparent animate-pulse" />
//                       <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
//                         <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center flex-shrink-0">
//                           <svg
//                             className="w-3 h-3 sm:w-5 sm:h-5 text-white"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
//                             />
//                           </svg>
//                         </div>
//                         <div className="flex-1">
//                           <div className="text-white text-xs sm:text-sm font-medium">
//                             Real-time Translation Active
//                           </div>
//                           <div className="text-xs text-white/70">
//                             85+ languages • Instant translation
//                           </div>
//                         </div>
//                         <div className="flex gap-1">
//                           {[...Array(3)].map((_, i) => (
//                             <div
//                               key={i}
//                               className="w-1 h-3 sm:h-4 bg-[#0EA5E9] rounded-full animate-pulse"
//                               style={{ animationDelay: `${i * 0.2}s` }}
//                             />
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Floating badges – only visible on large screens */}
//               {isLargeScreen && (
//                 <>
//                   <div
//                     className="absolute -right-8 top-[18%] w-52 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9]/90 to-[#1B365D]/90 backdrop-blur-lg border border-white/20 shadow-2xl text-sm"
//                     style={{ transform: `translateZ(50px) translateX(${mousePos.x * 1.8}px)` }}
//                   >
//                     <div className="flex items-center gap-3">
//                       <svg
//                         className="w-5 h-5 text-white flex-shrink-0"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                         />
//                       </svg>
//                       <div>
//                         <div className="font-semibold text-white">End-to-End Encrypted</div>
//                         <div className="text-white/80 text-xs">Military Grade</div>
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     className="absolute -left-8 bottom-[18%] w-52 px-4 py-3 rounded-xl bg-gradient-to-r from-[#1B365D]/90 to-[#0EA5E9]/90 backdrop-blur-lg border border-white/20 shadow-2xl text-sm"
//                     style={{ transform: `translateZ(50px) translateX(${-mousePos.x * 1.8}px)` }}
//                   >
//                     <div className="flex items-center gap-3">
//                       <svg
//                         className="w-5 h-5 text-white flex-shrink-0"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M13 10V3L4 14h7v7l9-11h-7z"
//                         />
//                       </svg>
//                       <div>
//                         <div className="font-semibold text-white">Ultra-Low Latency</div>
//                         <div className="text-white/80 text-xs">Better than Zoom</div>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll hint */}
//       <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce pointer-events-none">
//         <span className="text-white/60 text-sm">Explore More</span>
//         <svg
//           className="w-6 h-6 text-white/60"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 14l-7 7m0 0l-7-7m7 7V3"
//           />
//         </svg>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(16px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.6s ease-out forwards;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState(0); // 0 = MDM, 1 = Video SDK
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ─── Mouse Tilt Control ────────────────────────────────────────
  useEffect(() => {
    const updateScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // lg breakpoint
    };

    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);

    const handleMouse = (e: MouseEvent) => {
      if (!isLargeScreen) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouse);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, [isLargeScreen]);

  // ─── Background Particles ──────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: isLargeScreen ? 60 : 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 0.5,
    }));

    let frameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(14, 165, 233, 0.35)';

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(14, 165, 233, 0.12)';
      ctx.lineWidth = 0.8;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          if (Math.hypot(dx, dy) < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      frameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, [isLargeScreen]);

  // Auto-rotate tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % 2);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tabs = [
    {
      icon: '📱',
      name: 'MDM Solution',
      subtitle: 'Complete device management',
      gradient: 'from-[#0EA5E9] to-[#1B365D]',
    },
    {
      icon: '🎥',
      name: 'Video SDK',
      subtitle: 'HD calls with live translation',
      gradient: 'from-[#1B365D] to-[#0EA5E9]',
    },
  ];

  return (
    <section
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative min-h-[85vh] md:min-h-screen pt-[72px] flex items-center bg-[#0B1220] overflow-hidden"
    >
      {/* Particles canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40 md:opacity-50 pointer-events-none"
      />

      {/* Decorative orbs */}
      <div className="absolute -top-24 -left-20 w-80 h-80 sm:w-96 sm:h-96 bg-[#0EA5E9]/15 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute -bottom-32 -right-20 w-80 h-80 sm:w-96 sm:h-96 bg-[#1B365D]/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1.3s' }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 py-10 sm:py-16 z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* ─── LEFT ─── Text + CTA ─────────────────────────────────── */}
          <div className={`w-full space-y-6 md:space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#0EA5E9]/10 border border-[#0EA5E9]/25 backdrop-blur-md">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0EA5E9] animate-pulse" />
              <span className="text-sm font-medium text-[#0EA5E9]">
                Next-Gen Enterprise Solutions
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-[#0EA5E9] via-[#1B365D] to-[#0EA5E9] bg-clip-text text-transparent">
                Unified Smart
              </span>
              <br />
              <span className="text-white">Solutions</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/85 leading-relaxed max-w-3xl">
              Enterprise-grade MDM and Video SDK with real-time translation. Superior performance,
              military-grade security, unmatched global reliability.
            </p>

            {/* Tab selector */}
            {/* <div className="flex flex-wrap gap-3 sm:gap-4">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 text-sm sm:text-base ${
                    activeTab === idx
                      ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl shadow-[#0EA5E9]/30 scale-[1.04]`
                      : 'bg-white/6 text-white/80 hover:bg-white/12 border border-white/10'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-2xl">{tab.icon}</span>
                    {tab.name}
                  </span>
                </button>
              ))}
            </div> */}

            {/* CTAs */}
            <div
              className={`flex flex-col sm:flex-row gap-4 pt-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
            >
              <Link
                href="/pricing-plans"
                className="group relative px-7 py-4 rounded-xl font-semibold text-base bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] text-white overflow-hidden shadow-lg shadow-[#0EA5E9]/25 hover:shadow-[#0EA5E9]/40 transition-all duration-300"
              >
                <span className="relative flex items-center justify-center gap-2.5">
                  Start Free Trial
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1.5 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </Link>

              <Link
                href="/pricing-plans"
                className="px-7 py-4 rounded-xl font-semibold border-2 border-white/20 text-white hover:bg-white/5 hover:border-[#0EA5E9]/50 transition-all duration-300 text-center"
              >
                View Demo
              </Link>
            </div>

            {/*
            <div className="grid grid-cols-3 gap-5 pt-8">
              {[
                { value: '99.99%', label: 'Uptime' },
                { value: '85+', label: 'Countries' },
                { value: '<50ms', label: 'Latency' },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#0EA5E9]">{item.value}</div>
                  <div className="text-sm text-white/70 mt-1.5">{item.label}</div>
                </div>
              ))}
            </div> */}
          </div>

          {/* ─── RIGHT ─── Visual Card ───────────────────────────────── */}
          <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mt-8 lg:mt-0">
            <div
              className="relative w-full aspect-auto lg:aspect-square mx-auto"
              style={{
                transform: isLargeScreen
                  ? `perspective(1100px) rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`
                  : 'none',
                transition: 'transform 0.18s ease-out',
              }}
            >
              <div className="relative lg:absolute lg:inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-[#1B365D]/65 to-[#0B1220]/75 backdrop-blur-xl border border-white/10 shadow-2xl p-4 sm:p-6 md:p-8">
                {' '}
                {activeTab === 0 ? (
                  <div className="h-full flex flex-col space-y-4 animate-fadeIn">
                    {/* MDM content placeholder – paste your original MDM block here */}
                    <div className="space-y-3 sm:space-y-4 h-full flex flex-col animate-fadeIn">
                      {/* Header */}

                      <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center">
                            <svg
                              className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-white font-semibold text-sm sm:text-base">
                              Device Management
                            </div>
                            <div className="text-xs text-white/60">1,247 devices monitored</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-green-400">Active</span>
                        </div>
                      </div>

                      {/* Device Grid */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                        {[
                          { type: 'iOS', count: '342', status: 'Secure', icon: '📱' },
                          { type: 'Android', count: '289', status: 'Secure', icon: '📱' },
                          { type: 'Windows', count: '156', status: 'Secure', icon: '💻' },
                          { type: 'macOS', count: '234', status: 'Secure', icon: '💻' },
                          { type: 'Linux', count: '89', status: 'Secure', icon: '🖥️' },
                          { type: 'Tablets', count: '137', status: 'Secure', icon: '📱' },
                        ].map((device, index) => (
                          <div
                            key={index}
                            className="relative rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1B365D]/40 to-[#0B1220]/40 border border-white/10 p-2.5 sm:p-4 group hover:border-[#0EA5E9]/50 transition-all"
                          >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg sm:rounded-xl" />
                            <div className="relative space-y-1.5 sm:space-y-2">
                              <div className="text-xl sm:text-2xl">{device.icon}</div>
                              <div>
                                <div className="text-white text-xs sm:text-sm font-medium">
                                  {device.type}
                                </div>
                                <div className="text-[#0EA5E9] text-lg sm:text-xl font-bold">
                                  {device.count}
                                </div>
                              </div>
                              <div className="flex items-center gap-1">
                                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500" />
                                <span className="text-xs text-green-400">{device.status}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* MDM Features Banner */}
                      <div className="flex-1" />
                      <div className="relative rounded-lg sm:rounded-xl bg-gradient-to-r from-[#0EA5E9]/20 to-[#1B365D]/20 border border-[#0EA5E9]/30 p-3 sm:p-4 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 to-transparent animate-pulse" />
                        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-3 h-3 sm:w-5 sm:h-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              />
                            </svg>
                          </div>
                          <div>
                            <div className="text-white text-xs sm:text-sm font-medium">
                              Real-time Security Monitoring
                            </div>
                            <div className="text-xs text-white/70">
                              Remote wipe • App management • Policy enforcement
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>{' '}
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4 h-full flex flex-col animate-fadeIn">
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-white/10">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center">
                          <svg
                            className="w-4 h-4 sm:w-6 sm:h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-white font-semibold text-sm sm:text-base">
                            Global Conference
                          </div>
                          <div className="text-xs text-white/60">4 participants • HD Quality</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-green-400">Live</span>
                      </div>
                    </div>

                    {/* Video Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                      {[
                        { name: 'Sarah Chen', location: 'San Francisco', lang: '🇺🇸' },
                        { name: 'Ahmed Al-Rashid', location: 'Dubai', lang: '🇦🇪' },
                        { name: 'Yuki Tanaka', location: 'Tokyo', lang: '🇯🇵' },
                        { name: 'Maria Garcia', location: 'Madrid', lang: '🇪🇸' },
                      ].map((participant, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg sm:rounded-xl bg-gradient-to-br from-[#1B365D]/50 to-[#0B1220]/50 border border-white/10 overflow-hidden group hover:border-[#0EA5E9]/50 transition-all"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-[#0EA5E9]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative p-2.5 sm:p-4 h-full flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                              <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 rounded bg-black/30 backdrop-blur-sm text-xs text-white">
                                {participant.lang}
                              </div>
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 text-green-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                            <div>
                              <div className="text-white text-xs sm:text-sm font-medium">
                                {participant.name}
                              </div>
                              <div className="text-xs text-white/60">{participant.location}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex-1" />

                    {/* Live Translation Banner */}
                    <div className="relative rounded-lg sm:rounded-xl bg-gradient-to-r from-[#0EA5E9]/20 to-[#1B365D]/20 border border-[#0EA5E9]/30 p-3 sm:p-4 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0EA5E9]/10 to-transparent animate-pulse" />
                      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#1B365D] flex items-center justify-center flex-shrink-0">
                          <svg
                            className="w-3 h-3 sm:w-5 sm:h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-white text-xs sm:text-sm font-medium">
                            Real-time Translation Active
                          </div>
                          <div className="text-xs text-white/70">
                            85+ languages • Instant translation
                          </div>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(3)].map((_, i) => (
                            <div
                              key={i}
                              className="w-1 h-3 sm:h-4 bg-[#0EA5E9] rounded-full animate-pulse"
                              style={{ animationDelay: `${i * 0.2}s` }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Floating badges – only visible on large screens */}
              {isLargeScreen && (
                <>
                  <div
                    className="absolute -right-8 top-[18%] w-52 px-4 py-3 rounded-xl bg-gradient-to-r from-[#0EA5E9]/90 to-[#1B365D]/90 backdrop-blur-lg border border-white/20 shadow-2xl text-sm"
                    style={{ transform: `translateZ(50px) translateX(${mousePos.x * 1.8}px)` }}
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-white flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      <div>
                        <div className="font-semibold text-white">End-to-End Encrypted</div>
                        <div className="text-white/80 text-xs">Military Grade</div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute -left-32 bottom-[-5%] w-52 px-4 py-3 rounded-xl bg-gradient-to-r from-[#1B365D]/90 to-[#0EA5E9]/90 backdrop-blur-lg border border-white/20 shadow-2xl text-sm"
                    style={{ transform: `translateZ(50px) translateX(${-mousePos.x * 1.8}px)` }}
                  >
                    <div className="flex items-center gap-3">
                      <svg
                        className="w-5 h-5 text-white flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      <div>
                        <div className="font-semibold text-white">Ultra-Low Latency</div>
                        <div className="text-white/80 text-xs">faster communication</div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
