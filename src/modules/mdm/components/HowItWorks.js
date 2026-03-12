// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Card, CardContent, Container } from '@mui/material';
// import YTXTypography from './YTXTypography';
// import styled from '@emotion/styled';
// const TaperBorder = () => (
//   <svg
//     width="100%"
//     height="100%"
//     viewBox="0 0 100 100"
//     preserveAspectRatio="none"
//     style={{ position: 'absolute', inset: 0, zIndex: 0 }}
//   >
//     <path
//       d="
//       M 0 0 
//       L 100 0 
//       M 100 0 
//       L 100 100 
//       M 100 100 
//       L 0 100 
//       M 0 100 
//       L 0 0
//     "
//       stroke="rgba(0,245,255,0.8)"
//       fill="none"
//       vectorEffect="non-scaling-stroke"
//       strokeWidth="6"
//       strokeLinecap="round"
//       pathLength="1"
//     >
//       <animate attributeName="stroke-width" values="6;1" dur="0.1s" repeatCount="1" />
//     </path>
//   </svg>
// );
// const GlowingCard = styled(Card)(({ theme }) => ({
//   background: 'rgba(255, 255, 255, 0.04)',
//   backdropFilter: 'blur(20px)',
//   border: '1px solid rgba(255, 255, 255, 0.08)',
//   borderRadius: '28px',
//   position: 'relative',
//   overflow: 'hidden',
//   cursor: 'default',
//   transition: 'transform 0.3s ease-out',
//   boxShadow: '0 8px 32px rgba(0, 0, 0, 0.37)',
// }));
// const InteractiveGlowCard = ({ children }) => {
//   const cardRef = useRef(null);
//   const glowRef = useRef(null);
//   const highlightRef = useRef(null);
//   const targetX = useRef(0);
//   const targetY = useRef(0);
//   const currentX = useRef(0);
//   const currentY = useRef(0);
//   const rafId = useRef(null);

//   const lerp = (start, end, factor) => start + (end - start) * factor;

//   const animate = () => {
//     const glow = glowRef.current;
//     const highlight = highlightRef.current;
//     if (!glow || !highlight) return;

//     currentX.current = lerp(currentX.current, targetX.current, 0.08);
//     currentY.current = lerp(currentY.current, targetY.current, 0.08);

//     glow.style.left = `${currentX.current}px`;
//     glow.style.top = `${currentY.current}px`;
//     highlight.style.left = `${currentX.current}px`;
//     highlight.style.top = `${currentY.current}px`;

//     rafId.current = requestAnimationFrame(animate);
//   };

//   const handleMove = (e) => {
//     const card = cardRef.current;
//     if (!card) return;

//     const rect = card.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     targetX.current = x;
//     targetY.current = y;

//     const percentX = (x / rect.width - 0.5) * 2;
//     const percentY = (y / rect.height - 0.5) * 2;

//     card.style.transform = `rotateX(${percentY * 4}deg) rotateY(${percentX * -4}deg)`;
//   };

//   const handleEnter = () => {
//     glowRef.current.style.opacity = 1;
//     highlightRef.current.style.opacity = 0.35;

//     if (!rafId.current) rafId.current = requestAnimationFrame(animate);
//   };

//   const handleLeave = () => {
//     glowRef.current.style.opacity = 0;
//     highlightRef.current.style.opacity = 0;
//     cardRef.current.style.transform = 'rotateX(0deg) rotateY(0deg)';

//     if (rafId.current) {
//       cancelAnimationFrame(rafId.current);
//       rafId.current = null;
//     }
//   };

//   return (
//     <>
//       <style jsx global>{`
//         @keyframes neonFlow {
//           0% {
//             transform: translate(-50%, -50%) scale(1);
//             filter: blur(50px);
//             background-position: 0% 50%;
//           }
//           50% {
//             transform: translate(-50%, -50%) scale(1.15);
//             filter: blur(65px);
//             background-position: 100% 50%;
//           }
//           100% {
//             transform: translate(-50%, -50%) scale(1);
//             filter: blur(50px);
//             background-position: 0% 50%;
//           }
//         }
//       `}</style>

