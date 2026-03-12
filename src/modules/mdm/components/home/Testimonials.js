// /* eslint-disable react-hooks/refs */
// "use client";

// import React, { useState, useRef, useEffect, useCallback } from "react";
// import {
//   Box,
//   Avatar,
//   Container,
//   Stack,
//   Rating,
//   Chip,
//   IconButton,
// } from "@mui/material";
// import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import YTXTypography from "./YTXTypography";

// const testimonialsData = [
//   {
//     id: 1,
//     quote:
//       "The predictive analysis features are borderline magic. I've never seen a platform handle data complexity with such elegance.",
//     name: "James Land",
//     title: "Senior Architect",
//     company: "Oracle",
//     img: "https://i.pravatar.cc/150?u=1",
//   },
//   {
//     id: 2,
//     quote:
//       "Working with this team transformed our product. The 'Esper' engine predicted user drop-off points before we even launched.",
//     name: "Sarah Connor",
//     title: "CTO",
//     company: "Cyberdyne",
//     img: "https://i.pravatar.cc/150?u=2",
//   },
//   {
//     id: 3,
//     quote:
//       "It’s rare to find a design that feels this futuristic yet remains so intuitive. The micro-interactions are pure gold.",
//     name: "Alex Johnson",
//     title: "Product Lead",
//     company: "Linear",
//     img: "https://i.pravatar.cc/150?u=3",
//   },
//   {
//     id: 4,
//     quote:
//       "A masterpiece of engineering. The fluidity of the interface matches the speed of the backend perfectly.",
//     name: "Marcus Aurelius",
//     title: "Design Director",
//     company: "Rome Inc.",
//     img: "https://i.pravatar.cc/150?u=4",
//   },
//   {
//     id: 5,
//     quote:
//       "I was skeptical about the AI claims, but the results speak for themselves. ROI increased by 40% in week one.",
//     name: "Elara Vance",
//     title: "VP of Growth",
//     company: "Nebula",
//     img: "https://i.pravatar.cc/150?u=5",
//   },
// ];

// const AUTO_DELAY = 4000;

// const Testimonials = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [translationX, setTranslationX] = useState(0);

//   const dragDistance = useRef(0);
//   const isDragging = useRef(false);
//   const startX = useRef(0);
//   const startY = useRef(0);
//   const startTranslateX = useRef(0);

//   const carouselRef = useRef(null);
//   const innerRef = useRef(null);
//   const autoPlayRef = useRef(null);

//   // --- DIMENSIONS ---
//   const getDimensions = useCallback(() => {
//     if (!innerRef.current) return { itemWidth: 0 };

//     const item = innerRef.current.children[0];
//     if (!item) return { itemWidth: 0 };

//     const style = window.getComputedStyle(item);
//     const margin = parseFloat(style.marginRight) || 0;
//     const itemWidth = item.offsetWidth + margin;

//     return { itemWidth };
//   }, []);

//   // --- GO TO SLIDE ---
//   const goToSlide = useCallback(
//     (index) => {
//       const { itemWidth } = getDimensions();
//       if (itemWidth === 0) return;

//       const clampedIndex = Math.max(
//         0,
//         Math.min(index, testimonialsData.length - 1)
//       );

//       const newTranslate = -(clampedIndex * itemWidth);

//       setTranslationX(newTranslate);
//       setActiveIndex(clampedIndex);

//       setIsPaused(true);
//       setTimeout(() => setIsPaused(false), AUTO_DELAY + 500);
//     },
//     [getDimensions]
//   );

//   // --- AUTO PLAY ---
//   useEffect(() => {
//     if (autoPlayRef.current) clearTimeout(autoPlayRef.current);

//     if (!isPaused && !isDragging.current) {
//       autoPlayRef.current = setTimeout(() => {
//         const next =
//           activeIndex === testimonialsData.length - 1 ? 0 : activeIndex + 1;
//         goToSlide(next);
//       }, AUTO_DELAY);
//     }

//     return () => clearTimeout(autoPlayRef.current);
//   }, [activeIndex, isPaused, goToSlide]);

