"use client";
import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { gsap } from "gsap";
import YTXTypography from "./YTXTypography";

const clients = [
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  },
  {
    name: 'IBM',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  },
  {
    name: 'Oracle',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg',
  },
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  {
    name: 'Intel',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282006-2020%29.svg',
  },
  {
    name: 'Cisco',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Cisco_logo_blue_2016.svg',
  },
  {
    name: 'Dell',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
  },
  {
    name: 'HP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
  },
  {
    name: 'Lenovo',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg',
  },
  {
    name: 'Sony',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Sony_logo.svg',
  },
  {
    name: 'Adobe',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Adobe_Corporate_logo.svg',
  },
];

const row1 = clients.slice(0, 7);
const row2 = clients.slice(7, 14);
function ClientCard({ client }) {
  return (
    <Box
      sx={{
        width: 150,
        height: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,245,255,0.05)",
        border: "1px solid rgba(0,245,255,0.15)",
        borderRadius: 2,
        flexShrink: 0,
        cursor: "pointer",
        transition: "0.3s",
        "&:hover": {
          background: "rgba(0,245,255,0.12)",
          borderColor: "rgba(0,245,255,0.5)",
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box
        component="img"
        src={client.logo}
        alt={client.name}
        sx={{
          maxWidth: "70%",
          maxHeight: "60%",
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
          opacity: 0.9,
        }}
      />
    </Box>
  );
}
function InfiniteRow({ items, direction }) {
  const doubled = [...items, ...items];
  return (
    <Box sx={{ width: "100%", overflow: "hidden", py: 2 }}>
      <Box
        className="infinite-scroll"
        sx={{
          animationDuration: "20s",
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {doubled.map((item, i) => (
          <Box key={i} sx={{ mx: 2 }}>
            <ClientCard client={item} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
export default function ClientsSection() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  useEffect(() => {
    console.log("Screen size changed → isMobile:", isMobile);
  }, [isMobile]);
  return (
    <Box
      sx={{
        overflow: "hidden",
        background:
          "linear-gradient(180deg, transparent 0%, rgba(0,245,255,0.05) 50%, transparent 100%)",
        py: isMobile ? 16 : 18,
      }}
    >
      <Container maxWidth="xl">
        {/* Title */}
        <Box sx={{ textAlign: "center", mb: 10 }}>
          <YTXTypography
            style={{
              color: "rgba(0,245,255,0.7)",
              letterSpacing: 3,
              fontWeight: 600,
              marginBottom: "12px",
              fontSize: "14px",
              display: "block",
            }}
          >
            TRUSTED BY INDUSTRY LEADERS
          </YTXTypography>
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
            Our Clients
          </YTXTypography>
          <YTXTypography
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Leading enterprises worldwide trust Yantrix for their device
            management solutions.
          </YTXTypography>
        </Box>
        <Box sx={{ gap: "40px", display: "flex", flexDirection: "column" }}>
          <InfiniteRow items={row1} direction="left" />
          <InfiniteRow items={row2} direction="right" />
        </Box>
      </Container>
    </Box>
  );
}