//       <GlowingCard
//         ref={cardRef}
//         onMouseMove={handleMove}
//         onMouseEnter={handleEnter}
//         onMouseLeave={handleLeave}
//         elevation={0}
//         sx={{
//           p: 0,
//           overflow: 'visible',
//         }}
//       >
//         {/* LIQUID GLOW */}
//         <Box
//           ref={glowRef}
//           sx={{
//             position: 'absolute',
//             width: 220,
//             height: 220,
//             borderRadius: '50%',
//             pointerEvents: 'none',
//             opacity: 0,
//             transition: 'opacity 0.6s ease-out',
//             background:
//               'radial-gradient(circle at center, rgba(0,255,255,0.45), rgba(0,153,255,0.25), rgba(255,0,255,0.15), transparent 65%)',
//             backgroundSize: '280% 280%',
//             animation: 'neonFlow 8s ease-in-out infinite',
//             zIndex: 0,
//             transform: 'translate(-50%, -50%)',
//             filter: 'blur(55px)',
//           }}
//         />

//         {/* ACRYLIC HIGHLIGHT */}
//         <Box
//           ref={highlightRef}
//           sx={{
//             position: 'absolute',
//             width: 180,
//             height: 180,
//             borderRadius: '50%',
//             pointerEvents: 'none',
//             opacity: 0,
//             transition: 'opacity 0.5s ease-out',
//             background:
//               'radial-gradient(circle at center, rgba(255,255,255,0.18), rgba(255,255,255,0.06), transparent 65%)',
//             filter: 'blur(35px)',
//             zIndex: 1,
//             transform: 'translate(-50%, -50%)',
//           }}
//         />

//         <CardContent
//           sx={{
//             p: 0,
//             width: '100%',
//             height: '100%',
//             display: 'flex',
//           }}
//         >
//           {children}
//         </CardContent>
//       </GlowingCard>
//     </>
//   );
// };
// const HowItWorks = () => {
//   const sectionRef = useRef(null);
//   const [isMobile, setIsMobile] = useState(false);

