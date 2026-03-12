/* eslint-disable react-hooks/set-state-in-effect */
// /app/(docs)/page.js
'use client';
import {
  Grid,
  Card,
  CardActionArea,
  TextField,
  InputAdornment,
  Box,
  Button,
  Container,
  Menu,
  MenuItem,
  CircularProgress,
  IconButton,
} from '@mui/material';
import Fuse from 'fuse.js';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import YTXTypography from '../../../../../modules/mdm/components/YTXTypography';
import { useState, useRef, useEffect } from 'react';
// Import Icons
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import GavelIcon from '@mui/icons-material/Gavel';
import AppsIcon from '@mui/icons-material/Apps';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import WifiTetheringIcon from '@mui/icons-material/WifiTethering';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import TerminalIcon from '@mui/icons-material/Terminal';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MenuIcon from '@mui/icons-material/Menu';
import { useDrawer } from '../../../../../modules/mdm/context/DrawerContext';
const docCards = [
  {
    id: 1,
    title: 'Installation & Setup',
    description: 'Set up Yantrix on your Android fleet and prepare your organization environment.',
    href: '/apps/mdm/docs/Installation&Setup',
    icon: <SettingsSuggestIcon />,
  },
  {
    id: 2,
    title: 'Device Enrollment',
    description: 'Learn how to enroll single or bulk devices using QR, Zero-Touch, or ADB.',
    href: '/apps/mdm/docs/DeviceEnrollment',
    icon: <QrCodeScannerIcon />,
  },
  {
    id: 3,
    title: 'Device Management',
    description: 'Manage, monitor, and control devices from the dashboard.',
    href: '/apps/mdm/docs/DeviceManagement',
    icon: <SmartphoneIcon />,
  },
  {
    id: 4,
    title: 'Policies & Restrictions',
    description: 'Define what users can and cannot do on their devices.',
    href: '/apps/mdm/docs/Policies&Restrictions',
    icon: <GavelIcon />,
  },
  {
    id: 5,
    title: 'Apps Management',
    description: 'Install, update, and manage apps on your devices remotely.',
    href: '/apps/mdm/docs/AppsManagement',
    icon: <AppsIcon />,
  },
  {
    id: 6,
    title: 'Blueprints',
    description: 'Create templates for device configuration to ensure consistent deployments.',
    href: '/apps/mdm/docs/Blueprints',
    icon: <ContentCopyIcon />,
  },
  {
    id: 7,
    title: 'Device Groups',
    description: 'Organize devices into groups to simplify bulk operations.',
    href: '/apps/mdm/docs/DeviceGroups',
    icon: <GroupWorkIcon />,
  },
  {
    id: 8,
    title: 'Remote Groups',
    description: 'Execute actions instantly across one or many devices.',
    href: '/apps/mdm/docs/RemoteGroups',
    icon: <WifiTetheringIcon />,
  },
  {
    id: 9,
    title: 'Content Management',
    description: 'Distribute files, media, and documents across your device fleet.',
    href: '/apps/mdm/docs/ContentManagement',
    icon: <FolderSharedIcon />,
  },
  {
    id: 10,
    title: 'User & Role Management',
    description: 'Control admin access with custom roles and permissions.',
    href: '/apps/mdm/docs/User&RoleManagement',
    icon: <SupervisedUserCircleIcon />,
  },
  {
    id: 11,
    title: 'Troubleshooting',
    description: 'Solutions to the most common issues faced by admins.',
    href: '/apps/mdm/docs/Troubleshooting',
    icon: <BuildCircleIcon />,
  },
  {
    id: 12,
    title: 'FAQs',
    description: 'Frequently asked questions about device management and usage.',
    href: '/apps/mdm/docs/FAQs',
    icon: <HelpOutlineIcon />,
  },
  {
    id: 13,
    title: 'CLI',
    description:
      'The Yantrix CLI is a lightweight command-line tool for performing fast, repeatable device-management tasks.',
    href: '/apps/mdm/docs/cli',
    icon: <TerminalIcon />,
  },
];