//   // --- HANDLE RESIZE ---
//   useEffect(() => {
//     const handleResize = () => goToSlide(activeIndex);
//     window.addEventListener("resize", handleResize);

//     goToSlide(activeIndex);

//     return () => window.removeEventListener("resize", handleResize);
//   }, [activeIndex, goToSlide]);

//   // --- POINTER DOWN ---
//   const handlePointerDown = (e) => {
//     if (e.pointerType === "mouse" && e.button !== 0) return;

//     e.preventDefault();
//     carouselRef.current?.setPointerCapture?.(e.pointerId);

//     isDragging.current = true;
//     dragDistance.current = 0;

//     setIsPaused(true);
//     startX.current = e.clientX;
//     startY.current = e.clientY;
//     startTranslateX.current = translationX;

//     if (carouselRef.current) carouselRef.current.style.cursor = "grabbing";
//   };

//   // --- POINTER MOVE ---
//   const handlePointerMove = (e) => {
//     if (!isDragging.current) return;

//     const deltaX = e.clientX - startX.current;
//     const deltaY = e.clientY - startY.current;

//     dragDistance.current = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

//     // Only drag on desktop
//     if (window.innerWidth > 1024) {
//       if (Math.abs(deltaX) > Math.abs(deltaY) + 4) {
//         e.preventDefault();
//       }
//       setTranslationX(startTranslateX.current + deltaX);
//     }
//   };

//   const handlePointerUp = (e) => {
//     if (!isDragging.current) return;

//     carouselRef.current?.releasePointerCapture?.(e.pointerId);
//     if (carouselRef.current) carouselRef.current.style.cursor = "grab";

//     const dragged = dragDistance.current >= 6;
//     isDragging.current = false;
//     setIsPaused(false);

//     const { itemWidth } = getDimensions();
//     if (itemWidth === 0) return;

//     // --- DRAG BEHAVIOR ---
//     if (dragged && window.innerWidth > 1024) {
//       const movedIndex = Math.round(Math.abs(translationX) / itemWidth);
//       goToSlide(movedIndex);
//       return;
//     }

//     // --- CLICK BEHAVIOR ---
//     console.log("click happened");

//     const rect = carouselRef.current.getBoundingClientRect();
//     const clickX = e.clientX;

//     const isLeft = clickX < rect.left + rect.width / 2;
//     const isRight = clickX > rect.left + rect.width / 2;

//     if (isLeft) {
//       // PREVIOUS SLIDE
//       const prev =
//         activeIndex === 0 ? testimonialsData.length - 1 : activeIndex - 1;
//       goToSlide(prev);
//     }

//     if (isRight) {
//       // NEXT SLIDE
//       const next =
//         activeIndex === testimonialsData.length - 1 ? 0 : activeIndex + 1;
//       goToSlide(next);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         py: 12,
//         minHeight: "100vh",
//         position: "relative",
//         overflow: "hidden",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//       }}
//     >
//       <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
//         {/* TITLE SECTION - NO CHANGE */}
//         <Stack alignItems="center" spacing={2} mb={8} textAlign="center">
//           <Chip
//             label="LIVE FEEDBACK"
//             sx={{
//               bgcolor: "rgba(0,245,255,0.1)",
//               color: "#00F5FF",
//               border: "1px solid rgba(0,245,255,0.2)",
//               fontWeight: 700,
//               letterSpacing: 1.5,
//               animation: "pulse 2s infinite",
//               "@keyframes pulse": {
//                 "0%": { boxShadow: "0 0 0 0 rgba(0,245,255,0.4)" },
//                 "70%": { boxShadow: "0 0 0 10px rgba(0,245,255,0)" },
//                 "100%": { boxShadow: "0 0 0 0 rgba(0,245,255,0)" },
//               },
//             }}
//           />

//           <YTXTypography
//             className="fade-in"
//             style={{
//               fontSize: "3.2rem",
//               fontWeight: 900,
//               color: "#fff",
//               marginBottom: "16px",
//             }}
//           >
//             Stories From Teams Who Run on Yantrix
//           </YTXTypography>

