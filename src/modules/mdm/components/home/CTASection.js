import { useEffect, useState } from "react";
import GSAPFillButton from "../GSAPButton";
import YTXTypography from "../YTXTypography";
import useIsMobile from "../../hooks/useIsMobile";

export const CTASection = () => {
  const isMobile = useIsMobile();

  return (
    <div
      className="cta-section"
      style={{
        padding: isMobile ? "140px 24px" : "250px 24px",
        position: "relative",
        scrollSnapAlign: "start",
        height: "100vh",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <div
          className="cta-box"
          style={{
            textAlign: "center",
            padding: "80px 40px",
            borderRadius: "32px",
            background:
              "linear-gradient(135deg, rgba(0, 245, 255, 0.12) 0%, rgba(0, 153, 255, 0.12) 100%)",
            border: "1px solid rgba(0, 245, 255, 0.3)",
            backdropFilter: "blur(30px)",
            boxShadow: "0 30px 90px rgba(0, 245, 255, 0.15)",
          }}
        >
          <YTXTypography
            style={{
              fontSize: "3rem",
              fontWeight: 900,
              marginBottom: "24px",
              color: "#fff",
              letterSpacing: "-1px",
              display: "block",
            }}
          >
            Ready to Scale Your Fleet?
          </YTXTypography>
          <YTXTypography
            style={{
              fontSize: "1.2rem",
              color: "rgba(255, 255, 255, 0.7)",
              marginBottom: "48px",
              lineHeight: 1.7,
              display: "block",
            }}
          >
            Start your 30-day free trial—no credit card required.
            <br />
            Full feature access. Cancel anytime.
          </YTXTypography>
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <GSAPFillButton variant="primary">
              <YTXTypography>Start Free Trial</YTXTypography>
            </GSAPFillButton>
            <GSAPFillButton variant="secondary">
              <YTXTypography>Schedule Demo</YTXTypography>
            </GSAPFillButton>
          </div>
        </div>
      </div>
    </div>
  );
};
