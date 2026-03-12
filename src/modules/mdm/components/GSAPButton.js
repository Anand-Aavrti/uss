// src/components/GSAPFillButton.jsx
"use client";
import { Button } from "@mui/material";
import { gsap } from "gsap";
import { useRef, useEffect } from "react";

// ==================== STYLE VARIANTS ====================
const buttonStyles = {
  rounded: {
    borderRadius: "50px",
    px: 5,
    py: 1.6,
  },
  square: {
    borderRadius: "12px",
    px: 4,
    py: 1.5,
  },
};

const variantStyles = {
  primary: {
    baseColor: "transparent",
    fillColor: "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)",
    textColor: "#ffffff",
    textColorHover: "#ffffff",
    border: "none",
    background: "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)",
    hoverOverlay: "rgba(0, 0, 0, 0.15)", // darken on hover
    // hoverScale: 1.04,
    shadowHover: "0 20px 40px rgba(0, 245, 255, 0.4)",
  },
  secondary: {
    baseColor: "#00f5ff",
    fillColor: "#00f5ff",
    textColor: "#00f5ff",
    textColorHover: "#ffffff",
    border: "2px solid rgba(0, 245, 255, 0.4)",
    background: "transparent",
    hoverOverlay: "rgba(0, 245, 255, 0.12)",
    // hoverScale: 1.03,
  },
};

export default function GSAPFillButton({
  children,
  variant = "secondary", // default is outlined
  shape = "rounded", // "rounded" | "square"
  sx = {},
  ...props
}) {
  const buttonRef = useRef(null);
  const rippleRef = useRef(null);
  const tweenRef = useRef(null);
  const isHovered = useRef(false);

  const style = variantStyles[variant];
  const shapeStyle = buttonStyles[shape];

  // GSAP Ripple Logic — 100% unchanged (perfect as-is)
  const startRipple = (e) => {
    if (!buttonRef.current || !rippleRef.current) return;
    isHovered.current = true;
    if (tweenRef.current) tweenRef.current.kill();

    const btn = buttonRef.current;
    const ripple = rippleRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(ripple, {
      left: x,
      top: y,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 1,
    });

    const maxDist = Math.max(
      Math.hypot(x, y),
      Math.hypot(x, rect.height - y),
      Math.hypot(rect.width - x, y),
      Math.hypot(rect.width - x, rect.height - y)
    );
    const scaleNeeded = (maxDist * 2.4) / 50;

    tweenRef.current = gsap.to(ripple, {
      scale: scaleNeeded,
      duration: 1.25,
      ease: "power2.out",
    });
  };

  const endRipple = (e) => {
    if (!rippleRef.current || !isHovered.current) return;
    isHovered.current = false;
    if (tweenRef.current) tweenRef.current.kill();

    const ripple = rippleRef.current;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    tweenRef.current = gsap.to(ripple, {
      left: x,
      top: y,
      xPercent: -50,
      yPercent: -50,
      scale: 0,
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      overwrite: true,
    });
  };

  useEffect(() => {
    return () => tweenRef.current?.kill();
  }, []);

  return (
    <Button
      ref={buttonRef}
      onMouseEnter={startRipple}
      onMouseLeave={endRipple}
      sx={{
        position: "relative",
        overflow: "hidden",
        border: style.border,
        color: style.textColor,
        background: style.background,
        borderRadius: shapeStyle.borderRadius,
        px: shapeStyle.px,
        py: shapeStyle.py,
        fontWeight: 700,
        textTransform: "none",
        fontSize: "1rem",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        // boxShadow:
        //   variant === "primary"
        //     ? "0 10px 30px rgba(0, 245, 255, 0.25)"
        //     : "none",

        // Hover state — smart per variant
        "&:hover": {
          color: style.textColorHover,
          transform: `scale(${style.hoverScale || 1.03})`,
          // boxShadow:
          //   variant === "primary"
          //     ? style.shadowHover || "0 20px 40px rgba(0, 245, 255, 0.4)"
          //     : "0 15px 35px rgba(0, 245, 255, 0.2)",
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: style.hoverOverlay || "rgba(0, 245, 255, 0.12)",
            pointerEvents: "none",
          },
        },
        ...sx,
      }}
      {...props}
    >
      {/* Ripple */}
      <span
        ref={rippleRef}
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          background: style.fillColor,
          borderRadius: "50%",
          pointerEvents: "none",
          opacity: 0,
        }}
      />
      <span style={{ position: "relative", zIndex: 10 }}>{children}</span>
    </Button>
  );
}
