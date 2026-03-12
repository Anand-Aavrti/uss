/* eslint-disable react/jsx-key */
import React, { useEffect, useRef, useState } from "react";
import { GiSlashedShield } from "react-icons/gi";
import { BsLightningChargeFill } from "react-icons/bs";
import { AiFillControl } from "react-icons/ai";
import { IoPhonePortrait } from "react-icons/io5";
import { GrCompliance } from "react-icons/gr";
import { SiPagespeedinsights } from "react-icons/si";
import YTXTypography from "../components/YTXTypography";
import YTXCard from "../components/YTXCard";
// -------------------- FeatureGlowCard (copy of YTXCard glow) --------------------
// -------------------- FeatureGlowCard (updated: glow clipped like YTXCard) --------------------
// Replace your FeatureGlowContainer with this improved version
const FeatureGlowContainer = ({
  children,
  radius = 24,
  glowSize = 220,
  highlightSize = 180,
}) => {
  const outerRef = useRef(null);
  const glowRef = useRef(null);
  const highlightRef = useRef(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const curX = useRef(0);
  const curY = useRef(0);
  const raf = useRef(null);

  const lerp = (a, b, t) => a + (b - a) * t;

  const animate = () => {
    curX.current = lerp(curX.current, targetX.current, 0.08);
    curY.current = lerp(curY.current, targetY.current, 0.08);

    // place glow relative to inner card (pixel coords)
    if (glowRef.current && highlightRef.current) {
      glowRef.current.style.left = `${curX.current}px`;
      glowRef.current.style.top = `${curY.current}px`;
      highlightRef.current.style.left = `${curX.current}px`;
      highlightRef.current.style.top = `${curY.current}px`;
    }

    raf.current = requestAnimationFrame(animate);
  };

  const onMove = (e) => {
    const el = outerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetX.current = x;
    targetY.current = y;

    const px = (x / rect.width - 0.5) * 2;
    const py = (y / rect.height - 0.5) * 2;
    el.style.transform = `rotateX(${py * 4}deg) rotateY(${-px * 4}deg)`;
  };

  const onEnter = () => {
    if (glowRef.current) glowRef.current.style.opacity = "1";
    if (highlightRef.current) highlightRef.current.style.opacity = "0.35";
    if (!raf.current) raf.current = requestAnimationFrame(animate);
  };

  const onLeave = () => {
    if (glowRef.current) glowRef.current.style.opacity = "0";
    if (highlightRef.current) highlightRef.current.style.opacity = "0";
    if (outerRef.current)
      outerRef.current.style.transform = "rotateX(0) rotateY(0)";
    if (raf.current) {
      cancelAnimationFrame(raf.current);
      raf.current = null;
    }
  };

  // cleanup
  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, []);

  // CSS values that we enforce for clipping
  const clip = `inset(0 round ${radius}px)`;

  return (
    <div
      ref={outerRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        // keep this wrapper minimal — the innerBox below is the real visual card
        // borderRadius: `${radius}px`,
        borderRadius: `24px`,

        willChange: "transform",
        transition: "transform 0.18s ease-out",
        display: "inline-block",
      }}
    >
      {/* Inner visual card which owns background + clipping */}
      <div
        style={{
          position: "relative",
          // borderRadius: `${radius}px`,
          borderRadius: `24px`,

          overflow: "hidden", // normal clip
          // important: create the card background here so everything inside shares same rounded rect
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {/* Glow - absolutely positioned inside the SAME rounded element */}
        <div
          ref={glowRef}
          style={{
            position: "absolute",
            width: glowSize,
            height: glowSize,
            borderRadius: "50%",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.45s ease",
            // radial gradient + subtle multi-color, same look as before
            background:
              "radial-gradient(circle at center, rgba(0,255,255,0.45), rgba(0,153,255,0.25), rgba(255,0,255,0.12), transparent 70%)",
            // slightly reduce blur to avoid extreme halo escape (tweak as needed)
            filter: "blur(40px)",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
            left: "50%",
            top: "50%",
            // ENFORCE rounded clipping using clip-path (guaranteed)
            clipPath: clip,
            WebkitClipPath: clip,
            // in some browsers mask can be more robust for subpixel blur artifacts
            maskImage: "linear-gradient(#fff, #fff)",
          }}
        />

        {/* Acrylic highlight (on top of glow, under content) */}
        <div
          ref={highlightRef}
          style={{
            position: "absolute",
            width: highlightSize,
            height: highlightSize,
            borderRadius: "50%",
            pointerEvents: "none",
            opacity: 0,
            transition: "opacity 0.35s ease",
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.18), rgba(255,255,255,0.06), transparent 65%)",
            filter: "blur(28px)",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            left: "50%",
            top: "50%",
            clipPath: clip,
            WebkitClipPath: clip,
          }}
        />

        {/* This is the real card content area — children go here (zIndex above glow) */}
        <div style={{ position: "relative", zIndex: 2 }}>{children}</div>
      </div>
    </div>
  );
};