//           <YTXTypography
//             style={{
//               color: "rgba(255,255,255,0.65)",
//               fontSize: "1.1rem",
//               maxWidth: "600px",
//               margin: "0 auto",
//               lineHeight: 1.7,
//             }}
//           >
//             Real feedback from enterprises using Yantrix to manage their entire
//             device fleet effortlessly.
//           </YTXTypography>
//         </Stack>

//         {/* --- CAROUSEL AREA --- */}
//         <Box
//           ref={carouselRef}
//           onPointerDown={handlePointerDown}
//           onPointerMove={handlePointerMove}
//           onPointerUp={handlePointerUp}
//           onPointerCancel={handlePointerUp}
//           onMouseEnter={() => setIsPaused(true)}
//           onMouseLeave={() => !isDragging.current && setIsPaused(false)}
//           sx={{
//             overflow: "hidden",
//             py: 4,
//             cursor: "grab",
//             position: "relative",
//             width: "100%",
//           }}
//         >
//           <Box
//             ref={innerRef}
//             sx={{
//               display: "flex",
//               transform: `translateX(${translationX}px)`,
//               transition: isDragging.current
//                 ? "none"
//                 : "transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
//               pl: { xs: "calc(50vw - 150px)", md: "calc(50% - 200px)" },
//             }}
//           >
//             {testimonialsData.map((item, index) => {
//               const isActive = index === activeIndex;

//               return (
//                 <Box
//                   key={item.id}
//                   onClick={() => {
//                     console.log("next one is clicked");
//                     // if (!isDragging.current) {
//                     //   goToSlide(index);
//                     // } else {
//                     //   console.log("index is not working");
//                     // }
//                   }}
//                   sx={{
//                     flexShrink: 0,
//                     width: { xs: "300px", md: "400px" },
//                     mr: { xs: 3, md: 6 },
//                     transition: "all 0.5s ease",
//                     transform: isActive ? "scale(1)" : "scale(0.9)",
//                     opacity: isActive ? 1 : 0.4,
//                     filter: isActive ? "none" : "grayscale(100%) blur(2px)",
//                     cursor: "pointer",
//                   }}
//                 >
//                   {/* CARD CONTENT - UNCHANGED */}
//                   <Box
//                     sx={{
//                       p: 4,
//                       height: "100%",
//                       background: "rgba(20, 20, 20, 0.6)",
//                       backdropFilter: "blur(20px)",
//                       border: "1px solid",
//                       borderColor: isActive
//                         ? "rgba(0,245,255,0.5)"
//                         : "rgba(255,255,255,0.1)",
//                       borderRadius: 4,
//                       boxShadow: isActive
//                         ? "0 20px 50px -10px rgba(0,245,255,0.15)"
//                         : "none",
//                       display: "flex",
//                       flexDirection: "column",
//                       position: "relative",
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         position: "absolute",
//                         bottom: 0,
//                         left: 0,
//                         height: "3px",
//                         bgcolor: "#00F5FF",
//                         width: isActive && !isPaused ? "100%" : "0%",
//                         transition:
//                           isActive && !isPaused
//                             ? `width ${AUTO_DELAY}ms linear`
//                             : "width 0s",
//                         opacity: 0.7,
//                       }}
//                     />

//                     <Stack
//                       direction="row"
//                       spacing={2}
//                       alignItems="center"
//                       mb={3}
//                     >
//                       <Avatar
//                         src={item.img}
//                         sx={{
//                           width: 56,
//                           height: 56,
//                           border: "2px solid #333",
//                         }}
//                       />
//                       <Box>
//                         <YTXTypography
//                           variant="subtitle1"
//                           sx={{ color: "white", fontWeight: 700 }}
//                         >
//                           {item.name}
//                         </YTXTypography>
//                         <YTXTypography variant="caption" sx={{ color: "#888" }}>
//                           {item.title},{" "}
//                           <span style={{ color: "#00F5FF" }}>
//                             {item.company}
//                           </span>
//                         </YTXTypography>
//                       </Box>
//                     </Stack>

//                     <Rating
//                       value={5}
//                       readOnly
//                       size="small"
//                       sx={{
//                         mb: 3,
//                         "& .MuiRating-iconFilled": { color: "#00F5FF" },
//                       }}
//                     />

