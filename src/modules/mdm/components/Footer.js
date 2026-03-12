// "use client";

// import {
//   Box,
//   Container,
//   Divider,
//   Grid,
//   IconButton,
//   Link,
//   Stack,
//   TextField,
//   Button,
//   styled,
// } from "@mui/material";
// import {
//   Phone as PhoneIcon,
//   Email as EmailIcon,
//   LocationOn as LocationOnIcon,
//   LinkedIn as LinkedInIcon,
//   YouTube as YouTubeIcon,
//   Twitter as TwitterIcon,
//   Instagram as InstagramIcon,
// } from "@mui/icons-material";
// import YTXTypography from "./YTXTypography"; // keep your custom typography

// // ──────────────────────────────────────────────────────────────
// //  STYLED COMPONENTS – colours updated to match the header
// // ──────────────────────────────────────────────────────────────
// const FooterRoot = styled(Box)(({ theme }) => ({
//   background:
//     "radial-gradient(circle at 50% 0%, rgba(0,245,255,0.25) 30%, rgba(10, 10, 15, 0.9) 70%)",
//   color: "#fff",
//   position: "relative",
//   overflow: "hidden",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     height: "1px",
//   },
// }));
// //rgba(10, 10, 15, 0.9)
// const FooterSection = styled(Box)(({ theme }) => ({
//   paddingTop: "60px",
//   paddingBottom: "40px",
// }));

// const SectionTitle = styled(YTXTypography)(({ theme }) => ({
//   fontSize: "1.1rem",
//   fontWeight: 700,
//   marginBottom: "24px",
//   color: "#00F5FF",
//   letterSpacing: "0.5px",
//   position: "relative",
//   paddingBottom: "12px",
//   "&::after": {
//     content: '""',
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     width: "40px",
//     height: "3px",
//     background: "linear-gradient(90deg, #00F5FF, #0099FF)",
//     borderRadius: "2px",
//   },
// }));

// const FooterLink = styled(YTXTypography)(({ theme }) => ({
//   variant: "body2",
//   component: "a",
//   href: "#",
//   color: "rgba(255,255,255,0.9)",
//   textDecoration: "none",
//   fontSize: "0.95rem",
//   display: "block",
//   marginBottom: "12px",
//   transition: "all 0.3s ease",
//   cursor: "pointer",
//   position: "relative",
//   paddingLeft: "0",
//   "&:hover": {
//     color: "#00F5FF",
//     paddingLeft: "8px",
//     "&::before": {
//       opacity: 1,
//       width: "4px",
//     },
//   },
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     left: 0,
//     top: "50%",
//     transform: "translateY(-50%)",
//     width: 0,
//     height: "60%",
//     background: "linear-gradient(180deg, #00F5FF, #0099FF)",
//     borderRadius: "2px",
//     opacity: 0,
//     transition: "all 0.3s ease",
//   },
// }));

// const CompanyInfo = styled(Box)(({ theme }) => ({
//   marginBottom: "32px",
// }));

// const Logo = styled(YTXTypography)(({ theme }) => ({
//   fontWeight: 800,
//   fontSize: "1.8rem",
//   letterSpacing: "-0.5px",
//   display: "flex",
//   alignItems: "center",
//   background: "linear-gradient(135deg, #00F5FF 0%, #0099FF 100%)",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   backgroundClip: "text",
//   marginBottom: "16px",
// }));

// const LogoIcon = styled(Box)(({ theme }) => ({
//   width: 50,
//   height: 50,
//   marginRight: 12,
//   borderRadius: 12,
//   background: "linear-gradient(135deg, #00F5FF 0%, #0099FF 100%)",
//   boxShadow: "0 8px 24px rgba(0,245,255,0.3)",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   position: "relative",
//   overflow: "hidden",
//   "&::before": {
//     content: '""',
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background:
//       "linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 100%)",
//   },
// }));

