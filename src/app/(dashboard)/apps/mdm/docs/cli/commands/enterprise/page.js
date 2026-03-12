'use client';

import React, { useState } from 'react';
// Removed next/link to avoid build errors in preview
import {
  Box,
  Grid,
  Divider,
  Paper,
  Button,
  Chip,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import CodeCard from '../../../../../../../../modules/mdm/components/CodeCard';
// Icons
import BusinessIcon from '@mui/icons-material/Business';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import PolicyIcon from '@mui/icons-material/Policy';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import YTXTypography from '../../../../../../../../modules/mdm/components/YTXTypography';
import CodeBox from '../../../../../../../../modules/mdm/components/CodeBox';

// --- ENTERPRISE SUBCOMMAND DATA ---
const subCommands = [
  {
    cmd: 'create',
    syntax: 'mdm enterprise create',
    desc: 'Create a new Android Enterprise organization. This binds your Google domain to the MDM tenant.',
    icon: <AddBusinessIcon sx={{ color: '#27c93f' }} />, // Green for create
  },
  {
    cmd: 'get',
    syntax: 'mdm enterprise get',
    desc: 'Show current Enterprise details, including binding state, service account info, and enrollment tokens.',
    icon: <InfoIcon sx={{ color: '#00f5ff' }} />, // Cyan for info
  },
  {
    cmd: 'policy',
    syntax: 'mdm enterprise policy',
    desc: 'Manage global Enterprise Policies that apply to all devices in the organization.',
    icon: <PolicyIcon sx={{ color: '#ffbd2e' }} />, // Yellow for policy
  },
  {
    cmd: 'delete',
    syntax: 'mdm enterprise delete',
    desc: 'Delete the entire Enterprise. WARNING: This is IRREVERSIBLE and will unenroll all devices.',
    icon: <WarningIcon sx={{ color: '#ff5f56' }} />, // Red for danger
  },
  {
    cmd: 'help',
    syntax: 'mdm enterprise help [command]',
    desc: 'display help for command',
    icon: <HelpOutlineIcon sx={{ color: '#fff' }} />, // White for help
  },
];

// --- MAIN PAGE COMPONENT ---
export default function EnterprisePage() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 0 },
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* BACK BUTTON */}
      <Box sx={{ mb: 4 }}>
        {/* Replaced Link with simple href for preview compatibility */}
        <Button
          href="/apps/mdm/docs/cli/Commands"
          startIcon={<ArrowBackIcon />}
          sx={{
            color: 'grey.400',
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { color: '#00f5ff', bgcolor: 'rgba(0,245,255,0.1)' },
          }}
        >
          Back to CLI
        </Button>
      </Box>

      {/* HEADER SECTION */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography
          variant="h2"
          fontWeight={900}
          color="white"
          sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2 }}
        >
          Android Enterprise Management
        </YTXTypography>
        <YTXTypography variant="h5" color="grey.400" sx={{ maxWidth: '100%', lineHeight: 1.6 }}>
          Super Admin tools for the root Enterprise object. Bind your organization, inspect
          configuration details, and manage global lifecycle events.
        </YTXTypography>
      </Box>

      {/* QUICK SYNTAX */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography variant="h5" color="white" fontWeight={700} sx={{ mb: 3 }}>
          Syntax
        </YTXTypography>
        <Box sx={{ mb: 4 }}>
          <CodeBox title="Terminal Usage">mdm enterprise [options] [command]</CodeBox>
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
            mdm enterprise --help
          </code>{' '}
          or check the API docs.
        </YTXTypography>
      </Box>
    </Box>
  );
}