//                     <Box sx={{ position: "relative", flexGrow: 1 }}>
//                       <FormatQuoteIcon
//                         sx={{
//                           position: "absolute",
//                           top: -10,
//                           left: -10,
//                           fontSize: 60,
//                           color: "rgba(255,255,255,0.05)",
//                           transform: "scale(-1, 1)",
//                         }}
//                       />
//                       <YTXTypography
//                         variant="h6"
//                         sx={{
//                           color: "#eee",
//                           fontWeight: 300,
//                           lineHeight: 1.6,
//                           position: "relative",
//                           zIndex: 1,
//                           fontSize: "1.1rem",
//                         }}
//                       >
//                         "{item.quote}"
//                       </YTXTypography>
//                     </Box>
//                   </Box>
//                 </Box>
//               );
//             })}
//           </Box>
//         </Box>

//         {/* Manual Navigation Bars */}
//         <Stack direction="row" spacing={1} justifyContent="center" mt={2}>
//           {testimonialsData.map((_, index) => (
//             <Box
//               key={index}
//               onClick={() => {
//                 setIsPaused(true); // Pause temporarily on manual click
//                 snapToItem(index);
//                 // Resume auto-play after a short delay implies interaction is done
//                 setTimeout(() => setIsPaused(false), AUTO_DELAY);
//               }}
//               sx={{
//                 width: activeIndex === index ? 40 : 8,
//                 height: 4,
//                 borderRadius: 2,
//                 bgcolor:
//                   activeIndex === index ? "#00F5FF" : "rgba(255,255,255,0.2)",
//                 transition: "all 0.3s ease",
//                 cursor: "pointer",
//                 "&:hover": { bgcolor: "#00F5FF" },
//               }}
//             />
//           ))}
//         </Stack>
//       </Container>
//     </Box>
//   );
// };

// export default Testimonials;

// // old code method for the testimonials drag only
// // --- POINTER UP ---
// // const handlePointerUp = (e) => {
// //   if (!isDragging.current) return;
// //   // console.log("current click")
// //   carouselRef.current?.releasePointerCapture?.(e.pointerId);

// //   if (carouselRef.current) carouselRef.current.style.cursor = "grab";

// //   const dragged = dragDistance.current >= 6;
// //   isDragging.current = false;

// //   setIsPaused(false);

// //   const { itemWidth } = getDimensions();
// //   if (itemWidth === 0) return;

// //   // If DRAG happened → slide normally
// //   if (dragged && window.innerWidth > 1024) {
// //     console.log("drag happned");
// //     const movedIndex = Math.round(Math.abs(translationX) / itemWidth);
// //     goToSlide(movedIndex);
// //     return;
// //   }
// //   else
// //   {
// //     console.log("cliked happned");
// //   }

// //   // If NO DRAG → treat as CLICK (do nothing here, card's onClick will fire)
// // };

/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Avatar, Container, Stack, Rating, Chip } from '@mui/material';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import YTXTypography from '../YTXTypography';

const testimonialsData = [
  {
    id: 1,
    quote:
      "The predictive analysis features are borderline magic. I've never seen a platform handle data complexity with such elegance.",
    name: 'James Land',
    title: 'Senior Architect',
    company: 'Oracle',
    img: 'https://i.pravatar.cc/150?u=1',
  },
  {
    id: 2,
    quote:
      "Working with this team transformed our product. The 'Esper' engine predicted user drop-off points before we even launched.",
    name: 'Sarah Connor',
    title: 'CTO',
    company: 'Cyberdyne',
    img: 'https://i.pravatar.cc/150?u=2',
  },
  {
    id: 3,
    quote:
      "It's rare to find a design that feels this futuristic yet remains so intuitive. The micro-interactions are pure gold.",
    name: 'Alex Johnson',
    title: 'Product Lead',
    company: 'Linear',
    img: 'https://i.pravatar.cc/150?u=3',
  },
  {
    id: 4,
    quote:
      'A masterpiece of engineering. The fluidity of the interface matches the speed of the backend perfectly.',
    name: 'Marcus Aurelius',
    title: 'Design Director',
    company: 'Rome Inc.',
    img: 'https://i.pravatar.cc/150?u=4',
  },
  {
    id: 5,
    quote:
      'I was skeptical about the AI claims, but the results speak for themselves. ROI increased by 40% in week one.',
    name: 'Elara Vance',
    title: 'VP of Growth',
    company: 'Nebula',
    img: 'https://i.pravatar.cc/150?u=5',
  },
];