export default function HelpHome({ onDrawerToggle }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchRef = useRef(null);
  const [searchIndex, setSearchIndex] = useState([]);
  const { onToggle } = useDrawer();

  const filteredCards = docCards.filter(
    (card) =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Load search index on mount
  useEffect(() => {
    fetch('/search-index.json')
      .then((res) => res.json())
      .then((data) => {
        setSearchIndex(data);
        // Init Fuse for fuzzy search
        const fuse = new Fuse(data, {
          keys: ['title', 'body'], // Search in title & content
          threshold: 0.3, // Fuzzy tolerance
          includeScore: true,
          limit: 5, // Top 5 results
        });
        // Global Fuse instance or per-query
      });
  }, []);

  // Handle search on change
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      setAnchorEl(null);
      return;
    }

    setIsLoading(true);
    // Simulate delay for loader (remove in prod)
    const timer = setTimeout(() => {
      const fuse = new Fuse(searchIndex, {
        keys: ['title', 'body'],
        threshold: 0.3,
        includeScore: true,
        limit: 5,
      });
      const results = fuse.search(searchQuery).map((result) => ({
        ...result.item,
        score: result.score,
        snippet: result.item.body.substring(0, 200) + '...', // 2-3 line snippet
      }));
      setSearchResults(results);
      setAnchorEl(searchRef.current); // Open dropdown
      setIsLoading(false);
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [searchQuery, searchIndex]);

  const handleClose = () => setAnchorEl(null);
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, px: { xs: 3, md: 0 } }}>
      {/* Back Button */}
      <Box sx={{ mb: 4, zIndex: 50, mt: { xs: 0, md: 10 }, pt: { xs: 8, md: 0 } }}>
        <Link href="/apps/mdm" passHref sx={{ zIndex: 50 }}>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'grey.400',
              textTransform: 'none',
              fontSize: '20px',
              fontWeight: 600,
              zIndex: 50,
            }}
          >
            <YTXTypography color="grey.400" sx={{ fontSize: '20px' }}>
              Back to main page
            </YTXTypography>
          </Button>
        </Link>
      </Box>
      {/* Header */}
      <Box sx={{ mb: 10, textAlign: { xs: 'center', md: 'left' } }}>
        <YTXTypography
          variant="h3"
          component="h1"
          fontWeight={900}
          color="white"
          sx={{ mb: 2, fontSize: { xs: '2.8rem', md: '3.8rem' } }}
        >
          Yantrix Documentation
        </YTXTypography>
        <YTXTypography variant="h6" color="grey.400" sx={{ mb: 5 }}>
          Everything you need to manage your Android fleet
        </YTXTypography>
      </Box>

      {/* Fixed Sticky Search - Always Visible at Viewport Top */}

      {/* <Box sx={{ height: "96px" }} /> */}

      {/* Results Header */}
      {searchQuery && (
        <YTXTypography
          variant="h5"
          color="grey.300"
          sx={{ mb: 4, textAlign: 'left', px: { xs: 3, md: 0 } }}
        >
          Found {filteredCards.length} result
          {filteredCards.length !== 1 ? 's' : ''} for &quot;
          <Box component="span" sx={{ color: '#00f5ff' }}>
            {searchQuery}
          </Box>
          &quot;
        </YTXTypography>
      )}

      {filteredCards.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 10, px: { xs: 3, md: 0 } }}>
          <YTXTypography variant="h5" color="grey.500">
            No documentation found for &quot;<strong>{searchQuery}</strong>
            &quot;
          </YTXTypography>
          <YTXTypography color="grey.600" sx={{ mt: 2 }}>
            Try searching for device, policy, enrollment, CLI, etc.
          </YTXTypography>
        </Box>
      ) : (
        <Grid
          container
          spacing={4}
          sx={{
            px: { xs: 3, md: 0 },
            justifyContent: { md: 'center' }, // Center the grid items on md and up for better symmetry when extra space
          }}
        >
          {filteredCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id} sx={{ display: 'flex' }}>
              <Link href={card.href} passHref style={{ width: '100%', textDecoration: 'none' }}>
                <Card
                  sx={{
                    height: '100%',
                    width: '100%',
                    maxWidth: '350px', // Cap the max width at 350px for consistency and symmetry
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 4,
                    transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      borderColor: '#00f5ff',
                      boxShadow: '0 20px 40px rgba(0, 245, 255, 0.2)',
                      bgcolor: 'rgba(0, 245, 255, 0.06)',
                      '& .card-icon': {
                        color: '#00f5ff',
                        transform: 'scale(1.15) rotate(8deg)',
                        bgcolor: 'rgba(0, 245, 255, 0.2)',
                      },
                    },
                  }}
                >
                  <CardActionArea
                    sx={{
                      p: { xs: 2, sm: 4 }, // Responsive padding
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Box
                      className="card-icon"
                      sx={{
                        width: { xs: 48, sm: 64 }, // Responsive icon size
                        height: { xs: 48, sm: 64 },
                        borderRadius: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.7)',
                        mb: 3,
                        transition: 'all 0.4s ease',
                      }}
                    >
                      {card.icon}
                    </Box>

                    <YTXTypography variant="h6" fontWeight={700} color="white" sx={{ mb: 2 }}>
                      {card.title}
                    </YTXTypography>

                    <YTXTypography
                      variant="body2"
                      color="grey.400"
                      sx={{
                        lineHeight: 1.7,
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {card.description}
                    </YTXTypography>
                  </CardActionArea>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}