//   // Detect mobile viewport
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   const steps = [
//     {
//       number: '1',
//       title: 'Enroll Your Devicesss',
//       description:
//         "Add any Android device to Yantrix in minutes. Scan a QR code, enter a token, or use zero-touch enrollment to instantly bring devices under your company's control.",
//       svgPath: 'SVG/Homepage/qrcode.svg',
//     },
//     {
//       number: '2',
//       title: 'Configure & Setup',
//       description:
//         'Apply policies, apps, and restrictions with a single click. Choose what users can access, set up Wi-Fi, VPN, wallpapers, permissions, and push everything instantly to all devices.',
//       svgPath: 'SVG/Homepage/policies.svg',
//     },
//     {
//       number: '3',
//       title: 'Manage From One Dashboard',
//       description:
//         'Monitor, update, and control every device in real time. Track location, view device health, push updates, lock devices, or wipe data — all from a single unified console.',
//       svgPath: 'SVG/Homepage/centralcontrol.svg',
//     },
//     {
//       number: '4',
//       title: 'Secure Your Entire Fleetss',
//       description:
//         'Protect your data with powerful security. Set compliance rules, block unauthorized apps, enforce passwords, lock down lost devices, and keep sensitive information safe.',
//       svgPath: 'SVG/Homepage/protection.svg',
//     },
//     {
//       number: '5',
//       title: 'Automate Everything',
//       description:
//         'Create workflows that run automatically. Auto-install apps, auto-lock devices, schedule updates, and reduce manual work across thousands of devices.',
//       svgPath: 'SVG/Homepage/automation.svg',
//     },
//     {
//       number: '6',
//       title: 'Take Action Anytime, Anywhere',
//       description:
//         'Use remote controls like screen view, file transfer, and remote commands. Troubleshoot issues instantly — no need to physically touch the device.',
//       svgPath: 'SVG/Homepage/remotetroubleshooting.svg',
//     },
//     {
//       number: '7',
//       title: 'Scale Effortlessly',
//       description:
//         'Whether you manage 10 devices or 10,00, Yantrix handles everything smoothly. Add new teams, create groups, assign roles, and grow without limits.',
//       svgPath: 'SVG/Homepage/scale.svg',
//     },
//   ];

//   useEffect(() => {
//     const scrollContainer = sectionRef.current?.querySelector('[data-timeline-scroll]');
//     const verticalLine = sectionRef.current?.querySelector('[data-vertical-line]');
//     if (!scrollContainer) return;

//     const handleScroll = () => {
//       const items = scrollContainer.querySelectorAll('.step-item');
//       const ctaBox = scrollContainer.querySelector('[data-cta-box]');
//       const containerRect = scrollContainer.getBoundingClientRect();
//       const viewportCenter = containerRect.top + containerRect.height / 2;

//       // Handle CTA box visibility and line fade
//       if (ctaBox && verticalLine) {
//         const ctaRect = ctaBox.getBoundingClientRect();
//         const ctaTop = ctaRect.top;
//         const fadeStart = containerRect.bottom - 200; // Start fading 200px before CTA enters

//         if (ctaTop < fadeStart) {
//           const fadeProgress = Math.max(0, Math.min(1, (fadeStart - ctaTop) / 200));
//           verticalLine.style.opacity = 1 - fadeProgress;
//         } else {
//           verticalLine.style.opacity = 1;
//         }
//       }

//       // Existing step items animation
//       items.forEach((item) => {
//         const itemRect = item.getBoundingClientRect();
//         const itemCenter = itemRect.top + itemRect.height / 2;
//         const distance = Math.abs(viewportCenter - itemCenter);
//         const maxDistance = containerRect.height / 2;

//         const visibility = Math.max(0, 1 - distance / maxDistance);

//         if (visibility > 0.3) {
//           item.classList.add('visible');
//           item.style.transform = `translateY(0) scale(${0.95 + visibility * 0.05})`;
//           item.style.opacity = visibility;
//         } else {
//           item.classList.remove('visible');
//           item.style.transform = 'translateY(40px) scale(0.95)';
//           item.style.opacity = '0';
//         }
//       });
//     };

//     scrollContainer.addEventListener('scroll', handleScroll);
//     handleScroll();

//     return () => scrollContainer.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <Box
//       ref={sectionRef}
//       sx={{
//         minHeight: '100vh',
//         height: '100vh',
//         scrollSnapAlign: 'start',
//         position: 'relative',
//         overflow: 'hidden',
//         background: 'rgba(0, 0, 0, 0.3)',
//         display: 'flex',
//         flexDirection: 'column',
//         paddingTop: isMobile ? '2px' : '100px',
//       }}
//     >
//       {/* FIXED TITLE - Stays visible */}
//       <Box
//         sx={{
//           textAlign: 'center',
//           padding: { xs: '120px 24px 0', md: '30px 24px 0' },
//           flexShrink: 0,
//           position: 'relative',
//           zIndex: 10,
//         }}
//       >
//         <YTXTypography
//           className="fade-in"
//           style={{
//             fontSize: '3.2rem',
//             fontWeight: 900,
//             color: '#fff',
//             marginBottom: '16px',
//             display: 'block',
//           }}
//         >
//           How It Works
//         </YTXTypography>
//       </Box>

//       {/* SCROLLABLE TIMELINE VIEWPORT - Contains subtitle inside */}
//       <Box
//         data-timeline-scroll
//         sx={{
//           flex: 1,
//           overflowY: 'auto',
//           overflowX: 'hidden',
//           position: 'relative',
//           padding: { xs: '0 24px 60px', md: '0 24px 80px' },
//           maskImage:
//             'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
//           WebkitMaskImage:
//             'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
//         }}
//       >
//         {/* Subtitle at top of scrollable area */}
//         <Box
//           sx={{
//             textAlign: 'center',
//             pt: { xs: 2, md: 3 },
//             pb: { xs: 3, md: 4 },
//           }}
//         >
//           <YTXTypography
//             className="fade-in"
//             style={{
//               fontSize: 'clamp(1rem, 2vw, 1.25rem)',
//               color: 'rgba(255, 255, 255, 0.65)',
//               maxWidth: '700px',
//               margin: '0 auto',
//               lineHeight: 1.7,
//               display: 'block',
//             }}
//           >
//             From enrollment to automation — follow these simple steps to transform your device
//             management
//           </YTXTypography>
//         </Box>

//         <Container maxWidth="lg" sx={{ height: '100%' }}>
//           {/* Timeline Container */}
//           <Box
//             sx={{
//               position: 'relative',
//               maxWidth: '1100px',
//               margin: '0 auto',
//               paddingTop: '40px',
//               paddingBottom: '350px',
//             }}
//           >
//             {/* ... rest of timeline code */}
//             {/* Vertical Line */}
//             {/* Vertical Line with Endpoint */}
//             <Box
//               data-vertical-line
//               sx={{
//                 position: 'absolute',
//                 left: { xs: '24px', md: '50%' },
//                 top: '60px',
//                 bottom: '520px', // Stop before CTA box
//                 width: '2px',
//                 background:
//                   'linear-gradient(180deg, transparent 0%, rgba(0, 245, 255, 0.2) 5%, rgba(0, 245, 255, 0.6) 20%, rgba(0, 245, 255, 0.6) 90%, rgba(0, 245, 255, 0.8) 100%)',
//                 transform: { xs: 'none', md: 'translateX(-50%)' },
//                 zIndex: 0,
//               }}
//             />

//             {/* Endpoint Dot */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 left: { xs: '15px', md: '49%' },
//                 bottom: '500px', // 10px above line end
//                 transform: { xs: 'none', md: 'translateX(-50%)' },
//                 width: '24px',
//                 height: '24px',
//                 borderRadius: '50%',
//                 background:
//                   'radial-gradient(circle, rgba(0, 245, 255, 0.9) 0%, rgba(0, 245, 255, 0.4) 70%)',
//                 border: '3px solid rgba(0, 245, 255, 1)',
//                 boxShadow: '0 0 30px rgba(0, 245, 255, 0.8), 0 0 60px rgba(0, 245, 255, 0.4)',
//                 zIndex: 2,
//                 animation: 'endpointPulse 2s ease-in-out infinite',
//               }}
//             />

//             <style jsx>{`
//               @keyframes endpointPulse {
//                 0%,
//                 100% {
//                   transform: scale(1);
//                   box-shadow:
//                     0 0 30px rgba(0, 245, 255, 0.8),
//                     0 0 60px rgba(0, 245, 255, 0.4);
//                 }
//                 50% {
//                   transform: scale(1.15);
//                   box-shadow:
//                     0 0 40px rgba(0, 245, 255, 1),
//                     0 0 80px rgba(0, 245, 255, 0.6);
//                 }
//               }
//             `}</style>

//             {/* Steps */}
//             {steps.map((step, index) => (
//               <Box
//                 key={index}
//                 className="step-item"
//                 sx={{
//                   opacity: 0,
//                   transform: 'translateY(40px)',
//                   transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//                   '&.visible': {
//                     opacity: 1,
//                     transform: 'translateY(0)',
//                   },
//                   display: 'flex',
//                   flexDirection: {
//                     xs: 'row',
//                     md: index % 2 === 0 ? 'row' : 'row-reverse',
//                   },
//                   gap: { xs: '20px', md: '0' },
//                   marginBottom: { xs: '50px', md: '70px' },
//                   alignItems: 'center',
//                   position: 'relative',
//                   justifyContent: { xs: 'flex-start', md: 'space-between' },
//                 }}
//               >
//                 {/* Glowing Dot on Line */}
//                 {!isMobile && (
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       left: { xs: '15px', md: '50%' },
//                       transform: { xs: 'none', md: 'translateX(-50%)' },
//                       top: { xs: '50%', md: '50%' },
//                       marginTop: { xs: '-10px', md: '-10px' },
//                       width: '20px',
//                       height: '20px',
//                       borderRadius: '50%',
//                       background: 'rgba(0, 245, 255, 0.3)',
//                       border: '3px solid rgba(0, 245, 255, 0.6)',
//                       boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)',
//                       transition: 'all 0.6s ease',
//                       zIndex: 2,
//                       '.step-item.visible &': {
//                         background: 'rgba(0, 245, 255, 0.8)',
//                         borderColor: 'rgba(0, 245, 255, 1)',
//                         boxShadow: '0 0 30px rgba(0, 245, 255, 0.8)',
//                       },
//                     }}
//                   />
//                 )}
//                 {/* SVG Image Container */}
//                 {/* 🔥 EXACT OLD STRUCTURE */}
//                 <Box
//                   sx={{
//                     flex: { xs: '0 0 120px', md: '0 0 300px' },
//                     width: { xs: '120px', md: '300px' },
//                     height: { xs: '120px', md: '300px' },
//                     marginLeft: {
//                       xs: '50px',
//                       md: index % 2 === 0 ? '0' : '80px',
//                     },
//                     marginRight: {
//                       xs: '0',
//                       md: index % 2 === 0 ? '80px' : '0',
//                     },
//                     position: 'relative',
//                     zIndex: 1,
//                   }}
//                 >
//                   {/* 🔥 GLOW CARD TAKES FULL SIZE, NO EXTRA */}
//                   {/* PERFECT SQUARE CARD – SVG OBEYS THE CONTAINER */}
//                   <InteractiveGlowCard sx={{ width: '100%', height: '100%' }}>
//                     <Box
//                       sx={{
//                         width: '100%',
//                         height: '100%',
//                         display: 'flex',
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         padding: { xs: '32px', md: '48px' },
//                         position: 'relative',
//                         borderRadius: '24px',
//                         background: 'rgba(255, 255, 255, 0.02)',
//                         overflow: 'hidden',
//                       }}
//                     >
//                       {/* Top shine */}
//                       <Box
//                         sx={{
//                           position: 'absolute',
//                           top: 0,
//                           left: 0,
//                           right: 0,
//                           height: '2px',
//                           background: 'linear-gradient(90deg, transparent, #00f5ff, transparent)',
//                           opacity: 0.6,
//                         }}
//                       />

//                       {/* THE SVG THAT CANNOT ESCAPE */}
//                       <svg
//                         width="100%"
//                         height="100%"
//                         viewBox="0 0 1000 1000"
//                         preserveAspectRatio="xMidYMid meet"
//                         xmlns="http://www.w3.org/2000/svg"
//                         style={{ maxWidth: '100%', maxHeight: '100%' }}
//                       >
//                         <image
//                           href={step.svgPath}
//                           width="100%"
//                           height="100%"
//                           preserveAspectRatio="xMidYMid meet"
//                           filter="drop-shadow(0 6px 20px rgba(0, 245, 255, 0.4))"
//                         />
//                       </svg>
//                     </Box>
//                   </InteractiveGlowCard>
//                   {/* 🔥 BADGE OUTSIDE GLOW – RELATIVE TO OUTER BOX (LIKE OLD CODE!!) */}
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: '-20px',
//                       right: '-20px',
//                       width: { xs: '52px', md: '72px' },
//                       height: { xs: '52px', md: '72px' },
//                       borderRadius: '50%',
//                       background:
//                         'linear-gradient(135deg, rgba(0, 245, 255, 1), rgba(0, 200, 255, 0.9))',
//                       border: '5px solid rgba(0,0,0,0.6)',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       boxShadow:
//                         '0 12px 35px rgba(0, 245, 255, 0.6), inset 0 2px 10px rgba(255,255,255,0.3)',
//                       zIndex: 20,
//                       transition: 'all 0.4s ease',
//                       '.step-item.visible &': {
//                         transform: 'rotate(360deg) scale(1.1)',
//                         boxShadow:
//                           '0 15px 45px rgba(0, 245, 255, 0.8), inset 0 2px 10px rgba(255,255,255,0.5)',
//                       },
//                     }}
//                   >
//                     <YTXTypography
//                       sx={{
//                         fontSize: { xs: '1.5rem', md: '2rem' },
//                         fontWeight: 900,
//                         color: '#000',
//                         textShadow: '0 2px 4px rgba(255,255,255,0.3)',
//                       }}
//                     >
//                       {step.number}
//                     </YTXTypography>
//                   </Box>
//                 </Box>{' '}
//                 {/* Content */}
//                 <Box
//                   sx={{
//                     flex: 1,
//                     maxWidth: { xs: '100%', md: '480px' },
//                     textAlign: {
//                       xs: 'left',
//                       md: index % 2 === 0 ? 'left' : 'right',
//                     },
//                     paddingLeft: { xs: '0', md: index % 2 === 0 ? '0' : '0' },
//                     paddingRight: { xs: '0', md: index % 2 === 0 ? '0' : '0' },
//                   }}
//                 >
//                   <YTXTypography
//                     sx={{
//                       fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
//                       fontWeight: 700,
//                       color: '#fff',
//                       marginBottom: '12px',
//                       lineHeight: 1.3,
//                       transition: 'all 0.4s ease',
//                       '.step-item.visible &': {
//                         color: 'rgba(0, 245, 255, 0.95)',
//                       },
//                     }}
//                   >
//                     {step.title}
//                   </YTXTypography>

//                   <YTXTypography
//                     sx={{
//                       fontSize: { xs: '0.95rem', md: '1.05rem' },
//                       color: 'rgba(255, 255, 255, 0.7)',
//                       lineHeight: 1.7,
//                     }}
//                   >
//                     {step.description}
//                   </YTXTypography>

//                   {/* Decorative line */}
//                   {
//                     <Box
//                       sx={{
//                         marginTop: '16px',
//                         width: '80px',
//                         height: '3px',
//                         background:
//                           'linear-gradient(90deg, rgba(0, 245, 255, 0.6) 0%, transparent 100%)',
//                         borderRadius: '2px',
//                         transition: 'all 0.6s ease',
//                         marginLeft: {
//                           xs: '0',
//                           md: index % 2 === 0 ? '0' : 'auto',
//                         },
//                         marginRight: {
//                           xs: '0',
//                           md: index % 2 === 0 ? 'auto' : '0',
//                         },
//                         '.step-item.visible &': {
//                           width: '120px',
//                         },
//                       }}
//                     />
//                   }
//                 </Box>
//               </Box>
//             ))}

//             {/* Bottom CTA Section */}
//             {/* Mobile: Special Layout Container */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: { xs: 'row', md: 'column' },
//                 alignItems: { xs: 'flex-start', md: 'center' },
//                 gap: { xs: '20px', md: '0' },
//                 marginTop: { xs: '80px', md: '120px' },
//                 position: 'relative',
//               }}
//             >
//               {/* Mobile: Special Point on Line */}
//               <Box
//                 sx={{
//                   display: { xs: 'block', md: 'none' },
//                   position: 'relative',
//                   flexShrink: 0,
//                   width: '24px',
//                   height: '24px',
//                   marginLeft: '12px',
//                   marginTop: '40px',
//                 }}
//               >
//                 {/* Diamond shape instead of circle */}
//                 <Box
//                   sx={{
//                     position: 'absolute',
//                     width: '24px',
//                     height: '24px',
//                     background: 'rgba(0, 245, 255, 0.9)',
//                     border: '3px solid rgba(0, 245, 255, 1)',
//                     boxShadow: '0 0 30px rgba(0, 245, 255, 0.8)',
//                     transform: 'rotate(45deg)',
//                     animation: 'diamondPulse 2s ease-in-out infinite',
//                   }}
//                 />
//               </Box>

//               {/* Original CTA Box */}
//               <Box
//                 data-cta-box
//                 sx={{
//                   flex: { xs: 1, md: 'initial' },
//                   padding: { xs: '40px 24px', md: '56px 48px' },
//                   borderRadius: '24px',
//                   background: 'rgba(255, 255, 255, 0.03)',
//                   border: '1px solid rgba(0, 245, 255, 0.2)',
//                   backdropFilter: 'blur(10px)',
//                   textAlign: 'center',
//                   position: 'relative',
//                   overflow: 'hidden',
//                   '&::before': {
//                     content: '""',
//                     position: 'absolute',
//                     top: '50%',
//                     left: '50%',
//                     transform: 'translate(-50%, -50%)',
//                     width: '500px',
//                     height: '500px',
//                     borderRadius: '50%',
//                     background:
//                       'radial-gradient(circle, rgba(0, 245, 255, 0.1) 0%, transparent 70%)',
//                     opacity: 0.5,
//                   },
//                 }}
//               >
//                 <YTXTypography
//                   sx={{
//                     color: 'rgba(255,255,255,0.95)',
//                     fontSize: { xs: '1.1rem', md: '1.4rem' },
//                     lineHeight: 1.7,
//                     maxWidth: '800px',
//                     margin: '0 auto',
//                     position: 'relative',
//                     zIndex: 1,
//                     fontWeight: 500,
//                   }}
//                 >
//                   Ready to streamline your device management?{' '}
//                   <Box
//                     component="span"
//                     sx={{
//                       color: 'rgba(0, 245, 255, 0.95)',
//                       fontWeight: 700,
//                     }}
//                   >
//                     Start with Yantrix today.
//                   </Box>
//                 </YTXTypography>
//               </Box>
//             </Box>

//             <style jsx>{`
//               @keyframes diamondPulse {
//                 0%,
//                 100% {
//                   transform: rotate(45deg) scale(1);
//                   box-shadow: 0 0 30px rgba(0, 245, 255, 0.8);
//                 }
//                 50% {
//                   transform: rotate(45deg) scale(1.2);
//                   box-shadow: 0 0 50px rgba(0, 245, 255, 1);
//                 }
//               }
//             `}</style>
//           </Box>
//         </Container>

//         <style>
//           {`
//           @keyframes fadeInUp {
//             from {
//               opacity: 0;
//               transform: translateY(30px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//         `}
//         </style>
//       </Box>
//       <style>
//         {`
//     @keyframes fadeInUp {
//       from {
//         opacity: 0;
//         transform: translateY(30px);
//       }
//       to {
//         opacity: 1;
//         transform: translateY(0);
//       }
//     }
    
//     /* Smooth scroll behavior */
//     [data-timeline-scroll] {
//       scroll-behavior: smooth;
//     }
    
//     /* Progressive reveal effect */
//     .step-item {
//       will-change: transform, opacity;
//     }
    
//     .step-item.visible {
//       opacity: 1 !important;
//       transform: translateY(0) scale(1) !important;
//     }
//   `}
//       </style>
//     </Box>
//   );
// };

// export default HowItWorks;

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Card, CardContent, Container } from '@mui/material';
import YTXTypography from './YTXTypography';
import styled from '@emotion/styled';