// const ContactItem = styled(Box)(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   marginBottom: "16px",
//   color: "rgba(255,255,255,0.85)",
//   fontSize: "0.95rem",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     color: "#00F5FF",
//     transform: "translateX(4px)",
//   },
//   "& svg": {
//     marginRight: "12px",
//     color: "#00F5FF",
//     fontSize: "1.3rem",
//   },
// }));

// const SocialIcon = styled(IconButton)(({ theme }) => ({
//   color: "rgba(255,255,255,0.9)",
//   border: "1px solid rgba(0,245,255,0.3)",
//   padding: "10px",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     color: "#00F5FF",
//     borderColor: "#00F5FF",
//     background: "rgba(0,245,255,0.12)",
//     transform: "translateY(-4px)",
//     boxShadow: "0 8px 16px rgba(0,245,255,0.3)",
//   },
// }));

// const NewsletterBox = styled(Box)(({ theme }) => ({
//   background:
//     "linear-gradient(135deg, rgba(0,245,255,0.08) 0%, rgba(0,153,255,0.04) 100%)",
//   padding: "28px",
//   borderRadius: "16px",
//   border: "1px solid rgba(0,245,255,0.2)",
//   backdropFilter: "blur(10px)",
// }));

// const BottomBar = styled(Box)(({ theme }) => ({
//   borderTop: "1px solid rgba(0,245,255,0.15)",
//   paddingTop: "24px",
//   paddingBottom: "24px",
//   marginTop: "40px",
// }));

// const BottomLink = styled(Link)(({ theme }) => ({
//   color: "rgba(255,255,255,0.7)",
//   textDecoration: "none",
//   fontSize: "0.9rem",
//   marginLeft: "20px",
//   transition: "color 0.3s ease",
//   "&:hover": {
//     color: "#00F5FF",
//   },
// }));

// const StyledTextField = styled(TextField)(({ theme }) => ({
//   "& .MuiOutlinedInput-root": {
//     color: "#fff",
//     background: "rgba(255,255,255,0.05)",
//     borderRadius: "10px",
//     "& fieldset": {
//       borderColor: "rgba(0,245,255,0.3)",
//     },
//     "&:hover fieldset": {
//       borderColor: "rgba(0,245,255,0.5)",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "#00F5FF",
//     },
//   },
//   "& .MuiInputLabel-root": {
//     color: "rgba(255,255,255,0.7)",
//   },
// }));

// const SubscribeButton = styled(Button)(({ theme }) => ({
//   marginTop: "12px",
//   borderRadius: "10px",
//   padding: "12px 28px",
//   textTransform: "none",
//   fontWeight: 700,
//   background: "linear-gradient(135deg, #00F5FF 0%, #0099FF 100%)",
//   color: "#0f172a",
//   boxShadow: "0 4px 16px rgba(0,245,255,0.35)",
//   transition: "all 0.3s ease",
//   "&:hover": {
//     background: "linear-gradient(135deg, #0099FF 0%, #00F5FF 100%)",
//     transform: "translateY(-2px)",
//     boxShadow: "0 8px 24px rgba(0,245,255,0.5)",
//   },
// }));

// const TrustBadge = styled(Box)(({ theme }) => ({
//   display: "inline-flex",
//   alignItems: "center",
//   padding: "8px 16px",
//   background: "rgba(0,245,255,0.1)",
//   borderRadius: "8px",
//   border: "1px solid rgba(0,245,255,0.2)",
//   marginRight: "12px",
//   marginBottom: "12px",
//   fontSize: "0.85rem",
//   color: "rgba(255,255,255,0.9)",
// }));

