'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  IconButton,
} from '@mui/material';
import YTXTypography from './YTXTypography'; // Assuming this is in the same folder or update path

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
import HomeIcon from '@mui/icons-material/Home';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Using ExpandMore for section chevron (rotates to down)

import useMediaQuery from '@mui/material/useMediaQuery';
// Your Data
const docCards = [
  {
    id: 1,
    title: 'Installation & Setup',
    href: '/apps/mdm/docs/Installation&Setup',
    icon: <SettingsSuggestIcon />,
  },
  {
    id: 2,
    title: 'Device Enrollment',
    href: '/apps/mdm/docs/DeviceEnrollment',
    icon: <QrCodeScannerIcon />,
  },
  {
    id: 3,
    title: 'Device Management',
    href: '/apps/mdm/docs/DeviceManagement',
    icon: <SmartphoneIcon />,
  },

  // CLI moved into top 5 and IDs are now sequential
  {
    id: 4,
    title: 'CLI Reference',
    href: '/apps/mdm/docs/cli',
    icon: <TerminalIcon />,
    basePath: '/apps/mdm/docs/cli',
    children: [
      { title: 'Overview', href: '/apps/mdm/docs/cli' },
      { title: 'Installation', href: '/apps/mdm/docs/cli/Installation' },
      { title: 'Authentication', href: '/apps/mdm/docs/cli/Authentication' },
      { title: 'Commands', href: '/apps/mdm/docs/cli/commands' },
    ],
  },

  {
    id: 5,
    title: 'Policies & Restrictions',
    href: '/apps/mdm/docs/Policies&Restrictions',
    icon: <GavelIcon />,
  },
  {
    id: 6,
    title: 'Apps Management',
    href: '/apps/mdm/docs/AppsManagement',
    icon: <AppsIcon />,
  },
  {
    id: 7,
    title: 'Blueprints',
    href: '/apps/mdm/docs/Blueprints',
    icon: <ContentCopyIcon />,
  },
  {
    id: 8,
    title: 'Device Groups',
    href: '/apps/mdm/docs/DeviceGroups',
    icon: <GroupWorkIcon />,
  },
  {
    id: 9,
    title: 'Remote Commands',
    href: '/apps/mdm/docs/RemoteGroups',
    icon: <WifiTetheringIcon />,
  },
  {
    id: 10,
    title: 'Content Management',
    href: '/apps/mdm/docs/ContentManagement',
    icon: <FolderSharedIcon />,
  },
  {
    id: 11,
    title: 'User & Role Management',
    href: '/apps/mdm/docs/User&RoleManagement',
    icon: <SupervisedUserCircleIcon />,
  },
  {
    id: 12,
    title: 'Troubleshooting',
    href: '/apps/mdm/docs/Troubleshooting',
    icon: <BuildCircleIcon />,
  },
  {
    id: 13,
    title: 'FAQs',
    href: '/apps/mdm/docs/FAQs',
    icon: <HelpOutlineIcon />,
  },
];