const AUTO_DELAY = 5000;

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [translationX, setTranslationX] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const dragDistance = useRef(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const startTranslateX = useRef(0);

  const carouselRef = useRef(null);
  const innerRef = useRef(null);
  const autoPlayRef = useRef(null);

  // --- DIMENSIONS ---
  const getDimensions = useCallback(() => {
    if (!innerRef.current) return { itemWidth: 0 };

    const item = innerRef.current.children[0];
    if (!item) return { itemWidth: 0 };

    const style = window.getComputedStyle(item);
    const margin = parseFloat(style.marginRight) || 0;
    const itemWidth = item.offsetWidth + margin;

    return { itemWidth };
  }, []);

  // --- GO TO SLIDE ---
  const goToSlide = useCallback(
    (index) => {
      const { itemWidth } = getDimensions();
      if (itemWidth === 0) return;

      const clampedIndex = Math.max(0, Math.min(index, testimonialsData.length - 1));

      const newTranslate = -(clampedIndex * itemWidth);

      // Reset animation by setting to false first
      setIsAnimating(false);
      setTranslationX(newTranslate);
      setActiveIndex(clampedIndex);

      // Force reflow and restart animation
      setTimeout(() => {
        setIsAnimating(true);
      }, 50);
    },
    [getDimensions]
  );

  // --- AUTO PLAY ---
  useEffect(() => {
    if (autoPlayRef.current) {
      clearTimeout(autoPlayRef.current);
    }

    if (!isPaused && !isDragging.current) {
      autoPlayRef.current = setTimeout(() => {
        const next = activeIndex === testimonialsData.length - 1 ? 0 : activeIndex + 1;
        goToSlide(next);
      }, AUTO_DELAY);
    }

    return () => {
      if (autoPlayRef.current) {
        clearTimeout(autoPlayRef.current);
      }
    };
  }, [activeIndex, isPaused, goToSlide]);

  // --- HANDLE RESIZE ---
  useEffect(() => {
    const handleResize = () => {
      setIsAnimating(false);
      goToSlide(activeIndex);
    };

    window.addEventListener('resize', handleResize);

    // Initial setup
    const timer = setTimeout(() => goToSlide(activeIndex), 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, [activeIndex, goToSlide]);

  // --- POINTER DOWN ---
  const handlePointerDown = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;

    e.preventDefault();
    carouselRef.current?.setPointerCapture?.(e.pointerId);

    isDragging.current = true;
    dragDistance.current = 0;

    setIsPaused(true);
    startX.current = e.clientX;
    startY.current = e.clientY;
    startTranslateX.current = translationX;

    if (carouselRef.current) carouselRef.current.style.cursor = 'grabbing';
  };

  // --- POINTER MOVE ---
  const handlePointerMove = (e) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    dragDistance.current = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Only drag on desktop
    if (window.innerWidth > 768) {
      if (Math.abs(deltaX) > Math.abs(deltaY) + 4) {
        e.preventDefault();
      }
      setTranslationX(startTranslateX.current + deltaX);
    }
  };

  const handlePointerUp = (e) => {
    if (!isDragging.current) return;

    carouselRef.current?.releasePointerCapture?.(e.pointerId);
    if (carouselRef.current) carouselRef.current.style.cursor = 'grab';

    const wasDragged = dragDistance.current >= 10;

    const { itemWidth } = getDimensions();
    if (itemWidth === 0) {
      isDragging.current = false;
      setIsPaused(false);
      return;
    }

    // --- DRAG BEHAVIOR ---
    if (wasDragged && window.innerWidth > 768) {
      const movedIndex = Math.round(Math.abs(translationX) / itemWidth);
      goToSlide(movedIndex);
      isDragging.current = false;
      setTimeout(() => setIsPaused(false), 500);
      return;
    }

    // --- CLICK BEHAVIOR ---
    const rect = carouselRef.current.getBoundingClientRect();
    const clickX = e.clientX;

    const isLeft = clickX < rect.left + rect.width / 2;

    if (isLeft) {
      // PREVIOUS SLIDE
      const prev = activeIndex === 0 ? testimonialsData.length - 1 : activeIndex - 1;
      goToSlide(prev);
    } else {
      // NEXT SLIDE
      const next = activeIndex === testimonialsData.length - 1 ? 0 : activeIndex + 1;
      goToSlide(next);
    }

    isDragging.current = false;
    setTimeout(() => setIsPaused(false), 500);
  };

  // Manual navigation function
  const snapToItem = (index) => {
    goToSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(10, 10, 20, 0.6) 100%)',
      }}
    >
      {/* Background effects */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(100px)',
          animation: 'floatSlow 20s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '350px',
          height: '350px',
          background: 'radial-gradient(circle, rgba(0, 245, 255, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(90px)',
          animation: 'floatSlow 25s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        {/* TITLE SECTION */}
        <Stack alignItems="center" spacing={2} mb={{ xs: 6, md: 8 }} textAlign="center">
          {/* <Chip
            label="LIVE FEEDBACKddd"
            sx={{
              bgcolor: "rgba(0,245,255,0.1)",
              color: "#00F5FF",
              border: "1px solid rgba(0,245,255,0.3)",
              fontWeight: 700,
              letterSpacing: 1.5,
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 15px rgba(0, 245, 255, 0.2)",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { boxShadow: "0 0 0 0 rgba(0,245,255,0.4)" },
                "70%": { boxShadow: "0 0 0 10px rgba(0,245,255,0)" },
                "100%": { boxShadow: "0 0 0 0 rgba(0,245,255,0)" },
              },
            }}
          /> */}

          <YTXTypography
            className="fade-in"
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.2rem)',
              fontWeight: 900,
              color: '#fff',
              marginBottom: '16px',
              background: 'linear-gradient(135deg, #ffffff 0%, rgba(0, 245, 255, 0.95) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.2,
            }}
          >
            Stories From Teams Who Run on Yantrix
          </YTXTypography>

          <YTXTypography
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Real feedback from enterprises using Yantrix to manage their entire device fleet
            effortlessly.
          </YTXTypography>
        </Stack>

        {/* --- CAROUSEL AREA --- */}
        <Box
          ref={carouselRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => !isDragging.current && setIsPaused(false)}
          sx={{
            overflow: 'hidden',
            py: 4,
            cursor: 'grab',
            position: 'relative',
            width: '100%',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'pan-y',
          }}
        >
          <Box
            ref={innerRef}
            sx={{
              display: 'flex',
              transform: `translateX(${translationX}px)`,
              transition: isDragging.current
                ? 'none'
                : 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
              pl: {
                xs: 'calc(50vw - 160px)',
                sm: 'calc(50vw - 180px)',
                md: 'calc(50% - 220px)',
              },
            }}
          >
            {testimonialsData.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <Box
                  key={item.id}
                  sx={{
                    flexShrink: 0,
                    width: { xs: '320px', sm: '360px', md: '440px' },
                    mr: { xs: 3, md: 6 },
                    transition: 'all 0.5s ease',
                    transform: isActive ? 'scale(1)' : 'scale(0.88)',
                    opacity: isActive ? 1 : 0.35,
                    filter: isActive ? 'none' : 'grayscale(100%) blur(2px)',
                    pointerEvents: isActive ? 'auto' : 'none',
                  }}
                >
                  {/* CARD CONTENT */}
                  <Box
                    sx={{
                      p: { xs: 3, md: 4 },
                      height: '100%',
                      background:
                        'linear-gradient(135deg, rgba(20, 20, 30, 0.8) 0%, rgba(10, 10, 20, 0.9) 100%)',
                      backdropFilter: 'blur(20px)',
                      border: '1px solid',
                      borderColor: isActive ? 'rgba(0,245,255,0.5)' : 'rgba(255,255,255,0.1)',
                      borderRadius: 4,
                      boxShadow: isActive
                        ? '0 25px 60px -10px rgba(0,245,255,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : '0 10px 30px -10px rgba(0,0,0,0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Top glow line */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        background:
                          'linear-gradient(90deg, transparent, rgba(0, 245, 255, 0.8), transparent)',
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                      }}
                    />

                    {/* Progress bar - FIXED with proper reset */}
                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '4px',
                        bgcolor: '#00F5FF',
                        width: 0,
                        opacity: isActive ? 0.8 : 0,
                        boxShadow: isActive ? '0 0 10px rgba(0, 245, 255, 0.6)' : 'none',
                        borderRadius: '0 4px 0 0',
                        ...(isActive &&
                          !isPaused &&
                          isAnimating && {
                            animation: `progressBar ${AUTO_DELAY}ms linear forwards`,
                          }),
                        '@keyframes progressBar': {
                          '0%': {
                            width: '0%',
                          },
                          '100%': {
                            width: '100%',
                          },
                        },
                      }}
                    />

                    <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                      <Avatar
                        src={item.img}
                        sx={{
                          width: { xs: 52, md: 60 },
                          height: { xs: 52, md: 60 },
                          border: '3px solid rgba(0, 245, 255, 0.3)',
                          boxShadow: '0 4px 15px rgba(0, 245, 255, 0.2)',
                        }}
                      />
                      <Box>
                        <YTXTypography
                          variant="subtitle1"
                          sx={{
                            color: 'white',
                            fontWeight: 700,
                            fontSize: { xs: '1rem', md: '1.1rem' },
                          }}
                        >
                          {item.name}
                        </YTXTypography>
                        <YTXTypography
                          variant="caption"
                          sx={{
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: { xs: '0.85rem', md: '0.9rem' },
                          }}
                        >
                          {item.title},{' '}
                          <span style={{ color: '#00F5FF', fontWeight: 600 }}>{item.company}</span>
                        </YTXTypography>
                      </Box>
                    </Stack>

                    <Rating
                      value={5}
                      readOnly
                      size="small"
                      sx={{
                        mb: 3,
                        '& .MuiRating-iconFilled': { color: '#00F5FF' },
                        '& .MuiRating-iconEmpty': {
                          color: 'rgba(0, 245, 255, 0.3)',
                        },
                      }}
                    />

                    <Box sx={{ position: 'relative', flexGrow: 1 }}>
                      <FormatQuoteIcon
                        sx={{
                          position: 'absolute',
                          top: -16,
                          left: -16,
                          fontSize: { xs: 50, md: 70 },
                          color: 'rgba(0, 245, 255, 0.08)',
                          transform: 'scale(-1, 1)',
                        }}
                      />
                      <YTXTypography
                        variant="h6"
                        sx={{
                          color: 'rgba(255, 255, 255, 0.95)',
                          fontWeight: 400,
                          lineHeight: 1.7,
                          position: 'relative',
                          zIndex: 1,
                          fontSize: { xs: '1rem', md: '1.15rem' },
                          fontStyle: 'italic',
                        }}
                      >
                        "{item.quote}"
                      </YTXTypography>
                    </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>

        {/* Manual Navigation Dots */}
        <Stack direction="row" spacing={1} justifyContent="center" mt={{ xs: 3, md: 4 }}>
          {testimonialsData.map((_, index) => (
            <Box
              key={index}
              onClick={() => snapToItem(index)}
              sx={{
                width: activeIndex === index ? 48 : 10,
                height: 6,
                borderRadius: 3,
                bgcolor: activeIndex === index ? '#00F5FF' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                boxShadow: activeIndex === index ? '0 0 15px rgba(0, 245, 255, 0.5)' : 'none',
                '&:hover': {
                  bgcolor: activeIndex === index ? '#00F5FF' : '#00F5FF',
                  opacity: activeIndex === index ? 1 : 0.6,
                  transform: 'scale(1.1)',
                },
              }}
            />
          ))}
        </Stack>
      </Container>

      <style jsx global>{`
        @keyframes floatSlow {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(30px, 30px);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .fade-in {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>
    </Box>
  );
};

export default Testimonials;