// // ──────────────────────────────────────────────────────────────
// //  MAIN FOOTER COMPONENT
// // ──────────────────────────────────────────────────────────────
// export default function Footer() {
//   return (
//     <FooterRoot>
//       <Container maxWidth="xl">
//         <FooterSection>
//           <Grid
//             container
//             spacing={{ xs: 4, md: 6 }}
//             sx={{ px: { xs: 3, lg: 12 } }}
//           >
//             {/* LEFT: Company Info */}
//             <Grid item xs={12} lg={5} sx={{ justifyContent: "start" }}>
//               <CompanyInfo>
//                 <Logo variant="h6">
//                   {/* <LogoIcon>
//                       <Box
//                         sx={{
//                           width: 24,
//                           height: 24,
//                           background: "#fff",
//                           borderRadius: "5px",
//                           opacity: 0.9,
//                         }}
//                       />
//                     </LogoIcon> */}
//                   Yantrix MDM
//                 </Logo>

//                 <YTXTypography
//                   // variant="body2"
//                   sx={{
//                     color: "rgba(255,255,255,0.75)",
//                     mb: 3,
//                     maxWidth: 350,
//                     textAlign: "start",
//                   }}
//                 >
//                   The next-generation unified device management platform
//                   purpose-built for Android, iOS, and Linux devices. We empower
//                   businesses to deploy, manage, and secure their device fleets
//                   at scale with unmatched precision and control.
//                 </YTXTypography>

//                 <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
//                   <TrustBadge>
//                     <YTXTypography>SOC 2 Certified</YTXTypography>
//                   </TrustBadge>
//                   <TrustBadge>
//                     <YTXTypography>ISO 27001</YTXTypography>
//                   </TrustBadge>
//                   <TrustBadge>
//                     <YTXTypography>PCI DSS</YTXTypography>
//                   </TrustBadge>
//                 </Box>
//               </CompanyInfo>
//             </Grid>

//             {/* RIGHT: 4 COLUMNS */}
//             <Grid item xs={12} lg={7}>
//               <Grid
//                 container
//                 spacing={{ xs: 3, md: 10 }}
//                 sx={{
//                   flexWrap: { xs: "wrap", lg: "nowrap" },
//                   "& > .MuiGrid-item": {
//                     minWidth: 0,
//                     flex: { lg: "1 1 0" },
//                   },
//                 }}
//               >
//                 {/* Products */}
//                 <Grid item xs={6} md={3} sx={{ textAlign: "start" }}>
//                   <SectionTitle>Products</SectionTitle>
//                   <FooterLink href="/products/device-management">
//                     Device Management
//                   </FooterLink>
//                   <FooterLink href="/products/os-management">
//                     OS Management
//                   </FooterLink>
//                   <FooterLink href="/products/device-enrollment">
//                     Device Enrollment
//                   </FooterLink>
//                   <FooterLink href="/products/update-management">
//                     Update Management
//                   </FooterLink>
//                   <FooterLink href="/products/app-management">
//                     Applications
//                   </FooterLink>
//                   <FooterLink href="/products/integrations">
//                     Integrations
//                   </FooterLink>
//                   <FooterLink href="/products/enterprise-android">
//                     Enterprise Android
//                   </FooterLink>
//                   <FooterLink href="/products/enterprise-browser">
//                     Enterprise Browser
//                   </FooterLink>
//                 </Grid>

//                 {/* Solutions */}
//                 <Grid item xs={6} md={3} sx={{ textAlign: "start" }}>
//                   <SectionTitle>Solutions</SectionTitle>
//                   <FooterLink href="/solutions/retail">Retail & POS</FooterLink>
//                   <FooterLink href="/solutions/healthcare">
//                     Healthcare
//                   </FooterLink>
//                   <FooterLink href="/solutions/logistics">Logistics</FooterLink>
//                   <FooterLink href="/solutions/manufacturing">
//                     Manufacturing
//                   </FooterLink>
//                   <FooterLink href="/solutions/hospitality">
//                     Hospitality
//                   </FooterLink>
//                   <FooterLink href="/solutions/education">Education</FooterLink>
//                   <FooterLink href="/solutions/field-services">
//                     Field Services
//                   </FooterLink>
//                   <FooterLink href="/solutions/kiosk">
//                     Kiosk Management
//                   </FooterLink>
//                 </Grid>