// -------------------- end FeatureGlowCard --------------------

const FeaturesPremium = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProgressBars, setShowProgressBars] = useState(false);

  const features = [
    {
      icon: <GiSlashedShield />,
      title: "Zero-Trust Security",
      subtitle: "Military-grade protection",
      description:
        "End-to-end 256-bit AES encryption with multi-factor authentication and continuous compliance monitoring across your entire device fleet.",
      metrics: [
        { label: "Encryption", value: "256-bit AES" },
        { label: "Response Time", value: "< 50ms" },
        { label: "Threat Detection", value: "Real-time" },
      ],
    },
    {
      icon: <BsLightningChargeFill />,
      title: "Instant Deployment",
      subtitle: "Zero-touch provisioning",
      description:
        "Deploy thousands of devices simultaneously with OTA provisioning. From unboxing to production-ready in under 5 minutes.",
      metrics: [
        { label: "Setup Time", value: "< 5 min" },
        { label: "Bulk Deploy", value: "Unlimited" },
        { label: "Success Rate", value: "99.9%" },
      ],
    },
    {
      icon: <AiFillControl />,
      title: "Granular Control",
      subtitle: "Surgical precision management",
      description:
        "Configure app whitelists, network policies, geofencing, and access rules at individual, group, or fleet level.",
      metrics: [
        { label: "Policy Types", value: "50+" },
        { label: "Update Speed", value: "Instant" },
        { label: "Rollback", value: "1-click" },
      ],
    },
    {
      icon: <IoPhonePortrait />,
      title: "Universal Platform Support",
      subtitle: "One dashboard for all OS",
      description:
        "Native Android Enterprise, Apple DEP/VPP, and Windows Autopilot integration from a single unified control plane.",
      metrics: [
        { label: "Platforms", value: "Android, iOS, Win" },
        { label: "API Coverage", value: "100%" },
        { label: "Sync Latency", value: "< 2s" },
      ],
    },
    {
      icon: <GrCompliance />,
      title: "Compliance Autopilot",
      subtitle: "Automated regulatory adherence",
      description:
        "Pre-configured HIPAA, GDPR, SOC 2, and ISO 27001 templates with automated audit trails and one-click reporting.",
      metrics: [
        { label: "Standards", value: "HIPAA, GDPR, SOC 2" },
        { label: "Audit Trail", value: "Automated" },
        { label: "Reports", value: "Real-time" },
      ],
    },
    {
      icon: <SiPagespeedinsights />,
      title: "Predictive Intelligence",
      subtitle: "AI-powered monitoring",
      description:
        "Machine learning algorithms detect anomalies, predict failures, and provide actionable insights before issues escalate.",
      metrics: [
        { label: "Anomaly Detection", value: "ML-powered" },
        { label: "Predictions", value: "72hr forecast" },
        { label: "Accuracy", value: "94%" },
      ],
    },
  ];
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Create pairs for desktop OR single cards for mobile
  const featureItems = isMobile
    ? features.map((f) => [f]) // Single card arrays for mobile
    : (() => {
        const pairs = [];
        for (let i = 0; i < features.length; i += 2) {
          pairs.push(features.slice(i, i + 2));
        }
        return pairs;
      })();
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isTransitioning = false;
    let accumulatedDelta = 0;
    const THRESHOLD = isMobile ? 150 : 300; // INCREASED desktop threshold
    let lastTransitionTime = 0;
    const TRANSITION_COOLDOWN = isMobile ? 600 : 1200; // INCREASED desktop cooldown
    let exitAttempts = 0; // Track attempts to exit section
    const EXIT_THRESHOLD = 2; // Require 2 attempts to exit

    const handleWheel = (e) => {
      const now = Date.now();

      if (isTransitioning || now - lastTransitionTime < TRANSITION_COOLDOWN) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      const canScrollUp = currentIndex > 0;
      const canScrollDown = currentIndex < featureItems.length - 1;

      if (e.deltaY > 0) {
        // SCROLLING DOWN
        if (canScrollDown) {
          // Still have cards to show
          e.preventDefault();
          e.stopPropagation();
          exitAttempts = 0; // Reset exit attempts

          accumulatedDelta += Math.abs(e.deltaY);

          if (accumulatedDelta >= THRESHOLD) {
            isTransitioning = true;
            lastTransitionTime = now;
            setCurrentIndex((prev) => prev + 1);
            accumulatedDelta = 0;

            setTimeout(() => {
              isTransitioning = false;
            }, 1000); // Longer transition lock
          }
        } else {
          // At last card - require multiple attempts to exit
          exitAttempts++;

          if (exitAttempts < EXIT_THRESHOLD) {
            e.preventDefault();
            e.stopPropagation();
          } else {
            // Allow exit after threshold reached
            exitAttempts = 0;
            accumulatedDelta = 0;
          }
        }
      } else if (e.deltaY < 0) {
        // SCROLLING UP
        if (canScrollUp) {
          // Still have cards to show
          e.preventDefault();
          e.stopPropagation();
          exitAttempts = 0; // Reset exit attempts

          accumulatedDelta += Math.abs(e.deltaY);

          if (accumulatedDelta >= THRESHOLD) {
            isTransitioning = true;
            lastTransitionTime = now;
            setCurrentIndex((prev) => prev - 1);
            accumulatedDelta = 0;

            setTimeout(() => {
              isTransitioning = false;
            }, 1000); // Longer transition lock
          }
        } else {
          // At first card - require multiple attempts to exit
          exitAttempts++;

          if (exitAttempts < EXIT_THRESHOLD) {
            e.preventDefault();
            e.stopPropagation();
          } else {
            // Allow exit after threshold reached
            exitAttempts = 0;
            accumulatedDelta = 0;
          }
        }
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [currentIndex, featureItems.length, isMobile]);
  // Add this NEW useEffect right after your existing ones (around line 340)
  useEffect(() => {
    const parentScroller = containerRef.current?.parentElement;
    if (!parentScroller) return;

    // Disable scroll snap when entering features section
    const disableSnap = () => {
      parentScroller.style.scrollSnapType = "none";
    };

    // Re-enable scroll snap when fully exited
    const enableSnap = () => {
      parentScroller.style.scrollSnapType = "y mandatory";
    };

    const container = containerRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Entering section - disable snap
          disableSnap();
        } else if (entry.intersectionRatio === 0) {
          // Fully exited section - re-enable snap after delay
          setTimeout(enableSnap, 300);
        }
      },
      {
        threshold: [0, 0.1, 0.9, 1],
        rootMargin: "0px",
      }
    );

    if (container) observer.observe(container);

    return () => {
      observer.disconnect();
      enableSnap(); // Cleanup: always re-enable
    };
  }, []);
  useEffect(() => {
    if (!isMobile) return; // Only for mobile

    const container = containerRef.current;
    if (!container) return;

    let touchStartY = 0;
    let touchStartTime = 0;
    let isTransitioning = false;
    let hasReachedEnd = false;
    let hasReachedStart = false;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      touchStartTime = Date.now();
      hasReachedEnd = false;
      hasReachedStart = false;
    };

    const handleTouchMove = (e) => {
      const touchCurrentY = e.touches[0].clientY;
      const deltaY = touchStartY - touchCurrentY;

      // Check if at boundaries
      if (currentIndex === featureItems.length - 1 && deltaY > 0) {
        hasReachedEnd = true;
      } else if (currentIndex === 0 && deltaY < 0) {
        hasReachedStart = true;
      } else {
        // Prevent parent scroll while swiping cards
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e) => {
      if (isTransitioning) return;

      const touchEndY = e.changedTouches[0].clientY;
      const touchDuration = Date.now() - touchStartTime;
      const deltaY = touchStartY - touchEndY;
      const velocity = Math.abs(deltaY) / touchDuration;

      // Allow parent scroll at boundaries
      if (hasReachedEnd || hasReachedStart) {
        return;
      }

      // Swipe threshold
      if (Math.abs(deltaY) > 50 && velocity > 0.2) {
        e.preventDefault();

        if (deltaY > 0 && currentIndex < featureItems.length - 1) {
          // Swipe up - next card
          isTransitioning = true;
          setCurrentIndex((prev) => prev + 1);
          setTimeout(() => {
            isTransitioning = false;
          }, 800);
        } else if (deltaY < 0 && currentIndex > 0) {
          // Swipe down - previous card
          isTransitioning = true;
          setCurrentIndex((prev) => prev - 1);
          setTimeout(() => {
            isTransitioning = false;
          }, 800);
        }
      }
    };

    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex, featureItems.length, isMobile]);
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowProgressBars(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.4, // show when at least 40% in viewport
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);
  // Mobile: Prevent parent scroll while swiping cards
  useEffect(() => {
    if (!isMobile) return;

    const container = containerRef.current;
    const parentScroller = container?.closest('[style*="overflow"]');
    if (!container || !parentScroller) return;

    let isLocked = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.8) {
          // Section is in view - lock parent scroll
          isLocked = true;
          parentScroller.style.overflowY = "hidden";
        } else if (entry.intersectionRatio < 0.2) {
          // Section exited - unlock
          isLocked = false;
          parentScroller.style.overflowY = "scroll";
        }
      },
      {
        threshold: [0, 0.2, 0.8, 1],
        rootMargin: "0px",
      }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      if (parentScroller) {
        parentScroller.style.overflowY = "scroll";
      }
    };
  }, [isMobile]);
  return (
    <div
      ref={containerRef}
      className="features-section"
      style={{
        minHeight: isMobile ? "100vh" : "auto",
        height: isMobile ? "100vh" : "auto",
        width: "100%",
        position: "relative",
        background: "linear-gradient(180deg, #0a0a0f 0%, #0505081e 100%)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Gradient backdrop */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "1200px",
          height: "800px",
          background:
            "radial-gradient(ellipse at center, rgba(0, 245, 255, 0.04) 0%, transparent 60%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Header */}
      <div
        style={{
          padding: isMobile ? "0vw 4vw 0vw" : "80px 24px 40px",
          position: "relative",
          zIndex: 10,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "12px" }}>
            <span
              style={{
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#00f5ff",
                letterSpacing: "3px",
                textTransform: "uppercase",
              }}
            >
              Enterprise Capabilities
            </span>
          </div>

          <YTXTypography
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              color: "#ffffff",
              lineHeight: 1.1,
              letterSpacing: "-2px",
              marginBottom: "10px",
            }}
          >
            Built for scale.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Designed for simplicity.
            </span>
          </YTXTypography>

          <YTXTypography
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 255, 255, 0.6)",
              lineHeight: 1.6,
              fontWeight: 400,
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Six core capabilities that transform device management from
            operational overhead into strategic advantage.
          </YTXTypography>
        </div>
      </div>

      {/* Card Pairs Container */}
      <div
        style={{
          flex: 1,
          position: "relative",
          zIndex: 5,
          padding: "0 24px",
          display: "flex",
          // alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            width: "100%",
            position: "relative",
            height: "480px",
          }}
        >
          {featureItems.map((item, itemIndex) => {
            const isActive = itemIndex === currentIndex;
            const offset = (itemIndex - currentIndex) * 100;

            return (
              <div
                key={itemIndex}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "grid",
                  gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // Responsive grid
                  gap: "40px",
                  transform: `translateX(${offset}%)`,
                  opacity: isActive ? 1 : 0,
                  transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
                  pointerEvents: isActive ? "auto" : "none",
                }}
              >
                {item.map((feature, cardIndex) => (
                  <YTXCard
                    key={cardIndex}
                    contentSx={{
                      py: !isMobile ? 4.5 : null,
                      px: !isMobile ? 4.5 : null,
                    }}
                  >
                    {/* Keep existing card content exactly as is */}
                    <div
                      style={{
                        padding: "36px",
                        borderRadius: "24px",
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        backdropFilter: "blur(20px)",
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      {/* ALL YOUR EXISTING CARD CONTENT HERE - DON'T CHANGE */}
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          height: "2px",
                          background:
                            "linear-gradient(90deg, transparent 0%, #00f5ff 50%, transparent 100%)",
                          opacity: 0.6,
                        }}
                      />

                      <div
                        style={{
                          width: "60px",
                          height: "60px",
                          borderRadius: "16px",
                          background:
                            "linear-gradient(135deg, rgba(0, 245, 255, 0.1) 0%, rgba(0, 153, 255, 0.1) 100%)",
                          border: "1px solid rgba(0, 245, 255, 0.2)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1.7rem",
                          color: "#00f5ff",
                          marginBottom: "20px",
                        }}
                      >
                        {feature.icon}
                      </div>

                      <YTXTypography
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          color: "#00f5ff",
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          marginBottom: "8px",
                        }}
                      >
                        {feature.subtitle}
                      </YTXTypography>

                      <YTXTypography
                        style={{
                          fontSize: "1.8rem",
                          fontWeight: 800,
                          color: "#ffffff",
                          lineHeight: 1.2,
                          letterSpacing: "-0.5px",
                          marginBottom: "14px",
                        }}
                      >
                        {feature.title}
                      </YTXTypography>

                      <YTXTypography
                        style={{
                          fontSize: "0.95rem",
                          color: "rgba(255, 255, 255, 0.65)",
                          lineHeight: 1.6,
                          marginBottom: "24px",
                          flex: 1,
                        }}
                      >
                        {feature.description}
                      </YTXTypography>

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "12px",
                        }}
                      >
                        {feature.metrics.map((metric, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              paddingBottom: "12px",
                              borderBottom:
                                i < feature.metrics.length - 1
                                  ? "1px solid rgba(255, 255, 255, 0.06)"
                                  : "none",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "0.85rem",
                                color: "rgba(255, 255, 255, 0.5)",
                                fontWeight: 500,
                              }}
                            >
                              {metric.label}
                            </span>
                            <span
                              style={{
                                fontSize: "0.9rem",
                                color: "#ffffff",
                                fontWeight: 700,
                                letterSpacing: "0.3px",
                              }}
                            >
                              {metric.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          bottom: 0,
                          right: 0,
                          width: "150px",
                          height: "150px",
                          background:
                            "radial-gradient(circle at bottom right, rgba(0, 245, 255, 0.06) 0%, transparent 70%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </YTXCard>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Bars - Instagram Story Style */}
      {/* Progress Bars - Instagram Story Style */}
      {showProgressBars && (
        <div
          style={{
            position: "fixed",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            width: "260px",
            zIndex: 999,
            pointerEvents: "auto",
          }}
        >
          {featureItems.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (index !== currentIndex) {
                  setCurrentIndex(index);
                }
              }}
              style={{
                flex: 1,
                height: "4px",
                borderRadius: "2px",
                background:
                  index === currentIndex
                    ? "linear-gradient(90deg, #00f5ff 0%, #0099ff 100%)"
                    : index < currentIndex
                    ? "rgba(0, 245, 255, 0.5)"
                    : "rgba(255,255,255,0.15)",
                border: "none",
                transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
                boxShadow:
                  index === currentIndex
                    ? "0 0 12px rgba(0,245,255,0.6)"
                    : "none",
                cursor: "pointer",
                padding: 0,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {index === currentIndex && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(255,255,255,0.3)",
                    animation: "shimmer 1.5s infinite",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Bottom CTA | DO NOT REMOVE THIS BLOCK */}
      {/*       <div
        style={{
          padding: "0 24px 40px",
          zIndex: 5,
          opacity: currentIndex === featurePairs.length - 1 ? 1 : 0,
          transition: "opacity 0.5s ease",
          flexShrink: 0,
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              padding: "40px 36px",
              borderRadius: "24px",
              background:
                "linear-gradient(135deg, rgba(0, 245, 255, 0.06) 0%, rgba(0, 153, 255, 0.06) 100%)",
              border: "1px solid rgba(0, 245, 255, 0.15)",
              backdropFilter: "blur(20px)",
              textAlign: "center",
            }}
          >
            <YTXTypography
              style={{
                fontSize: "1.6rem",
                fontWeight: 800,
                color: "#ffffff",
                marginBottom: "10px",
                letterSpacing: "-0.5px",
              }}
            >
              See these capabilities in action
            </YTXTypography>

            <YTXTypography
              style={{
                fontSize: "0.95rem",
                color: "rgba(255, 255, 255, 0.6)",
                marginBottom: "24px",
              }}
            >
              Book a personalized demo with our solutions team
            </YTXTypography>

            <button
              style={{
                padding: "13px 32px",
                fontSize: "0.9rem",
                fontWeight: 700,
                borderRadius: "12px",
                background: "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)",
                border: "none",
                color: "#0a0a0f",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-2px)";
                e.target.style.boxShadow = "0 12px 40px rgba(0, 245, 255, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Schedule Demo →
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default FeaturesPremium;
