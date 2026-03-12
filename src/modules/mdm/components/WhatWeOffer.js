import React, { useEffect, useRef, useState } from "react";
import { Box, Container, useTheme, useMediaQuery } from "@mui/material";
import YTXTypography from "./YTXTypography";

const FeatureGlowCard = ({
  children,
  radius = 24,
  glowSize = 220,
  highlightSize = 160,
  style = {},
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
    if (highlightRef.current) highlightRef.current.style.opacity = "0.28";
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

  useEffect(() => {
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = null;
    };
  }, []);

  const clip = `inset(0 round ${radius}px)`;

  const enforcedOuterStyle = {
    position: "relative",
    borderRadius: `${radius}px`,
    willChange: "transform",
    transition: "transform 0.18s ease-out",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    minWidth: 0,
    minHeight: 0,
    overflow: "hidden",
    ...style,
  };

  const innerCardStyle = {
    position: "relative",
    borderRadius: `${radius}px`,
    overflow: "hidden",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01))",
    border: "1px solid rgba(255,255,255,0.06)",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div
      ref={outerRef}
      onMouseMove={onMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      style={enforcedOuterStyle}
    >
      <div style={innerCardStyle}>
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
            background:
              "radial-gradient(circle at center, rgba(0,245,255,0.46), rgba(0,170,255,0.24), rgba(180,0,255,0.10), transparent 70%)",
            filter: "blur(40px)",
            transform: "translate(-50%, -50%)",
            zIndex: 0,
            left: "50%",
            top: "50%",
            clipPath: clip,
            WebkitClipPath: clip,
            maskImage: "linear-gradient(#fff, #fff)",
          }}
        />

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
            filter: "blur(26px)",
            transform: "translate(-50%, -50%)",
            zIndex: 1,
            left: "50%",
            top: "50%",
            clipPath: clip,
            WebkitClipPath: clip,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const WhatWeOffer = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const offerings = [
    {
      number: "01",
      title: "Centralized Control",
      image: "/Images/Home/centralControl.png",
      description:
        "Manage all enterprise devices remotely from one dashboard. Push apps, lock settings, and automate configurations without touching the device.",
      icon: (
        <path d="M4 10h16v12H4z M12 2a4 4 0 1 1 0 8 4 4 0 0 1 0-8z M12 18v6 M8 22h8" />
      ),
    },
    {
      number: "02",
      title: "Real-Time Monitoring",
      image: "/Images/Home/Realtime.png",
      description:
        "Track device health, battery, location, network status, compliance, and usage insights in real time to keep your fleet running smoothly.",
      icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    },
    {
      number: "03",
      title: "App Management",
      image: "/Images/Home/appManagement.png",
      description:
        "Deploy apps, roll out updates, manage internal APKs, and control app versions across all devices instantly.",
      icon: <path d="M4 16v6h16v-6l-8-4-8 4z M4 8v4h16V8l-8-4-8 4z" />,
    },
    {
      number: "04",
      title: "Policy Enforcement",
      image: "/Images/Home/policy.png",
      description:
        "Create and enforce custom policies for kiosk mode, restrictions, Wi-Fi profiles, password rules, and network limits.",
      icon: (
        <path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" />
      ),
    },
    {
      number: "05",
      title: "OTA Updates",
      image: "/Images/Home/updatets.png",
      description:
        "Push OS-level updates, security patches, and application updates instantly without interrupting workflows.",
      icon: <path d="M21 12v-2a9 9 0 0 0-18 0v2 M12 12v6" />,
    },
    {
      number: "06",
      title: "Remote Actions",
      image: "/Images/Home/remoteAction.png",
      description:
        "Perform critical remote actions like lock, wipe, reboot, clear data, and send commands to troubleshoot devices.",
      icon: (
        <path d="M18 8h1a4 4 0 0 1 0 8h-1 M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
      ),
    },
    {
      number: "07",
      title: "Multi-Tenant Arch",
      image: "/Images/Home/multitenant.png",
      description:
        "Built for enterprises and resellers. Manage multiple organizations, departments, or clients with isolated data roles.",
      icon: (
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M16 3.13a4 4 0 0 1 0 7.75" />
      ),
    },
    {
      number: "08",
      title: "Zero-Touch Deploy",
      image: "/Images/Home/zeroTouch.png",
      description:
        "Enroll devices at scale through QR codes, provisioning, or zero-touch methods—making large rollouts fast and simple.",
      icon: (
        <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
      ),
    },
  ];

  useEffect(() => {
    if (!isDesktop) return;

    let animationFrameId;
    const checkScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionTop = rect.top;
        const trackLength = rect.height - viewportHeight;
        let progress = -sectionTop / trackLength;
        progress = Math.max(0, Math.min(1, progress));
        const newIndex = Math.min(
          offerings.length - 1,
          Math.floor(progress * offerings.length)
        );
        setActiveIndex((prev) => (prev !== newIndex ? newIndex : prev));
      }
      animationFrameId = requestAnimationFrame(checkScroll);
    };
    animationFrameId = requestAnimationFrame(checkScroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [offerings.length, isDesktop]);

  useEffect(() => {
    if (isDesktop) return;

    const scrollContainer = sectionRef.current?.querySelector(
      "[data-offering-scroll]"
    );
    if (!scrollContainer) return;

    let lastScrollY = 0;
    let resetTimeout = null;

    const handleScroll = () => {
      const currentScrollY = scrollContainer.scrollTop;

      const velocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      // const cappedVelocity = Math.min(velocity * 0.2, 5);

      // document.documentElement.style.setProperty(
      //   "--scroll-boost",
      //   cappedVelocity.toString()
      // );

      // if (resetTimeout) clearTimeout(resetTimeout);

      // resetTimeout = setTimeout(() => {
      //   document.documentElement.style.setProperty("--scroll-boost", "0");
      // }, 150);
      const cards = scrollContainer.querySelectorAll(".offering-card");
      const containerRect = scrollContainer.getBoundingClientRect();
      const viewportCenter = containerRect.top + containerRect.height / 2;

      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.top + cardRect.height / 2;
        const distance = Math.abs(viewportCenter - cardCenter);
        const maxDistance = containerRect.height / 2;

        const visibility = Math.max(0, 1 - distance / maxDistance);

        if (visibility > 0.2) {
          card.classList.add("visible");
          card.style.opacity = visibility;
          card.style.transform = `translateY(0) scale(${
            0.95 + visibility * 0.05
          })`;
        } else {
          card.classList.remove("visible");
          card.style.opacity = "0";
          card.style.transform = "translateY(40px) scale(0.95)";
        }
      });
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      if (resetTimeout) clearTimeout(resetTimeout);
    };
  }, [isDesktop]);
  if (!isDesktop) {
    return (
      <Box
        ref={sectionRef}
        sx={{
          minHeight: "100vh",
          height: "100vh",
          scrollSnapAlign: "start",
          position: "relative",
          overflow: "hidden",
          background: "transparent",
          display: "flex",
          flexDirection: "column",
          paddingTop: "120px",
        }}
      >
        {/* FIXED HEADER */}
        <Box
          sx={{
            textAlign: "center",
            padding: "12px 24px 8px",
            flexShrink: 0,
            position: "relative",
            zIndex: 10,
          }}
        >
          <YTXTypography
            className="fade-in"
            style={{
              fontSize: "3.2rem",
              fontWeight: 900,
              color: "#fff",
              marginBottom: "16px",
              display: "block",
            }}
          >
            What We Offer
          </YTXTypography>
          <YTXTypography
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.95rem",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            Explore our comprehensive feature set designed for enterprise device
            management.
          </YTXTypography>
        </Box>

        {/* SCROLLABLE CONTENT */}
        {/* SCROLLABLE CONTENT */}
        <Box
          data-offering-scroll
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            position: "relative",
            padding: "30px 16px 60px",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "rgba(0, 0, 0, 0.2)" },
            "&::-webkit-scrollbar-thumb": {
              background: "linear-gradient(135deg, #00f5ff 0%, #0099ff 100%)",
              borderRadius: "10px",
            },

            scrollSnapType: "none",
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                paddingBottom: "150vh",
              }}
            >
              {offerings.map((item, index) => (
                <Box
                  key={index}
                  className="offering-card"
                  sx={{
                    opacity: 0,
                    transform: "translateY(40px) scale(0.95)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    willChange: "transform, opacity",
                  }}
                >
                  <FeatureGlowCard
                    radius={16}
                    glowSize={180}
                    highlightSize={120}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        gap: 2,
                        p: 2,
                        boxSizing: "border-box",
                      }}
                    >
                      {/* Image */}
                      <Box
                        sx={{
                          width: "100%",
                          height: "180px",
                          borderRadius: "12px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background:
                            "linear-gradient(135deg, rgba(0,245,255,0.06), rgba(0,153,255,0.03))",
                          border: "1px solid rgba(0,245,255,0.08)",
                        }}
                      >
                        {item.image && (
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                            }}
                          />
                        )}
                      </Box>

                      {/* Content */}
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1.5,
                        }}
                      >
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              width: 44,
                              height: 44,
                              background: "rgba(0,245,255,0.06)",
                              borderRadius: "12px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: "#00F5FF",
                              border: "1px solid rgba(0,245,255,0.16)",
                              flexShrink: 0,
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              width="20px"
                              height="20px"
                            >
                              {item.icon}
                            </svg>
                          </Box>
                          <YTXTypography
                            sx={{
                              fontSize: "1.25rem",
                              fontWeight: 800,
                              color: "#fff",
                              lineHeight: 1.2,
                            }}
                          >
                            {item.title}
                          </YTXTypography>
                        </Box>
                        <YTXTypography
                          sx={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "0.95rem",
                            lineHeight: 1.6,
                          }}
                        >
                          {item.description}
                        </YTXTypography>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mt: 1,
                          }}
                        >
                          <YTXTypography
                            sx={{
                              color: "rgba(255,255,255,0.5)",
                              fontSize: "0.85rem",
                              fontWeight: 700,
                            }}
                          >
                            {item.number}
                          </YTXTypography>
                          <Box
                            sx={{
                              fontSize: "0.85rem",
                              fontWeight: 700,
                              textTransform: "uppercase",
                              color: "#00F5FF",
                            }}
                          >
                            Learn more →
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </FeatureGlowCard>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: "100%",
        height: "400vh",
        position: "relative",
        background: "transparent",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ marginBottom: "60px", mt: 10, textAlign: "left" }}>
            <YTXTypography
              sx={{
                fontSize: "3.5rem",
                fontWeight: 900,
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "16px",
              }}
            >
              What We Offer
            </YTXTypography>
            <YTXTypography
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                fontSize: "1.1rem",
                maxWidth: "600px",
              }}
            >
              Scroll down to explore our features.
            </YTXTypography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "80px",
              alignItems: "center",
              height: "500px",
            }}
          >
            {/* LEFT MENU */}
            <Box
              sx={{
                flex: "0 0 350px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
                borderLeft: "2px solid rgba(255,255,255,0.05)",
                paddingLeft: "24px",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: "-2px",
                  top: 0,
                  width: "2px",
                  height: `${100 / offerings.length}%`,
                  background: "#00F5FF",
                  boxShadow: "0 0 15px #00F5FF",
                  transition: "transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                  transform: `translateY(${activeIndex * 100}%)`,
                }}
              />
              {offerings.map((item, index) => {
                const isActive = activeIndex === index;
                return (
                  <Box
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    sx={{
                      padding: "16px 0",
                      transition: "all 0.3s ease",
                      opacity: isActive ? 1 : 0.35,
                      transform: isActive
                        ? "translateX(10px)"
                        : "translateX(0)",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <YTXTypography
                        sx={{
                          color: isActive ? "#00F5FF" : "transparent",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                          width: "20px",
                          WebkitTextStroke: isActive
                            ? "0px"
                            : "1px rgba(255,255,255,0.3)",
                        }}
                      >
                        {item.number}
                      </YTXTypography>
                      <YTXTypography
                        sx={{
                          color: "#fff",
                          fontWeight: isActive ? 700 : 500,
                          fontSize: isActive ? "1.25rem" : "1.1rem",
                          transition: "all 0.3s ease",
                        }}
                      >
                        {item.title}
                      </YTXTypography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            {/* RIGHT CARD DISPLAY */}
            <Box
              sx={{
                flex: 1,
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ width: 920, height: 520, position: "relative" }}>
                {offerings.map((item, index) => {
                  const isActive = activeIndex === index;
                  return (
                    <Box
                      key={index}
                      sx={{
                        position: "absolute",
                        inset: 0,
                        display: isActive ? "block" : "none",
                        transition: "opacity 0.5s",
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      <FeatureGlowCard
                        radius={24}
                        glowSize={240}
                        highlightSize={160}
                        style={{ width: "100%", height: "100%" }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            width: "100%",
                            height: "100%",
                            gap: 4,
                            p: 3,
                            boxSizing: "border-box",
                          }}
                        >
                          {/* Left: image */}
                          <Box
                            sx={{
                              flexBasis: "48%",
                              flexShrink: 0,
                              height: "100%",
                              borderRadius: "12px",
                              overflow: "hidden",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              background:
                                "linear-gradient(135deg, rgba(0,245,255,0.06), rgba(0,153,255,0.03))",
                              border: "1px solid rgba(0,245,255,0.08)",
                            }}
                          >
                            {item.image && (
                              <Box
                                component="img"
                                src={item.image}
                                alt={item.title}
                                sx={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "contain",
                                }}
                              />
                            )}
                          </Box>

                          {/* Right: content */}
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between",
                              height: "100%",
                            }}
                          >
                            <Box>
                              <Box
                                sx={{
                                  display: "flex",
                                  gap: 2,
                                  alignItems: "center",
                                  mb: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: 80,
                                    height: 56,
                                    background: "rgba(0,245,255,0.06)",
                                    borderRadius: "12px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#00F5FF",
                                    border: "1px solid rgba(0,245,255,0.16)",
                                  }}
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    width="24px"
                                    height="24px"
                                  >
                                    {item.icon}
                                  </svg>
                                </Box>
                                <Box>
                                  <YTXTypography
                                    sx={{
                                      fontSize: "1.35rem",
                                      fontWeight: 800,
                                      color: "#fff",
                                      lineHeight: 1.15,
                                    }}
                                  >
                                    {item.title}
                                  </YTXTypography>
                                  <YTXTypography
                                    sx={{
                                      color: "rgba(255,255,255,0.65)",
                                      fontSize: "0.98rem",
                                      mt: 0.5,
                                    }}
                                  >
                                    {item.description}
                                  </YTXTypography>
                                </Box>
                              </Box>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                              }}
                            >
                              <YTXTypography
                                sx={{
                                  color: "rgba(255,255,255,0.65)",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {item.number}
                              </YTXTypography>
                              <Box sx={{ flex: 1 }} />
                              <Box
                                sx={{
                                  fontSize: "0.9rem",
                                  fontWeight: 700,
                                  textTransform: "uppercase",
                                  color: "#00F5FF",
                                }}
                              >
                                Learn more →
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </FeatureGlowCard>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default WhatWeOffer;
