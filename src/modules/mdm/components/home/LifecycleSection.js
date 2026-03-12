// import { Box } from "lucide-react";
// import YTXCard from "../YTXCard";
// import YTXTypography from "../YTXTypography";
// import Lottie from "lottie-react";
// import { useEffect, useState } from "react";
// import Provision from "@/lottie/fingerprint-provision.json";
// import Monitor from "@/lottie/data-sync.json";
// import Configure from "@/lottie/configure.json";
// import Reset from "@/lottie/wipe-recycle.json";
// import useIsMobile from "@/hooks/useIsMobile";

// export const LifecycleSection = () => {
//   const isMobile = useIsMobile();
//   return (
//     <div
//       className="lifecycle-section"
//       style={{
//         padding: "144px 24px",
//         scrollSnapAlign: "start",
//         background:
//           "linear-gradient(180deg, rgba(0, 245, 255, 0.02) 0%, transparent 100%)",
//       }}
//     >
//       <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
//         <div
//           style={{
//             textAlign: "center",
//             marginBottom: isMobile ? "40px" : "180px",
//           }}
//         >
//           <YTXTypography
//             className="fade-in"
//             style={{
//               fontSize: "clamp(2rem, 5vw, 3.5rem)",
//               fontWeight: 900,
//               color: "#fff",
//               marginBottom: "24px",
//               display: "block",
//             }}
//           >
//             End-to-End Device Lifecycle
//           </YTXTypography>
//           <YTXTypography
//             className="fade-in"
//             style={{
//               color: "rgba(255,255,255,0.65)",
//               fontSize: "clamp(1rem, 2vw, 1.2rem)",
//               maxWidth: "700px",
//               margin: "0 auto",
//               lineHeight: 1.7,
//               display: "block",
//               padding: "0 16px",
//             }}
//           >
//             From onboarding to retirement — Yantrix automates every step.
//           </YTXTypography>
//         </div>

//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//             gap: "clamp(24px, 4vw, 40px)",
//             maxWidth: "1400px",
//           }}
//         >
//           {/* ========== CARD 1: Provision ========== */}
//           <YTXCard>
//             <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
//               <Lottie
//                 animationData={Provision}
//                 loop
//                 autoplay
//                 style={{
//                   width: "clamp(80px, 20vw, 120px)",
//                   height: "clamp(80px, 20vw, 120px)",
//                 }}
//               />
//             </Box>

//             <YTXTypography
//               sx={{
//                 fontWeight: 800,
//                 fontSize: { xs: "1.3rem", md: "1.6rem" },
//                 color: "#fff",
//                 mb: 2,
//                 letterSpacing: "-0.6px",
//                 textAlign: "center",
//               }}
//             >
//               Provision
//             </YTXTypography>

//             <YTXTypography
//               sx={{
//                 color: "rgba(255, 255, 255, 0.78)",
//                 fontSize: { xs: "0.95rem", md: "1.05rem" },
//                 lineHeight: 1.7,
//                 maxWidth: "90%",
//                 mx: "auto",
//                 textAlign: "center",
//               }}
//             >
//               Zero-touch enrollment through QR, NFC, or DEP with auto policy
//               sync.
//             </YTXTypography>
//           </YTXCard>

//           {/* ========== CARD 2: Configure ========== */}
//           <YTXCard>
//             <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
//               <Lottie
//                 animationData={Configure}
//                 loop
//                 autoplay
//                 style={{
//                   width: "clamp(80px, 20vw, 120px)",
//                   height: "clamp(80px, 20vw, 120px)",
//                 }}
//               />
//             </Box>

//             <YTXTypography
//               sx={{
//                 fontWeight: 800,
//                 fontSize: { xs: "1.3rem", md: "1.6rem" },
//                 color: "#fff",
//                 mb: 2,
//                 letterSpacing: "-0.6px",
//                 textAlign: "center",
//               }}
//             >
//               Configure
//             </YTXTypography>

//             <YTXTypography
//               sx={{
//                 color: "rgba(255, 255, 255, 0.78)",
//                 fontSize: { xs: "0.95rem", md: "1.05rem" },
//                 lineHeight: 1.7,
//                 maxWidth: "90%",
//                 mx: "auto",
//                 textAlign: "center",
//               }}
//             >
//               Push Wi-Fi, VPN, app, and restriction profiles instantly to any
//               group.
//             </YTXTypography>
//           </YTXCard>

//           {/* ========== CARD 3: Monitor ========== */}
//           <YTXCard>
//             <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
//               <Lottie
//                 animationData={Monitor}
//                 loop
//                 autoplay
//                 style={{
//                   width: "clamp(80px, 20vw, 120px)",
//                   height: "clamp(80px, 20vw, 120px)",
//                 }}
//               />
//             </Box>

//             <YTXTypography
//               sx={{
//                 fontWeight: 800,
//                 fontSize: { xs: "1.3rem", md: "1.6rem" },
//                 color: "#fff",
//                 mb: 2,
//                 letterSpacing: "-0.6px",
//                 textAlign: "center",
//               }}
//             >
//               Monitor
//             </YTXTypography>

//             <YTXTypography
//               sx={{
//                 color: "rgba(255, 255, 255, 0.78)",
//                 fontSize: { xs: "0.95rem", md: "1.05rem" },
//                 lineHeight: 1.7,
//                 maxWidth: "90%",
//                 mx: "auto",
//                 textAlign: "center",
//               }}
//             >
//               Track location, battery health, app usage, and compliance in
//               real-time.
//             </YTXTypography>
//           </YTXCard>

//           {/* ========== CARD 4: Retire ========== */}
//           <YTXCard>
//             <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
//               <Lottie
//                 animationData={Reset}
//                 loop
//                 autoplay
//                 style={{
//                   width: "clamp(80px, 20vw, 120px)",
//                   height: "clamp(80px, 20vw, 120px)",
//                 }}
//               />
//             </Box>