//                 {/* Company & Resources */}
//                 <Grid item xs={6} md={3} sx={{ textAlign: "start" }}>
//                   <SectionTitle>Company</SectionTitle>
//                   <FooterLink href="/company/about">About Us</FooterLink>
//                   <FooterLink href="/company/careers">Careers</FooterLink>
//                   <FooterLink href="/company/press">Press & Media</FooterLink>
//                   <FooterLink href="/partners">Partners</FooterLink>
//                   <FooterLink href="/contact">Contact Sales</FooterLink>

//                   <SectionTitle sx={{ mt: { xs: 3, md: 4 } }}>
//                     Resources
//                   </SectionTitle>
//                   <FooterLink href="/resources/blog">Blog</FooterLink>
//                   <FooterLink href="/resources/case-studies">
//                     Case Studies
//                   </FooterLink>
//                   <FooterLink href="/resources/whitepapers">
//                     Whitepapers
//                   </FooterLink>
//                   <FooterLink href="/resources/webinars">Webinars</FooterLink>
//                 </Grid>

//                 {/* Support & Contact */}
//                 <Grid item xs={6} md={3} sx={{ textAlign: "start" }}>
//                   <SectionTitle>Support</SectionTitle>
//                   <FooterLink href="/help/docs">Documentation</FooterLink>
//                   <FooterLink href="/help/api">API Reference</FooterLink>
//                   <FooterLink href="/help/faqs">FAQs</FooterLink>
//                   <FooterLink href="/help/contact">Contact Support</FooterLink>
//                   <FooterLink href="/help/community">
//                     Community Forum
//                   </FooterLink>
//                   <FooterLink href="/help/training">Training Center</FooterLink>
//                   <FooterLink href="/help/status">System Status</FooterLink>
//                   <FooterLink href="/security">Security</FooterLink>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>

//           {/* CONTACT INFO */}
//           <Divider
//             sx={{
//               borderColor: "rgba(0,245,255,0.15)",
//               my: 6,
//               mx: { xs: 3, lg: 12 },
//             }}
//           />
//           <Grid
//             container
//             spacing={{ xs: 4, md: 6 }}
//             sx={{ px: { xs: 3, lg: 12 } }}
//           >
//             <Grid item xs={12} md={4} sx={{ textAlign: "start" }}>
//               <SectionTitle>Get in Touch</SectionTitle>
//               <ContactItem>
//                 <PhoneIcon />
//                 <Box>
//                   <YTXTypography variant="body2" sx={{ fontWeight: 600 }}>
//                     Sales: +1 (555) 123-4567
//                   </YTXTypography>
//                   <YTXTypography variant="caption" sx={{ opacity: 0.7 }}>
//                     Mon-Fri, 9am-6pm EST
//                   </YTXTypography>
//                 </Box>
//               </ContactItem>
//               <ContactItem>
//                 <EmailIcon />
//                 <Box>
//                   <YTXTypography variant="body2">
//                     sales@yantrixmdm.com
//                   </YTXTypography>
//                 </Box>
//               </ContactItem>
//             </Grid>

//             <Grid item xs={12} md={4} sx={{ textAlign: "start" }}>
//               <SectionTitle>Headquarters</SectionTitle>
//               <ContactItem>
//                 <LocationOnIcon />
//                 <Box alignItems="start" justifyContent="start">
//                   <YTXTypography variant="body2">
//                     Aavrti Technology Pvt. Ltd.
//                   </YTXTypography>
//                   <YTXTypography variant="body2" sx={{ opacity: 0.8 }}>
//                     123 Innovation Drive, Suite 500
//                   </YTXTypography>
//                   <YTXTypography variant="body2" sx={{ opacity: 0.8 }}>
//                     Surat, Gujarat 395007, India
//                   </YTXTypography>
//                 </Box>
//               </ContactItem>
//             </Grid>