/* ===================== GLOW CARD ===================== */

const GlowingCard = styled(Card)(() => ({
  background: 'rgba(255,255,255,0.04)',
  backdropFilter: 'blur(20px)',
  borderRadius: '28px',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
}));

const InteractiveGlowCard = ({ children }) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const raf = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = () => {
    const glow = glowRef.current;
    if (!glow) return;

    current.current.x = lerp(current.current.x, target.current.x, 0.08);
    current.current.y = lerp(current.current.y, target.current.y, 0.08);

    glow.style.left = `${current.current.x}px`;
    glow.style.top = `${current.current.y}px`;

    raf.current = requestAnimationFrame(animate);
  };

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    target.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleEnter = () => {
    glowRef.current.style.opacity = 1;
    raf.current = requestAnimationFrame(animate);
  };

  const handleLeave = () => {
    glowRef.current.style.opacity = 0;
    cancelAnimationFrame(raf.current);
  };

  return (
    <GlowingCard
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      elevation={0}
    >
      <Box
        ref={glowRef}
        sx={{
          position: 'absolute',
          width: 220,
          height: 220,
          borderRadius: '50%',
          pointerEvents: 'none',
          opacity: 0,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(0,255,255,.45), transparent 70%)',
          filter: 'blur(55px)',
          transition: 'opacity .5s',
          zIndex: 0,
        }}
      />
      <CardContent
        sx={{
          p: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
        }}
      >
        {children}
      </CardContent>
    </GlowingCard>
  );
};