//             <YTXTypography
//               sx={{
//                 fontWeight: 800,
//                 fontSize: { xs: "1.3rem", md: "1.6rem" },
//                 color: "#fff",
//                 mb: 2,
//                 letterSpacing: "-0.6px",
//                 textAlign: "center",
//               }}
//             >
//               Retire
//             </YTXTypography>

//             <YTXTypography
//               sx={{
//                 color: "rgba(255, 255, 255, 0.78)",
//                 fontSize: { xs: "0.95rem", md: "1.05rem" },
//                 lineHeight: 1.7,
//                 maxWidth: "90%",
//                 mx: "auto",
//                 textAlign: "center",
//               }}
//             >
//               Secure wipe, lockout, or reassignment workflows with audit
//               logging.
//             </YTXTypography>
//           </YTXCard>
//         </div>
//       </div>
//     </div>
//   );
// };

import YTXCard from "../YTXCard";
import YTXTypography from "../YTXTypography";
import Lottie from "lottie-react";
import { useEffect, useState } from "react";
import Provision from "@/modules/mdm/lottie/fingerprint-provision.json";
import Monitor from "@/modules/mdm/lottie/data-sync.json";
import Configure from '@/modules/mdm/lottie/configure.json';
import Reset from '@/modules/mdm/lottie/wipe-recycle.json';
import useIsMobile from '@/modules/mdm/hooks/useIsMobile';

export const LifecycleSection = () => {
  const isMobile = useIsMobile();
  return (
    <div
      className="lifecycle-section"
      style={{
        padding: "144px 24px",
        scrollSnapAlign: "start",
        background:
          "linear-gradient(180deg, rgba(0, 245, 255, 0.02) 0%, transparent 100%)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: isMobile ? "40px" : "80px",
          }}
        >
          <YTXTypography
            className="fade-in"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: "24px",
              display: "block",
            }}
          >
            End-to-End Device Lifecycle
          </YTXTypography>
          <YTXTypography
            className="fade-in"
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              maxWidth: "700px",
              margin: "0 auto",
              lineHeight: 1.7,
              display: "block",
              padding: "0 16px",
            }}
          >
            From onboarding to retirement — Yantrix automates every step.
          </YTXTypography>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "clamp(24px, 4vw, 40px)",
            maxWidth: "1400px",
          }}
        >
          {/* ========== CARD 1: Provision ========== */}
          <YTXCard>
            <div
              style={{
                marginBottom: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "140px",
              }}
            >
              <Lottie
                animationData={Provision}
                loop
                autoplay
                style={{
                  width: "clamp(100px, 22vw, 140px)",
                  height: "clamp(100px, 22vw, 140px)",
                }}
              />
            </div>

            <YTXTypography
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                color: "#fff",
                marginBottom: "16px",
                letterSpacing: "-0.6px",
                textAlign: "center",
              }}
            >
              Provision
            </YTXTypography>

            <YTXTypography
              style={{
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "90%",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              Zero-touch enrollment through QR, NFC, or DEP with auto policy
              sync.
            </YTXTypography>
          </YTXCard>

          {/* ========== CARD 2: Configure ========== */}
          <YTXCard>
            <div
              style={{
                marginBottom: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "140px",
              }}
            >
              <Lottie
                animationData={Configure}
                loop
                autoplay
                style={{
                  width: "clamp(100px, 22vw, 140px)",
                  height: "clamp(100px, 22vw, 140px)",
                }}
              />
            </div>

            <YTXTypography
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                color: "#fff",
                marginBottom: "16px",
                letterSpacing: "-0.6px",
                textAlign: "center",
              }}
            >
              Configure
            </YTXTypography>

            <YTXTypography
              style={{
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "90%",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              Push Wi-Fi, VPN, app, and restriction profiles instantly to any
              group.
            </YTXTypography>
          </YTXCard>

          {/* ========== CARD 3: Monitor ========== */}
          <YTXCard>
            <div
              style={{
                marginBottom: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "140px",
              }}
            >
              <Lottie
                animationData={Monitor}
                loop
                autoplay
                style={{
                  width: "clamp(100px, 22vw, 140px)",
                  height: "clamp(100px, 22vw, 140px)",
                }}
              />
            </div>

            <YTXTypography
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                color: "#fff",
                marginBottom: "16px",
                letterSpacing: "-0.6px",
                textAlign: "center",
              }}
            >
              Monitor
            </YTXTypography>

            <YTXTypography
              style={{
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "90%",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              Track location, battery health, app usage, and compliance in
              real-time.
            </YTXTypography>
          </YTXCard>

          {/* ========== CARD 4: Retire ========== */}
          <YTXCard>
            <div
              style={{
                marginBottom: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "140px",
              }}
            >
              <Lottie
                animationData={Reset}
                loop
                autoplay
                style={{
                  width: "clamp(100px, 22vw, 140px)",
                  height: "clamp(100px, 22vw, 140px)",
                }}
              />
            </div>

            <YTXTypography
              style={{
                fontWeight: 800,
                fontSize: "clamp(1.3rem, 3vw, 1.6rem)",
                color: "#fff",
                marginBottom: "16px",
                letterSpacing: "-0.6px",
                textAlign: "center",
              }}
            >
              Retire
            </YTXTypography>

            <YTXTypography
              style={{
                color: "rgba(255, 255, 255, 0.78)",
                fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                lineHeight: 1.7,
                maxWidth: "90%",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              Secure wipe, lockout, or reassignment workflows with audit
              logging.
            </YTXTypography>
          </YTXCard>
        </div>
      </div>
    </div>
  );
};