//             <Grid item xs={12} md={4} sx={{ textAlign: "start" }}>
//               <SectionTitle>Follow Us</SectionTitle>
//               <Stack direction="row" spacing={2}>
//                 <SocialIcon>
//                   <LinkedInIcon />
//                 </SocialIcon>
//                 <SocialIcon>
//                   <YouTubeIcon />
//                 </SocialIcon>
//                 <SocialIcon>
//                   <TwitterIcon />
//                 </SocialIcon>
//                 <SocialIcon>
//                   <InstagramIcon />
//                 </SocialIcon>
//               </Stack>
//               <YTXTypography
//                 variant="body2"
//                 sx={{ color: "rgba(255,255,255,0.7)", mt: 2 }}
//               >
//                 Join 50,000+ IT professionals managing millions of devices
//                 worldwide
//               </YTXTypography>
//             </Grid>
//           </Grid>

//           {/* BOTTOM BAR */}
//           <BottomBar>
//             <Grid
//               container
//               alignItems="center"
//               justifyContent="space-between"
//               spacing={{ xs: 4, md: 6 }}
//               sx={{ px: { xs: 3, lg: 12 } }}
//             >
//               <Grid item xs={12} md={6}>
//                 <YTXTypography
//                   variant="body2"
//                   sx={{ color: "rgba(255,255,255,0.7)" }}
//                 >
//                   © 2025 Aavrti Technology Pvt. Ltd. All Rights Reserved.
//                 </YTXTypography>
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <Box
//                   sx={{
//                     display: "flex",
//                     justifyContent: { xs: "flex-start", md: "flex-end" },
//                     mt: { xs: 2, md: 0 },
//                   }}
//                 >
//                   <BottomLink href="/privacy">Privacy Policy</BottomLink>
//                   <BottomLink href="/terms">Terms of Use</BottomLink>
//                   <BottomLink href="/cookies">Cookie Policy</BottomLink>
//                   <BottomLink href="/gdpr">GDPR</BottomLink>
//                 </Box>
//               </Grid>
//             </Grid>
//           </BottomBar>
//         </FooterSection>
//       </Container>
//     </FooterRoot>
//   );
// }


"use client";

import {
  Box,
  Container,
  Divider,
  Grid,
  IconButton,
  Link,
  Stack,
  TextField,
  Button,
  styled,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
} from "@mui/icons-material";
import YTXTypography from "./YTXTypography";

// ──────────────────────────────────────────────────────────────
//  STYLED COMPONENTS – FIXED Z-INDEX STACKING
// ──────────────────────────────────────────────────────────────
const FooterRoot = styled(Box)(({ theme }) => ({
  background:
    "radial-gradient(circle at 50% 0%, rgba(0,245,255,0.25) 30%, rgba(10, 10, 15, 0.9) 70%)",
  color: "#fff",
  position: "relative",
  overflow: "hidden",
  zIndex: 1, // Lower than header
  isolation: "isolate", // Creates proper stacking context
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "1px",
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  paddingTop: "60px",
  paddingBottom: "40px",
  position: "relative",
  zIndex: 1,
}));

const SectionTitle = styled(YTXTypography)(({ theme }) => ({
  fontSize: "1.1rem",
  fontWeight: 700,
  marginBottom: "24px",
  color: "#00F5FF",
  letterSpacing: "0.5px",
  position: "relative",
  paddingBottom: "12px",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "40px",
    height: "3px",
    background: "linear-gradient(90deg, #00F5FF, #0099FF)",
    borderRadius: "2px",
  },
}));

