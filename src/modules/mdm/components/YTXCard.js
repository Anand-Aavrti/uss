import { useRef } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// ============================================
// STYLED CARD (DON'T TOUCH - GLOW EFFECT BASE)
// ============================================
const StyledCard = styled(Card)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.06)",
  backdropFilter: "blur(22px)",
  border: "1px solid rgba(255, 255, 255, 0.12)",
  borderRadius: "28px",
  position: "relative",
  overflow: "hidden",
  cursor: "default",
  transition: "transform 0.2s ease-out",
}));

// ============================================
// MAIN COMPONENT - FLEXIBLE CHILDREN
// ============================================
const YTXCard = ({
  children,
  sx = {},
  contentSx = {},
  elevation = 0,
  disableGlow = false,
  ...otherProps
}) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const highlightRef = useRef(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const rafId = useRef(null);

  // ============================================
  // GLOW ANIMATION LOGIC (DON'T TOUCH)
  // ============================================
  const lerp = (start, end, factor) => start + (end - start) * factor;

  const animate = () => {
    const glow = glowRef.current;
    const highlight = highlightRef.current;
    if (!glow || !highlight) return;

    currentX.current = lerp(currentX.current, targetX.current, 0.08);
    currentY.current = lerp(currentY.current, targetY.current, 0.08);

    glow.style.left = `${currentX.current}px`;
    glow.style.top = `${currentY.current}px`;
    highlight.style.left = `${currentX.current}px`;
    highlight.style.top = `${currentY.current}px`;

    rafId.current = requestAnimationFrame(animate);
  };

  const handleMove = (e) => {
    if (disableGlow) return;
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    targetX.current = x;
    targetY.current = y;

    const percentX = (x / rect.width - 0.5) * 2;
    const percentY = (y / rect.height - 0.5) * 2;

    card.style.transform = `rotateX(${percentY * 4}deg) rotateY(${
      percentX * -4
    }deg)`;
  };

  const handleEnter = () => {
    if (disableGlow) return;
    glowRef.current.style.opacity = 1;
    highlightRef.current.style.opacity = 0.35;

    if (!rafId.current) {
      rafId.current = requestAnimationFrame(animate);
    }
  };

  const handleLeave = () => {
    if (disableGlow) return;
    glowRef.current.style.opacity = 0;
    highlightRef.current.style.opacity = 0;
    cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  return (
    <>
      {/* KEYFRAMES (DON'T TOUCH) */}
      <style jsx global>{`
        @keyframes neonFlow {
          0% {
            transform: translate(-50%, -50%) scale(1);
            filter: blur(50px);
            background-position: 0% 50%;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.15);
            filter: blur(65px);
            background-position: 100% 50%;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            filter: blur(50px);
            background-position: 0% 50%;
          }
        }
      `}</style>

      <StyledCard
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        elevation={elevation}
        sx={sx}
        {...otherProps}
      >
        {/* ============================================ */}
        {/* GLOW EFFECTS (DON'T TOUCH) */}
        {/* ============================================ */}
        {!disableGlow && (
          <>
            <Box
              ref={glowRef}
              sx={{
                position: "absolute",
                width: 220,
                height: 220,
                borderRadius: "50%",
                pointerEvents: "none",
                opacity: 0,
                transition: "opacity 0.6s ease-out",
                background:
                  "radial-gradient(circle at center, rgba(0,255,255,0.45), rgba(0,153,255,0.25), rgba(255,0,255,0.15), transparent 65%)",
                backgroundSize: "280% 280%",
                animation: "neonFlow 8s ease-in-out infinite",
                zIndex: 0,
                transform: "translate(-50%, -50%)",
                filter: "blur(55px)",
              }}
            />

            <Box
              ref={highlightRef}
              sx={{
                position: "absolute",
                width: 180,
                height: 180,
                borderRadius: "50%",
                pointerEvents: "none",
                opacity: 0,
                transition: "opacity 0.5s ease-out",
                background:
                  "radial-gradient(circle at center, rgba(255,255,255,0.18), rgba(255,255,255,0.06), transparent 65%)",
                filter: "blur(35px)",
                zIndex: 1,
                transform: "translate(-50%, -50%)",
              }}
            />
          </>
        )}

        {/* ============================================ */}
        {/* CONTENT AREA - YOU CONTROL THIS */}
        {/* ============================================ */}
        <CardContent
          sx={{
            position: "relative",
            zIndex: 3,
            py: 6,
            ...contentSx,
          }}
        >
          {children}
        </CardContent>
      </StyledCard>
    </>
  );
};

export default YTXCard;
