'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Divider,
  Paper,
  Chip,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';
import Link from 'next/link';

// Icons
import AppsIcon from '@mui/icons-material/Apps';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import YTXTypography from '../../../../../../../../modules/mdm/components/YTXTypography';
import CodeBox from '../../../../../../../../modules/mdm/components/CodeBox';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeCard from '../../../../../../../../modules/mdm/components/CodeCard';
// --- LOCAL COMPONENT DEFINITIONS ---
// Defined locally to ensure stability in the preview environment

// --- PLAYSTORE SUBCOMMAND DATA ---
const subCommands = [
  {
    cmd: 'list',
    syntax: 'mdm playstore list [options]',
    desc: "List all private apps currently in your organization's private Play Store channel.",
    icon: <AppsIcon sx={{ color: '#fff' }} />,
  },
  {
    cmd: 'upload',
    syntax: 'mdm playstore upload <apkPath>',
    desc: 'Upload a new APK to the Private Play Store. This prepares the app for distribution.',
    icon: <CloudUploadIcon sx={{ color: '#27c93f' }} />, // Green for upload
  },
  {
    cmd: 'publish',
    syntax: 'mdm playstore publish <packageName>',
    desc: 'Publish an uploaded app to all enrolled devices. This triggers the install on the fleet.',
    icon: <ShopTwoIcon sx={{ color: '#00f5ff' }} />, // Blue/Cyan for store/publish
  },
  {
    cmd: 'delete',
    syntax: 'mdm playstore delete <packageName>',
    desc: 'Remove an app from the list (metadata only). The APK remains in the bucket but is unlisted.',
    icon: <DeleteOutlineIcon sx={{ color: '#ffbd2e' }} />, // Yellow/Orange for soft delete
  },
  {
    cmd: 'delete-full',
    syntax: 'mdm playstore delete-full <packageName>',
    desc: 'Permanently delete the app, including the APK file and all associated assets from storage.',
    icon: <DeleteForeverIcon sx={{ color: '#ff5f56' }} />, // Red for hard delete
  },
  {
    cmd: 'help',
    syntax: 'mdm playstore help [command]',
    desc: 'display help for command',
    icon: <HelpOutlineIcon />,
  },
];

// --- MAIN PAGE COMPONENT ---
export default function PlaystorePage() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 0 },
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* HEADER SECTION */}
      <Box sx={{ mb: 8 }}>
        <Link href="/apps/mdm/docs/cli/Commands" passHref>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'grey.400', textTransform: 'none', fontWeight: 600 }}
          >
            Back to ClI
          </Button>
        </Link>
        <YTXTypography
          variant="h2"
          fontWeight={900}
          color="white"
          sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2, mt: 2 }}
        >
          Play Store
        </YTXTypography>
        <YTXTypography variant="h5" color="grey.400" sx={{ maxWidth: '100%', lineHeight: 1.6 }}>
          Manage your organization's private app catalog. Upload custom APKs, publish updates, and
          control app lifecycle directly from the command line.
        </YTXTypography>
      </Box>

      {/* QUICK SYNTAX */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography variant="h5" color="white" fontWeight={700} sx={{ mb: 3 }}>
          Syntax
        </YTXTypography>
        <Box sx={{ mb: 4 }}>
          <CodeBox title="Terminal Usage">mdm playstore [options] [command]</CodeBox>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 8 }} />

      {/* SUBCOMMANDS GRID */}
      <Box sx={{ mb: 10 }}>
        <YTXTypography variant="h4" color="white" fontWeight={800} sx={{ mb: 4 }}>
          Available Commands
        </YTXTypography>

        <Grid container spacing={4}>
          {subCommands.map((item) => (
            // Responsive Grid: 1 col on mobile (xs=12), 2 cols on desktop (lg=6)
            <Grid item xs={12} lg={6} key={item.cmd}>
              <CodeCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          mt: 10,
          pt: 4,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
        }}
      >
        <YTXTypography color="grey.600" fontSize="0.9rem">
          Need help? Run{' '}
          <code
            style={{
              background: '#222',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            mdm playstore --help
          </code>{' '}
          or check the API docs.
        </YTXTypography>
      </Box>
    </Box>
  );
}