const FooterLink = styled(YTXTypography)(({ theme }) => ({
  variant: "body2",
  component: "a",
  href: "#",
  color: "rgba(255,255,255,0.9)",
  textDecoration: "none",
  fontSize: "0.95rem",
  display: "block",
  marginBottom: "12px",
  transition: "all 0.3s ease",
  cursor: "pointer",
  position: "relative",
  paddingLeft: "0",
  "&:hover": {
    color: "#00F5FF",
    paddingLeft: "8px",
    "&::before": {
      opacity: 1,
      width: "4px",
    },
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: 0,
    height: "60%",
    background: "linear-gradient(180deg, #00F5FF, #0099FF)",
    borderRadius: "2px",
    opacity: 0,
    transition: "all 0.3s ease",
  },
}));

const CompanyInfo = styled(Box)(({ theme }) => ({
  marginBottom: "32px",
}));

const Logo = styled(YTXTypography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "1.8rem",
  letterSpacing: "-0.5px",
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(135deg, #00F5FF 0%, #0099FF 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
  marginBottom: "16px",
}));

const ContactItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: "16px",
  color: "rgba(255,255,255,0.85)",
  fontSize: "0.95rem",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#00F5FF",
    transform: "translateX(4px)",
  },
  "& svg": {
    marginRight: "12px",
    color: "#00F5FF",
    fontSize: "1.3rem",
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: "rgba(255,255,255,0.9)",
  border: "1px solid rgba(0,245,255,0.3)",
  padding: "10px",
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#00F5FF",
    borderColor: "#00F5FF",
    background: "rgba(0,245,255,0.12)",
    transform: "translateY(-4px)",
    boxShadow: "0 8px 16px rgba(0,245,255,0.3)",
  },
}));

const BottomBar = styled(Box)(({ theme }) => ({
  borderTop: "1px solid rgba(0,245,255,0.15)",
  paddingTop: "24px",
  paddingBottom: "24px",
  marginTop: "40px",
}));

const BottomLink = styled(Link)(({ theme }) => ({
  color: "rgba(255,255,255,0.7)",
  textDecoration: "none",
  fontSize: "0.9rem",
  marginLeft: "20px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#00F5FF",
  },
}));

const TrustBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 16px",
  background: "rgba(0,245,255,0.1)",
  borderRadius: "8px",
  border: "1px solid rgba(0,245,255,0.2)",
  marginRight: "12px",
  marginBottom: "12px",
  fontSize: "0.85rem",
  color: "rgba(255,255,255,0.9)",
}));