const HowItWorks = () => {
  const sectionRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const resize = () => setIsMobile(window.innerWidth < 768);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  /* ✅ FIXED PATHS (NO public/) */
  const steps = [
    {
      number: '1',
      title: 'Enroll Your Devices',
      description: 'Add any Android device in minutes using QR, token or zero-touch enrollment.',
      svgPath: '/SVG/Homepage/qrcode.svg',
    },
    {
      number: '2',
      title: 'Configure & Setup',
      description: 'Apply apps, policies, Wi-Fi, VPN and restrictions instantly.',
      svgPath: '/SVG/Homepage/policies.svg',
    },
    {
      number: '3',
      title: 'Manage From One Dashboard',
      description: 'Monitor, update, lock or wipe devices from one console.',
      svgPath: '/SVG/Homepage/centralcontrol.svg',
    },
    {
      number: '4',
      title: 'Secure Your Entire Fleet',
      description: 'Enforce compliance, block apps and protect company data.',
      svgPath: '/SVG/Homepage/protection.svg',
    },
    {
      number: '5',
      title: 'Automate Everything',
      description: 'Create workflows to auto-install apps and schedule updates.',
      svgPath: '/SVG/Homepage/automation.svg',
    },
    {
      number: '6',
      title: 'Take Action Anywhere',
      description: 'Remote screen, file transfer and instant troubleshooting.',
      svgPath: '/SVG/Homepage/remotetroubleshooting.svg',
    },
    {
      number: '7',
      title: 'Scale Effortlessly',
      description: 'Manage 10 or 10,000 devices without performance drops.',
      svgPath: '/SVG/Homepage/scale.svg',
    },
  ];

  return (
    <Box
      ref={sectionRef}
      sx={{
        minHeight: '100vh',
        background: 'rgba(0,0,0,.35)',
        paddingTop: { xs: '80px', md: '120px' },
      }}
    >
      <YTXTypography
        sx={{
          textAlign: 'center',
          fontSize: '3rem',
          fontWeight: 900,
          color: '#fff',
          mb: 6,
        }}
      >
        How It Works
      </YTXTypography>

      <Container maxWidth="lg">
        {steps.map((step, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: index % 2 === 0 ? 'row' : 'row-reverse',
              },
              alignItems: 'center',
              gap: { xs: 4, md: 8 },
              mb: 10,
            }}
          >
            {/* IMAGE CARD */}
            <Box
              sx={{
                width: { xs: 160, md: 300 },
                flexShrink: 0,
              }}
            >
              <InteractiveGlowCard>
                <Box
                  sx={{
                    width: '100%',
                    aspectRatio: '1 / 1', // 🔥 RESPONSIVE FIX
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                  }}
                >
                  {/* ✅ IMG (more stable than svg image) */}
                  <img
                    src={step.svgPath}
                    alt={step.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 6px 20px rgba(0,245,255,.4))',
                    }}
                  />
                </Box>
              </InteractiveGlowCard>
            </Box>

            {/* CONTENT */}
            <Box
              sx={{
                maxWidth: 500,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              <YTXTypography
                sx={{
                  fontSize: '1.8rem',
                  fontWeight: 700,
                  color: '#00f5ff',
                  mb: 1,
                }}
              >
                {step.number}. {step.title}
              </YTXTypography>

              <YTXTypography
                sx={{
                  color: 'rgba(255,255,255,.75)',
                  lineHeight: 1.7,
                }}
              >
                {step.description}
              </YTXTypography>
            </Box>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default HowItWorks;