const sidebarWidth = 320;
const miniWidth = 72;
export default function DocsSidebar({ mobileOpen, onDrawerToggle }) {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 900px)');
  const [isExpanded, setIsExpanded] = useState(true);
  const [openSections, setOpenSections] = useState({});

  const toggleSidebar = () => setIsExpanded((s) => !s);

  const isOpen = isMobile ? mobileOpen : true;
  const drawerVariant = isMobile ? 'temporary' : 'permanent';

  // keep numeric widths for desktop, but use responsive PaperProps for mobile width
  const drawerWidth = isMobile ? sidebarWidth : isExpanded ? sidebarWidth : miniWidth;
  const showExpandedContent = isMobile ? isOpen : isExpanded;
  const toggleAction = isMobile ? onDrawerToggle : toggleSidebar;

  const handleSectionClick = (id) => {
    if (!isMobile && !isExpanded) {
      // In desktop mini mode, expand sidebar first, then open section after transition
      toggleSidebar();
      setTimeout(() => {
        setOpenSections((prev) => ({ ...prev, [id]: true }));
      }, 300);
    } else {
      // Toggle the section
      setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
    }
  };

  // Auto-expand sections and sidebar if on a sub-page
  useEffect(() => {
    let shouldExpandSidebar = false;
    const newOpen = {};
    docCards.forEach((item) => {
      if (item.children && item.basePath && pathname.startsWith(item.basePath)) {
        newOpen[item.id] = true;
        shouldExpandSidebar = true;
      }
    });
    setOpenSections(newOpen);
    if (shouldExpandSidebar && !isExpanded && !isMobile) {
      toggleSidebar();
    }
  }, [pathname, isMobile]);

  return (
    <Drawer
      variant={drawerVariant}
      open={isOpen}
      onClose={isMobile ? onDrawerToggle : undefined}
      ModalProps={{ keepMounted: true }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        zIndex: 2147483648,
        transition: 'width 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        // ensure temporary drawer only shows on small screens
        ...(isMobile && { display: { xs: 'block', md: 'none' } }),
        '& .MuiDrawer-paper': {
          // Use responsive sizing for the paper: on xs use 92vw but cap it visually with maxWidth
          width: isMobile ? { xs: '92vw', sm: sidebarWidth } : drawerWidth,
          maxWidth: isMobile ? sidebarWidth : drawerWidth,
          ...(isMobile && {
            position: 'fixed',
            height: '100vh',
            border: 'none',
            boxShadow: '0 0 20px rgba(0,245,255,0.1)',
          }),
          transition: 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          bgcolor: '#020810',
          borderRight: !isMobile && '1px solid rgba(255, 255, 255, 0.08)',
          color: 'white',
          overflow: 'auto',
          // invisible scrollbar kept
          '&::-webkit-scrollbar': { width: '0px', height: '0px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb:hover': { background: 'transparent' },
        },
      }}
    >
      {/* Brand / Header Area */}
      <Box
        sx={{
          p: { xs: 1, sm: 2, md: 4 },
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: showExpandedContent ? 'space-between' : 'center',
          transition: 'justify-content 0.3s ease',
          // ensure header content does not overflow: add horizontal padding clamp
          px: { xs: 1.5, sm: 2, md: 4 },
        }}
      >
        {showExpandedContent ? (
          <>
            <YTXTypography
              variant="h4"
              fontWeight={800}
              sx={{
                letterSpacing: '-0.5px',
                color: '#fff',
                opacity: 1,
                transform: 'translateX(0)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                // prevent long text pushing icon off-screen
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                mr: 1,
                maxWidth: { xs: '65%', sm: '70%', md: '80%' },
              }}
            >
              Yantrix <span style={{ color: '#00f5ff' }}>Docs</span>
            </YTXTypography>
            <YTXTypography
              variant="caption"
              color="grey.600"
              sx={{ opacity: 1, transition: 'opacity 0.3s ease' }}
            >
              {/* v2.4.0 */}
            </YTXTypography>
          </>
        ) : (
          <YTXTypography
            variant="h5"
            fontWeight={800}
            sx={{
              color: '#00f5ff',
              opacity: 1,
              transition: 'opacity 0.3s ease',
            }}
          >
            {/* YTX */}
          </YTXTypography>
        )}

        {/* Show desktop chevron, but show a mobile Close icon when drawer is temporary */}
        <IconButton
          onClick={toggleAction}
          sx={{
            color: 'grey.400',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' },
            transition: 'transform 0.3s ease',
            // always visible (desktop + mobile). On desktop rotate chevron, on mobile no rotate.
            display: 'flex',
            transform: !isMobile ? 'rotate(0deg)' : 'none',
            // override for mobile below with different icon, so we control via children
            // keep it accessible
            ml: 1,
          }}
        >
          {/* If mobile, render a close icon (so users can close drawer). On desktop render chevrons */}
          {isMobile ? (
            <CloseIcon />
          ) : showExpandedContent ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </Box>

      <List
        sx={{
          px: { xs: 0.5, sm: 1, md: 2 },
          pb: 2,
          transition: 'padding 0.3s ease',
        }}
      >
        {' '}
        {/* Responsive padding */}
        {/* Main Dashboard Link */}
        <Link href="/apps/mdm/docs" passHref style={{ textDecoration: 'none' }}>
          <ListItemButton
            selected={pathname === '/apps/mdm/docs'}
            sx={{
              borderRadius: 2,
              justifyContent: showExpandedContent ? 'initial' : 'center', // Left align when expanded, center when collapsed
              marginLeft: 0,
              mb: 2,
              bgcolor: pathname === '/apps/mdm/docs' ? 'rgba(0, 245, 255, 0.08)' : 'transparent',
              transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smoother ease for no glitches
              '&.Mui-selected': {
                bgcolor: 'rgba(0, 245, 255, 0.12)',
                borderLeft: '4px solid #00f5ff',
                boxShadow: 'inset 0 0 0 1px rgba(0, 245, 255, 0.2)', // Left-side inner glow
              },
              '&.Mui-selected:hover': {
                bgcolor: 'rgba(0, 245, 255, 0.16)',
                boxShadow: 'inset 0 0 0 1px rgba(0, 245, 255, 0.3)', // Enhanced glow on hover
              },
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: { xs: 32, md: 40 }, // Responsive icon container width
                marginLeft: 0, // No left margin for proper alignment
                color: pathname === '/apps/mdm/docs' ? '#00f5ff' : 'grey.500',
                transition: 'color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <HomeIcon fontSize="medium" />
            </ListItemIcon>
            {showExpandedContent && (
              <ListItemText
                primary={
                  <YTXTypography
                    fontSize="0.95rem"
                    fontWeight={600}
                    color={pathname === '/apps/mdm/docs' ? '#00f5ff' : 'grey.400'}
                  >
                    Overview
                  </YTXTypography>
                }
              />
            )}
          </ListItemButton>
        </Link>
        <Divider sx={{ my: 1, borderColor: 'rgba(255,255,255,0.08)' }} />
        {/* Guides Section Label (only in expanded) */}
        {showExpandedContent && (
          <Box
            sx={{
              px: { xs: 0.5, sm: 1, md: 2 },
              py: 1.1,
              opacity: 1,
              transform: 'translateX(0)',
            }}
          >
            {' '}
            {/* Responsive padding */}
            <YTXTypography
              variant="caption"
              fontWeight={700}
              color="grey.600"
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '1px',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
            >
              Guides
            </YTXTypography>
          </Box>
        )}
        {/* Dynamic List from Data */}
        {docCards.map((item) => {
          const hasChildren = !!item.children;
          const isSectionActive =
            hasChildren && item.basePath && pathname.startsWith(item.basePath);
          const isActive = hasChildren ? isSectionActive : pathname === item.href;
          const isOpen = openSections[item.id];

          return (
            <React.Fragment key={item.id}>
              <ListItemButton
                component={!hasChildren ? Link : undefined}
                href={!hasChildren ? item.href : undefined}
                selected={isActive}
                onClick={hasChildren ? () => handleSectionClick(item.id) : undefined}
                key={item.id}
                sx={{
                  borderRadius: 2,
                  padding: 1.5,
                  mb: 0.2,
                  justifyContent: showExpandedContent ? 'initial' : 'center', // Left align when expanded, center when collapsed
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Smoother ease for no glitches
                  position: 'relative',
                  bgcolor: isActive ? 'rgba(0, 245, 255, 0.12)' : 'transparent',
                  borderLeft: isActive ? '4px solid #00f5ff' : '4px solid transparent',
                  boxShadow: isActive ? 'inset 0 0 0 1px rgba(0, 245, 255, 0.2)' : 'none', // Left-side inner glow
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 245, 255, 0.12)',
                    borderLeft: '4px solid #00f5ff',
                    boxShadow: 'inset 0 0 0 1px rgba(0, 245, 255, 0.2)',
                  },
                  '&.Mui-selected:hover': {
                    bgcolor: 'rgba(0, 245, 255, 0.16)',
                    boxShadow: 'inset 0 0 0 1px rgba(0, 245, 255, 0.3)', // Enhanced left glow on hover
                  },
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                    '& .item-icon': { color: '#fff' },
                  },
                }}
              >
                <ListItemIcon
                  className="item-icon"
                  sx={{
                    minWidth: { xs: 32, md: 40 }, // Responsive icon container width
                    color: isActive ? '#00f5ff' : 'grey.600',
                    transition: 'color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                    marginLeft: 0, // No left margin for proper alignment
                  }}
                >
                  {React.cloneElement(item.icon, {
                    fontSize: isExpanded ? 'small' : 'medium',
                  })}
                </ListItemIcon>
                {showExpandedContent && (
                  <>
                    {hasChildren ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                        <YTXTypography
                          fontSize="0.95rem"
                          fontWeight={isActive ? 600 : 500}
                          color={isActive ? 'white' : 'grey.400'}
                          sx={{
                            transition: 'color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            opacity: 1,
                            transform: 'translateX(0)',
                          }}
                        >
                          {item.title}
                        </YTXTypography>
                        <ExpandMoreIcon
                          sx={{
                            ml: 10,
                            color: 'grey.500',
                            transform: !isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.3s ease',
                          }}
                        />
                      </Box>
                    ) : (
                      <YTXTypography
                        fontSize="0.95rem"
                        fontWeight={isActive ? 600 : 500}
                        color={isActive ? 'white' : 'grey.400'}
                        sx={{
                          transition: 'color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          opacity: 1,
                          transform: 'translateX(0)',
                        }}
                      >
                        {item.title}
                      </YTXTypography>
                    )}
                  </>
                )}
              </ListItemButton>
              {hasChildren &&
                showExpandedContent &&
                isOpen &&
                item.children.map((child) => {
                  const childActive = pathname === child.href;
                  return (
                    <Link
                      href={child.href}
                      passHref
                      key={child.href}
                      style={{ textDecoration: 'none' }}
                    >
                      <ListItemButton
                        selected={childActive}
                        sx={{
                          ml: 5,
                          mr: 3,
                          // mx:3,
                          mt: 0.8,
                          pl: 3,
                          // pl: 10, // Indent for sub-items (adjust as needed for alignment)
                          mb: 0.2,
                          borderRadius: 1.5,
                          justifyContent: 'initial',
                          transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          position: 'relative',
                          // bgcolor: childActive ? "rgba(0, 245, 255, 0.08)" : "transparent",
                          // borderLeft: childActive
                          //   ? "4px solid #00f5ff"
                          //   : "4px solid transparent",
                          boxShadow: childActive
                            ? 'inset 0 0 0 1px rgba(0, 245, 255, 0.2)'
                            : 'none',
                          '&.Mui-selected': {
                            bgcolor: 'rgba(0, 245, 255, 0.12)',
                            // borderLeft: "4px solid #00f5ff",
                            boxShadow: 'inset 0 0 0 1px rgba(0, 245, 255, 0.2)',
                          },
                          '&.Mui-selected:hover': {
                            bgcolor: 'rgba(0, 245, 255, 0.16)',
                            boxShadow: 'inset 0 0 0 1px rgba(0, 245, 255, 0.3)',
                          },
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.08)',
                          },
                        }}
                      >
                        <YTXTypography
                          fontSize="0.95rem"
                          fontWeight={childActive ? 600 : 500}
                          color={childActive ? 'white' : 'grey.400'}
                          sx={{
                            transition: 'color 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            opacity: 1,
                            transform: 'translateX(0)',
                          }}
                        >
                          {child.title}
                        </YTXTypography>
                      </ListItemButton>
                    </Link>
                  );
                })}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
}