// ──────────────────────────────────────────────────────────────
//  MAIN FOOTER COMPONENT
// ──────────────────────────────────────────────────────────────
export default function Footer() {
  return (
    <FooterRoot>
      <Container maxWidth="xl">
        <FooterSection>
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            sx={{
              px: { xs: 3, lg: 12 },
              position: "relative",
              zIndex: 1,
            }}
          >
            {/* LEFT: Company Info */}
            <Grid item xs={12} lg={5} sx={{ justifyContent: "start" }}>
              <CompanyInfo>
                <Logo variant="h6">Yantrix MDM</Logo>

                <YTXTypography
                  sx={{
                    color: "rgba(255,255,255,0.75)",
                    mb: 3,
                    maxWidth: 350,
                    textAlign: "start",
                  }}
                >
                  The next-generation unified device management platform
                  purpose-built for Android, iOS, and Linux devices. We empower
                  businesses to deploy, manage, and secure their device fleets
                  at scale with unmatched precision and control.
                </YTXTypography>

                <Box sx={{ mb: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
                  <TrustBadge>
                    <YTXTypography>SOC 2 Certified</YTXTypography>
                  </TrustBadge>
                  <TrustBadge>
                    <YTXTypography>ISO 27001</YTXTypography>
                  </TrustBadge>
                  <TrustBadge>
                    <YTXTypography>PCI DSS</YTXTypography>
                  </TrustBadge>
                </Box>
              </CompanyInfo>
            </Grid>

            {/* RIGHT: 4 COLUMNS */}
            <Grid item xs={12} lg={7}>
              <Grid
                container
                spacing={{ xs: 3, md: 10 }}
                sx={{
                  flexWrap: { xs: "wrap", lg: "nowrap" },
                  position: "relative",
                  zIndex: 1,
                  "& > .MuiGrid-item": {
                    minWidth: 0,
                    flex: { lg: "1 1 0" },
                    position: "relative",
                  },
                }}
              >
                {/* Products */}
                <Grid item xs={6} md={3} sx={{ textAlign: "start" }}>
                  <SectionTitle>Products</SectionTitle>
                  <FooterLink href="/products/device-management">
                    Device Management
                  </FooterLink>
                  <FooterLink href="/products/os-management">
                    OS Management
                  </FooterLink>
                  <FooterLink href="/products/device-enrollment">
                    Device Enrollment
                  </FooterLink>
                  <FooterLink href="/products/update-management">
                    Update Management
                  </FooterLink>
                  <FooterLink href="/products/app-management">
                    Applications
                  </FooterLink>
                  <FooterLink href="/products/integrations">
                    Integrations
                  </FooterLink>
                  <FooterLink href="/products/enterprise-android">
                    Enterprise Android
                  </FooterLink>
                  <FooterLink href="/products/enterprise-browser">
                    Enterprise Browser
                  </FooterLink>
                </Grid>

                {/* Solutions */}
                <Grid item xs={6} md={3} sx={{ textAlign: "start" }}>
                  <SectionTitle>Solutions</SectionTitle>
                  <FooterLink href="/solutions/retail">Retail & POS</FooterLink>
                  <FooterLink href="/solutions/healthcare">
                    Healthcare
                  </FooterLink>
                  <FooterLink href="/solutions/logistics">Logistics</FooterLink>
                  <FooterLink href="/solutions/manufacturing">
                    Manufacturing
                  </FooterLink>
                  <FooterLink href="/solutions/hospitality">
                    Hospitality
                  </FooterLink>
                  <FooterLink href="/solutions/education">Education</FooterLink>
                  <FooterLink href="/solutions/field-services">
                    Field Services
                  </FooterLink>
                  <FooterLink href="/solutions/kiosk">
                    Kiosk Management
                  </FooterLink>
                </Grid>

                {/* Company & Resources */}
                <Grid item xs={6} md={3} sx={{ textAlign: "start" }}>
                  <SectionTitle>Company</SectionTitle>
                  <FooterLink href="/company/about">About Us</FooterLink>
                  <FooterLink href="/company/careers">Careers</FooterLink>
                  <FooterLink href="/company/press">Press & Media</FooterLink>
                  <FooterLink href="/partners">Partners</FooterLink>
                  <FooterLink href="/contact">Contact Sales</FooterLink>

                  <SectionTitle sx={{ mt: { xs: 3, md: 4 } }}>
                    Resources
                  </SectionTitle>
                  <FooterLink href="/resources/blog">Blog</FooterLink>
                  <FooterLink href="/resources/case-studies">
                    Case Studies
                  </FooterLink>
                  <FooterLink href="/resources/whitepapers">
                    Whitepapers
                  </FooterLink>
                  <FooterLink href="/resources/webinars">Webinars</FooterLink>
                </Grid>

                {/* Support & Contact */}
                <Grid item xs={6} md={3} sx={{ textAlign: "start" }}>
                  <SectionTitle>Support</SectionTitle>
                  <FooterLink href="/help/docs">Documentation</FooterLink>
                  <FooterLink href="/help/api">API Reference</FooterLink>
                  <FooterLink href="/help/faqs">FAQs</FooterLink>
                  <FooterLink href="/help/contact">Contact Support</FooterLink>
                  <FooterLink href="/help/community">
                    Community Forum
                  </FooterLink>
                  <FooterLink href="/help/training">Training Center</FooterLink>
                  <FooterLink href="/help/status">System Status</FooterLink>
                  <FooterLink href="/security">Security</FooterLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* CONTACT INFO */}
          <Divider
            sx={{
              borderColor: "rgba(0,245,255,0.15)",
              my: 6,
              mx: { xs: 3, lg: 12 },
            }}
          />
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            sx={{
              px: { xs: 3, lg: 12 },
              position: "relative",
              zIndex: 1,
            }}
          >
            <Grid item xs={12} md={4} sx={{ textAlign: "start" }}>
              <SectionTitle>Get in Touch</SectionTitle>
              <ContactItem>
                <PhoneIcon />
                <Box>
                  <YTXTypography variant="body2" sx={{ fontWeight: 600 }}>
                    Sales: +1 (555) 123-4567
                  </YTXTypography>
                  <YTXTypography variant="caption" sx={{ opacity: 0.7 }}>
                    Mon-Fri, 9am-6pm EST
                  </YTXTypography>
                </Box>
              </ContactItem>
              <ContactItem>
                <EmailIcon />
                <Box>
                  <YTXTypography variant="body2">
                    sales@yantrixmdm.com
                  </YTXTypography>
                </Box>
              </ContactItem>
            </Grid>

            <Grid item xs={12} md={4} sx={{ textAlign: "start" }}>
              <SectionTitle>Headquarters</SectionTitle>
              <ContactItem>
                <LocationOnIcon />
                <Box alignItems="start" justifyContent="start">
                  <YTXTypography variant="body2">
                    Aavrti Technology Pvt. Ltd.
                  </YTXTypography>
                  <YTXTypography variant="body2" sx={{ opacity: 0.8 }}>
                    123 Innovation Drive, Suite 500
                  </YTXTypography>
                  <YTXTypography variant="body2" sx={{ opacity: 0.8 }}>
                    Surat, Gujarat 395007, India
                  </YTXTypography>
                </Box>
              </ContactItem>
            </Grid>

            <Grid item xs={12} md={4} sx={{ textAlign: "start" }}>
              <SectionTitle>Follow Us</SectionTitle>
              <Stack direction="row" spacing={2}>
                <SocialIcon>
                  <LinkedInIcon />
                </SocialIcon>
                <SocialIcon>
                  <YouTubeIcon />
                </SocialIcon>
                <SocialIcon>
                  <TwitterIcon />
                </SocialIcon>
                <SocialIcon>
                  <InstagramIcon />
                </SocialIcon>
              </Stack>
              <YTXTypography
                variant="body2"
                sx={{ color: "rgba(255,255,255,0.7)", mt: 2 }}
              >
                Join 50,000+ IT professionals managing millions of devices
                worldwide
              </YTXTypography>
            </Grid>
          </Grid>

          {/* BOTTOM BAR */}
          <BottomBar>
            <Grid
              container
              alignItems="center"
              justifyContent="space-between"
              spacing={{ xs: 4, md: 6 }}
              sx={{
                px: { xs: 3, lg: 12 },
                position: "relative",
                zIndex: 1,
              }}
            >
              <Grid item xs={12} md={6}>
                <YTXTypography
                  variant="body2"
                  sx={{ color: "rgba(255,255,255,0.7)" }}
                >
                  © 2025 Aavrti Technology Pvt. Ltd. All Rights Reserved.
                </YTXTypography>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "flex-start", md: "flex-end" },
                    mt: { xs: 2, md: 0 },
                  }}
                >
                  <BottomLink href="/privacy">Privacy Policy</BottomLink>
                  <BottomLink href="/terms">Terms of Use</BottomLink>
                  <BottomLink href="/cookies">Cookie Policy</BottomLink>
                  <BottomLink href="/gdpr">GDPR</BottomLink>
                </Box>
              </Grid>
            </Grid>
          </BottomBar>
        </FooterSection>
      </Container>
    </FooterRoot>
  );
}
