import React from 'react';
import { FaApple, FaWindows } from 'react-icons/fa';
import { IoLogoAndroid } from 'react-icons/io';
import YTXTypography from '../YTXTypography';

const Box = ({ children, sx, style, className }) => (
  <div className={className} style={{ ...style, ...(sx && typeof sx === 'object' ? sx : {}) }}>
    {children}
  </div>
);

const Container = ({ children, maxWidth, style }) => (
  <div
    style={{
      maxWidth: maxWidth === 'xl' ? '1200px' : '1000px',
      margin: '0 auto',
      padding: '0 24px',
      ...style,
    }}
  >
    {children}
  </div>
);

const Grid = ({ children, container, spacing, alignItems, style }) => {
  const gridStyle = container
    ? {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: spacing ? `${spacing * 8}px` : '16px',
        alignItems: alignItems || 'stretch',
        ...style,
      }
    : style;

  return <div style={gridStyle}>{children}</div>;
};

const Stack = ({ children, direction, spacing, alignItems, className }) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: direction === 'row' ? 'row' : 'column',
      gap: spacing ? `${spacing * 8}px` : '16px',
      alignItems: alignItems || 'stretch',
    }}
  >
    {children}
  </div>
);

// ============================================
// PLATFORMS TEXT SECTION COMPONENT
// ============================================
export const PlatformTextSection = ({ isMobile }) => {
  const platforms = [
    {
      icon: <IoLogoAndroid style={{ color: 'greenyellow' }} />,
      text: 'Android Enterprise & Samsung Knox integration',
    },
    {
      icon: <FaApple style={{ color: 'white' }} />,
      text: 'Apple Business Manager & DEP ready',
    },
    {
      icon: <FaWindows style={{ color: 'skyblue' }} />,
      text: 'Windows Autopilot & Intune compatibility',
    },
  ];

  return (
    <div
      className="platforms-section"
      style={{
        minHeight: '100vh',
        padding: isMobile ? '150px 20px' : '170px 20px',
        display: 'flex',
        alignItems: 'center',
        scrollSnapAlign: 'start',
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,245,255,0.02) 100%)',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={10} alignItems="center">
          <div>
            <YTXTypography
              variant="h2"
              className="fade-in"
              sx={{
                fontSize: isMobile ? '2.8rem' : '4rem',
                fontWeight: 900,
                mb: 4,
                color: '#fff',
                letterSpacing: '-1.5px',
                lineHeight: 1.1,
              }}
            >
              One Console.
              <br />
              Every Operating System.
            </YTXTypography>

            <YTXTypography
              className="fade-in"
              sx={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.75)',
                mb: 6,
                lineHeight: 1.9,
                maxWidth: '560px',
              }}
            >
              Whether your organization runs on iPhones, Android tablets, Windows laptops, or all
              three — Yantrix adapts to each platform&apos;s native architecture while maintaining
              centralized oversight.
            </YTXTypography>

            <Stack spacing={3} className="fade-in">
              {platforms.map((item, i) => (
                <Stack key={i} direction="row" spacing={3} alignItems="center">
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '14px',
                      background: 'rgba(0, 245, 255, 0.12)',
                      border: '1px solid rgba(0,245,255,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                    }}
                  >
                    {item.icon}
                  </Box>
                  <YTXTypography
                    sx={{
                      color: '#eee',
                      fontSize: '1.1rem',
                      fontWeight: 500,
                    }}
                  >
                    {item.text}
                  </YTXTypography>
                </Stack>
              ))}
            </Stack>
          </div>

          {/* Empty right side for desktop layout balance */}
          {!isMobile && <div />}
        </Grid>
      </Container>
    </div>
  );
};
