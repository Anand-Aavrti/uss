import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

// ============================================
// 1. SECTION WRAPPER - Replace all full-height sections
// ============================================
export const SectionWrapper = ({
  children,
  className = "",
  background = "transparent",
  padding = "120px 24px",
  snapAlign = "start",
  snapStop = false,
  style = {},
}) => {
  return (
    <div
      className={className}
      style={{
        minHeight: "100vh",
        height: snapStop ? "100vh" : "auto",
        padding,
        scrollSnapAlign: snapAlign,
        scrollSnapStop: snapStop ? "always" : "normal",
        position: "relative",
        background,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

// ============================================
// 2. DEVICE MOCKUP - Replace all device mockup code
// ============================================
export const DeviceMockup = ({
  width = "300px",
  height = "550px",
  borderRadius = "28px",
  glowSize = "450px",
  className = "",
  children,
  style = {},
}) => {
  return (
    <div className={className} style={{ position: "relative", ...style }}>
      {/* Glow Effect */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: glowSize,
          height: glowSize,
          background:
            "radial-gradient(circle, rgba(0, 245, 255, 0.25) 0%, transparent 70%)",
          filter: "blur(80px)",
          animation: "pulse 5s ease-in-out infinite",
        }}
      />

      {/* Device Frame */}
      <div
        style={{
          position: "relative",
          width,
          height,
          borderRadius,
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.03) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(20px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
          overflow: "hidden",
          boxShadow: "0 30px 90px rgba(0, 245, 255, 0.15)",
          zIndex: 2,
        }}
      >
        {children || (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "16px",
              background: "rgba(0, 245, 255, 0.08)",
              border: "1px solid rgba(0, 245, 255, 0.25)",
              backdropFilter: "blur(10px)",
            }}
          />
        )}
      </div>
    </div>
  );
};

// ============================================
// 3. GRADIENT TEXT - Replace all gradient text spans
// ============================================
export const GradientText = ({
  children,
  gradient = "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)",
  className = "",
  style = {},
}) => {
  return (
    <span
      className={className}
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
    >
      {children}
    </span>
  );
};

// ============================================
// 4. GLASS CARD WITH HOVER - Replace GlowWrapper
// ============================================
export const GlassCard = ({
  children,
  borderRadius = "32px",
  enableHover = true,
  style = {},
}) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const highlightRef = useRef(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = () => {
    if (!glowRef.current || !highlightRef.current) return;

    currentX.current = lerp(currentX.current, targetX.current, 0.08);
    currentY.current = lerp(currentY.current, targetY.current, 0.08);

    glowRef.current.style.left = currentX.current + "px";
    glowRef.current.style.top = currentY.current + "px";
    highlightRef.current.style.left = currentX.current + "px";
    highlightRef.current.style.top = currentY.current + "px";

    rafId.current = requestAnimationFrame(animate);
  };

  const handleMove = (e) => {
    if (!enableHover) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targetX.current = x;
    targetY.current = y;

    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;

    card.style.transform = `rotateX(${py * 4}deg) rotateY(${px * -4}deg)`;
  };

  const handleEnter = () => {
    if (!enableHover) return;
    if (glowRef.current) glowRef.current.style.opacity = 1;
    if (highlightRef.current) highlightRef.current.style.opacity = 0.35;
    if (!rafId.current) rafId.current = requestAnimationFrame(animate);
  };

  const handleLeave = () => {
    if (!enableHover) return;
    if (glowRef.current) glowRef.current.style.opacity = 0;
    if (highlightRef.current) highlightRef.current.style.opacity = 0;
    if (cardRef.current)
      cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    cancelAnimationFrame(rafId.current);
    rafId.current = null;
  };

  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius,
        transition: "transform 0.2s ease-out",
        willChange: "transform",
        ...style,
      }}
    >
      {/* Glow */}
      {enableHover && (
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: "50%",
            opacity: 0,
            transition: "opacity 0.6s ease",
            background:
              "radial-gradient(circle at center, rgba(0,255,255,0.45), rgba(0,153,255,0.25), rgba(255,0,255,0.15), transparent 70%)",
            filter: "blur(80px)",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            zIndex: 0,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Highlight */}
      {enableHover && (
        <div
          ref={highlightRef}
          style={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            opacity: 0,
            transition: "opacity 0.5s ease",
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.18), rgba(255,255,255,0.05), transparent 70%)",
            filter: "blur(45px)",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            zIndex: 1,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 5 }}>{children}</div>
    </div>
  );
};

// ============================================
// 5. BACKGROUND OVERLAY - Replace background divs
// ============================================
export const BackgroundOverlay = ({ gradient, zIndex = 0 }) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: gradient,
      zIndex,
    }}
  />
);
