// app/(docs)/cli/page.js
'use client';
import {
  Box,
  Button,
  Divider,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  Fade,
  Stack,
  Tooltip,
  Snackbar,
  Alert,
  IconButton,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import YTXTypography from '../../../../../../../modules/mdm/components/YTXTypography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import CodeBox from '../../../../../../../modules/mdm/components/CodeBox';

const allCommands = [
  // {
  //   index: 1,
  //   cmd: "login",
  //   desc: "Easily sign in to your Yantrix MDM account right from your terminal. It opens your web browser for a secure authentication process using OAuth2, so no need to remember passwords or tokens. Once logged in, your session is safely stored locally, ready for all your commands without re-entering credentials every time.",
  //   example: "mdm login",
  // },
  // {
  //   index: 2,
  //   cmd: "whoami",
  //   desc: "Quickly check your current session details to confirm you're working with the right account. This shows your username, admin role, active tenant ID, and when your session expires—perfect for troubleshooting or switching contexts during multi-tenant operations.",
  //   example: "mdm whoami",
  // },
  // {
  //   index: 3,
  //   cmd: "logout",
  //   desc: "Safely end your current session and clear all stored credentials from your local machine. Use this when you're done working or need to switch to a different account, ensuring your data stays secure without any lingering access.",
  //   example: "mdm logout",
  // },
  {
    index: 1,
    cmd: 'devices',
    desc: 'Take full control of your enrolled Android devices with simple, powerful actions. List all devices with filters like status or location, send remote commands such as lock, wipe, reboot, or locate, and even push messages or check compliance—all from one easy command.',
    example: 'mdm device ',
  },
  {
    index: 2,
    cmd: 'policy',
    desc: 'Effortlessly create, update, and apply policies to keep your fleet secure and productive. Set up restrictions like app whitelisting, password rules, or kiosk mode, then assign them to groups or individual devices for consistent management across your organization.',
    example: 'mdm policy ',
  },
  {
    index: 3,
    cmd: 'wifi',
    desc: 'Set up and deploy WiFi profiles for corporate networks or guest access in seconds. Configure secure connections with WPA2, EAP, or hidden SSIDs, and push them to specific devices or groups to ensure seamless connectivity without manual setup.',
    example: 'mdm wifi',
  },
  {
    index: 4,
    cmd: 'user',
    desc: 'Handle team access with ease—invite new admins, assign roles like viewer or full admin, reset passwords, or review activity logs. This keeps your MDM secure while making collaboration simple for IT teams of any size.',
    example: 'mdm user ',
  },
  {
    index: 5,
    cmd: 'ticket',
    desc: 'Streamline support by creating and tracking issues directly in the CLI. Describe the problem, attach device details or logs automatically, and follow up on resolutions—great for quick fixes or escalating to the support team.',
    example: 'mdm ticket ',
  },
  {
    index: 6,
    cmd: 'playstore',
    desc: 'Manage your private app distribution like a pro: upload custom APKs, approve apps for deployment, and silently install them on devices. Ideal for distributing internal tools or updates without disrupting users.',
    example: 'mdm playstore ',
  },
  {
    index: 7,
    cmd: 'tenant',
    desc: 'For super admins only—handle multi-tenant setups with commands to create new organizations, manage subscriptions, or access raw data for advanced reporting. Perfect for MSPs scaling services across multiple clients.',
    example: 'mdm tenant ',
  },
  {
    index: 8,
    cmd: 'groups',
    desc: 'Organize and manage device groups for efficient bulk operations, including creating hierarchies, uploading files to groups, and viewing group structures as a tree. Simplify scaling your fleet management with targeted deployments.',
    example: 'mdm group',
  },
  {
    index: 9,
    cmd: 'enterprise',
    desc: 'Super admin tools for Android Enterprise: Bind devices, manage DPCs, and handle advanced configurations like work profiles or dedicated devices. Essential for compliance and large-scale enterprise deployments.',
    example: 'mdm enterprise ',
  },
];

function page() {
  return (
    <Box sx={{ mt: 5 }}>
      <YTXTypography variant="h4" fontWeight={800} color="white" sx={{ mb: 6 }}>
        Management Commands
      </YTXTypography>
      {/* Navigation Grid */}
      <Grid container spacing={3} xs={12} sm={6}>
        {allCommands.map((item) => (
          <Grid item xs={12} sm={6} key={item.cmd}>
            <Link
              href={`/docs/cli/Commands/${item.cmd}`}
              passHref
              style={{ textDecoration: 'none' }}
            >
              <Box
                sx={{
                  height: '100%',
                  p: 3,
                  bgcolor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,

                  // ✅ RESPONSIVE WIDTH FIX
                  width: { xs: '100%', md: '560px' },
                  maxWidth: '100%',
                  mx: 'auto',

                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',

                  '&:hover': {
                    borderColor: '#00f5ff',
                    bgcolor: 'rgba(0,245,255,0.05)',
                    transform: 'translateY(-4px)',
                    boxShadow: '0 10px 40px -10px rgba(0,245,255,0.1)',
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 2,
                    }}
                  >
                    {/* Command Badge */}
                    <Box
                      sx={{
                        fontFamily: 'monospace',
                        color: '#00f5ff',
                        // bgcolor: "rgba(0,245,255,0.1)",
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                      }}
                    >
                      {/* <span style={{ opacity: 0.6 }}>mdm</span> */}
                      {item.index}.{item.cmd}
                    </Box>

                    {/* Arrow Icon indicating navigation */}
                    <ArrowForwardIcon
                      sx={{
                        color: 'grey.600',
                        fontSize: 20,
                        '.MuiBox-root:hover &': { color: '#00f5ff' }, // Changes color on card hover
                      }}
                    />
                  </Box>

                  {/* Short Description */}
                  <YTXTypography
                    variant="body1"
                    color="grey.400"
                    sx={{
                      fontSize: '1rem',
                      lineHeight: 1.6,
                      // Logic to truncate text after 3 lines if description is too long
                      display: '-webkit-box',
                      overflow: 'hidden',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 3,
                    }}
                  >
                    {item.desc}
                  </YTXTypography>

                  {/* Command */}
                  <CodeBox> {item?.example}</CodeBox>
                </Box>

                {/* Learn More Text at bottom */}
                <Button
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                    py: 1,
                    minWidth: 'auto',
                    width: 'fit-content',
                    height: 'auto',
                    mx: '10px',
                    mt: 1,
                    backgroundColor: 'rgba(0,245,255,0.1)',
                  }}
                >
                  <YTXTypography
                    variant="caption"
                    sx={{
                      color: '#00f5ff',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      opacity: 0.8,
                      m: 0, // remove margin-top
                    }}
                  >
                    View Documentation
                  </YTXTypography>
                </Button>
              </Box>
            </Link>
          </Grid>
        ))}
      </Grid>
      {/* Pro Tip */}
      {/* <Box
        sx={{
          mt: 10,
          p: 5,
          bgcolor: "rgba(0,245,255,0.06)",
          borderRadius: 4,
          border: "1px dashed #00f5ff",
        }}
      >
        <YTXTypography variant="h6" color="#00f5ff" sx={{ mb: 2 }}>
          Pro Tip: Switch tenants instantly
        </YTXTypography>
        <CodeBox>mdm --tenant tenant_abc123 device list</CodeBox>
      </Box> */}
    </Box>
  );
}

export default page;
