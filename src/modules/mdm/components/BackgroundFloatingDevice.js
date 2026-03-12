"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundFloatingDevice({ parentScrollerRef }) {
  const deviceRef = useRef(null);
  const orbRef = useRef(null);

  useEffect(() => {
    const scroller = parentScrollerRef?.current;
    const device = deviceRef.current;
    const orb = orbRef.current;
    if (!scroller || !device || !orb) return;

    // ==================== INITIAL SETUP ====================
    // Device starts visible, orb hidden
    // ==================== INITIAL SETUP ====================
    // Start EXACTLY where hero device is
    gsap.set(device, {
      opacity: 0,
      scale: 0.54,
      x: window.innerWidth > 768 ? 420 : 0, // Center on mobile
      y: -80,
      rotation: 0,
      transformOrigin: "center center",
    });
    gsap.set(orb, {
      opacity: 0,
      scale: 0,
      x: 420,
      y: -80,
    }); // ==================== HERO SECTION: DEVICE VISIBLE ====================
    // ==================== HERO: SYNC WITH HERO DEVICE FADE ====================
    // Start appearing as hero device fades out
    gsap.to(device, {
      opacity: 0.7, // Become visible
      scale: 0.24, // Shrink to floating size
      y: 0,
      x: 210, // Move toward center
      rotation: -5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        scroller,
      },
    });
    // ==================== STATS SECTION: DEVICE FLOATS DOWN ====================
    gsap.to(device, {
      y: 150, // Continue downward
      x: 140,
      rotation: 3,
      scale: 0.18,
      opacity: 0.5,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".stats-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        scroller,
      },
    });

    // ==================== FEATURES SECTION: DEVICE CONTINUES ====================
    gsap.to(device, {
      y: 280, // Keep moving down
      x: 100,
      rotation: -2,
      scale: 0.14,
      opacity: 0.3,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".features-section",
        start: "top bottom",
        end: "center center",
        scrub: 1,
        scroller,
      },
    });

    // ==================== DEVICE → ORB TRANSFORMATION ====================
    // Device shrinks out
    gsap.to(device, {
      opacity: 0,
      scale: 0.02,
      rotation: 180,
      y: 320,
      x: 80,
      ease: "power2.in",
      scrollTrigger: {
        trigger: ".features-section",
        start: "center center",
        end: "bottom 50%",
        scrub: 1.2,
        scroller,
      },
    });

    // Orb fades in at SAME SPOT
    gsap.fromTo(
      orb,
      {
        opacity: 0,
        scale: 0,
        x: 80,
        y: 320,
      },
      {
        opacity: 1,
        scale: 1.5, // Bigger starting size
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".features-section",
          start: "center center",
          end: "bottom 50%",
          scrub: 1.2,
          scroller,
        },
      }
    );

    // ==================== LIFECYCLE: ORB TRAVELS DOWN VISIBLY ====================
    gsap.to(orb, {
      y: 500, // Travel far down
      x: 40,
      scale: 1.8,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".lifecycle-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        scroller,
      },
    });

    // ==================== DEVICE-ZOOM: ORB CENTERS & GROWS ====================
    gsap.to(orb, {
      x: 0, // Center horizontally
      y: -50, // Move up to center of viewport
      scale: 3, // Grow large
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".device-zoom-section",
        start: "top bottom",
        end: "top 30%",
        scrub: 1,
        scroller,
      },
    });

    // ==================== ORB EXPLODES ====================
    gsap.to(orb, {
      scale: 5,
      opacity: 0,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".device-zoom-section",
        start: "top 30%",
        end: "top 15%",
        scrub: 0.8,
        scroller,
      },
    });

    // ==================== DEVICE EMERGES BIG ====================
    // ==================== DEVICE EMERGES - MATCH HERO SIZE ====================
    gsap.fromTo(
      device,
      {
        opacity: 0,
        scale: 0.1,
        rotation: 0,
        x: 0,
        y: -50,
      },
      {
        opacity: 1,
        scale: 0.54, // MATCH HERO DEVICE SIZE
        x: 0, // Center horizontally
        y: -80, // Position similar to hero device
        ease: "back.out(2.5)",
        scrollTrigger: {
          trigger: ".device-zoom-section",
          start: "top 25%",
          end: "top 10%",
          scrub: 1,
          scroller,
        },
      }
    );

    // ==================== HOLD POSITION IN DEVICE-ZOOM ====================
    gsap.to(device, {
      scale: 0.54, // Maintain hero device size
      y: -80,
      x: 0,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".device-zoom-section",
        start: "top 10%",
        end: "center center",
        scrub: 0.5,
      },
    });
    // ==================== IDLE FLOAT ====================
    const idleTween = gsap.to(device, {
      y: "+=30",
      rotation: "+=4",
      duration: 4.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: ".device-zoom-section",
      start: "top 15%",
      end: "bottom 60%",
      scroller,
      onEnter: () => idleTween.play(),
      onLeave: () => idleTween.pause(),
      onEnterBack: () => idleTween.play(),
      onLeaveBack: () => idleTween.pause(),
    });

    // ==================== FADE OUT ====================
    gsap.to(device, {
      opacity: 0,
      scale: 0.7,
      y: -250,
      x: -180,
      rotation: -35,
      ease: "power2.in",
      scrollTrigger: {
        trigger: ".device-zoom-section",
        start: "bottom 70%",
        end: "bottom top",
        scrub: 0.8,
        scroller,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.scroller === scroller) {
          trigger.kill();
        }
      });
      idleTween?.kill();
    };
  }, [parentScrollerRef]);

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        zIndex: 2, // CRITICAL: Behind content (particles are zIndex 1, content is 20+)
        mixBlendMode: "lighten",
        willChange: "transform, opacity",
      }}
    >
      {/* ==================== GLOWING ORB ==================== */}
      <div
        ref={orbRef}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: "150px", // Increased from 120px
          height: "150px",
          pointerEvents: "none",
        }}
      >
        {/* Core glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle, rgba(0, 245, 255, 0.95) 0%, rgba(0, 153, 255, 0.7) 30%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(25px)",
            animation: "orbPulse 2s ease-in-out infinite",
          }}
        />

        {/* Outer glow layers */}
        <div
          style={{
            position: "absolute",
            inset: "-50px",
            background:
              "radial-gradient(circle, rgba(0, 245, 255, 0.5) 0%, rgba(0, 153, 255, 0.3) 40%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(50px)",
            animation: "orbPulse 2s ease-in-out infinite 0.3s",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: "-100px",
            background:
              "radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, transparent 60%)",
            borderRadius: "50%",
            filter: "blur(80px)",
            animation: "orbPulse 2s ease-in-out infinite 0.6s",
          }}
        />

        {/* Particle ring */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "8px",
              height: "8px",
              background: "rgba(0, 245, 255, 0.9)",
              borderRadius: "50%",
              boxShadow: "0 0 15px rgba(0, 245, 255, 0.9)",
              transform: `translate(-50%, -50%) rotate(${
                i * 22.5
              }deg) translateY(-70px)`,
              animation: `orbitParticle 3s ease-in-out infinite ${i * 0.08}s`,
            }}
          />
        ))}
      </div>

      {/* ==================== DEVICE MOCKUP ==================== */}
      <div
        ref={deviceRef}
        style={{
          position: "relative",
          width: "280px",
          height: "520px",
        }}
      >
        {/* Enhanced glow */}
        <div
          style={{
            position: "absolute",
            inset: "-80px",
            background:
              "radial-gradient(circle, rgba(0, 245, 255, 0.3) 0%, rgba(0, 153, 255, 0.18) 50%, transparent 70%)",
            filter: "blur(100px)",
            animation: "gentlePulse 4s ease-in-out infinite",
          }}
        />

        {/* Device frame */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: "32px",
            background:
              "linear-gradient(135deg, rgba(255, 255, 255, 0.16) 0%, rgba(255, 255, 255, 0.05) 100%)",
            border: "2px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(30px)",
            boxShadow:
              "0 50px 150px rgba(0, 245, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
            padding: "14px",
          }}
        >
          {/* Screen content */}
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "24px",
              background: "rgba(0, 245, 255, 0.12)",
              border: "1px solid rgba(0, 245, 255, 0.35)",
              backdropFilter: "blur(20px)",
              boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes gentlePulse {
          0%,
          100% {
            opacity: 0.7;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.08);
          }
        }

        @keyframes orbPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.75;
            transform: scale(1.2);
          }
        }

        @keyframes orbitParticle {
          0%,
          100% {
            transform: translate(-50%, -50%) rotate(0deg) translateY(-70px)
              scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) rotate(180deg) translateY(-90px)
              scale(1.4);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}
