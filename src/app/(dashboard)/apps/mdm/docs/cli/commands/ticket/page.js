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
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Link from 'next/link';
// Icons
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import ListAltIcon from '@mui/icons-material/ListAlt';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import YTXTypography from '../../../../../../../../modules/mdm/components/YTXTypography';
import CodeBox from '../../../../../../../../modules/mdm/components/CodeBox';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeCard from '../../../../../../../../modules/mdm/components/CodeCard';
// --- TICKET SUBCOMMAND DATA ---
const subCommands = [
  {
    cmd: 'create',
    syntax: 'mdm ticket create',
    desc: 'Create a new support ticket. You will be prompted to enter a subject and description for your issue.',
    icon: <ConfirmationNumberIcon sx={{ color: '#27c93f' }} />, // Green for creation
  },
  {
    cmd: 'list',
    syntax: 'mdm ticket list [options]',
    desc: 'List your tickets. View the status (Open, Closed, Pending) and IDs of all support requests filed by your account.',
    icon: <ListAltIcon sx={{ color: '#fff' }} />,
  },
  {
    cmd: 'view',
    syntax: 'mdm ticket view <ticketId>',
    desc: 'View ticket details and chat history. Opens an interactive session to reply to support agents.',
    icon: <VisibilityIcon sx={{ color: '#ffbd2e' }} />, // Yellow for viewing
  },
  {
    cmd: 'attach',
    syntax: 'mdm ticket attach <ticketId> <filePath>',
    desc: 'Attach a file to an existing ticket. Upload logs, screenshots, or config files to help resolve the issue.',
    icon: <AttachFileIcon sx={{ color: '#00f5ff' }} />, // Blue/Cyan for attachment
  },
  {
    cmd: 'help',
    syntax: 'mdm ticket help [command]',
    desc: 'display help for command',
    icon: <HelpOutlineIcon />,
  },
];

// --- MAIN PAGE COMPONENT ---
export default function TicketPage() {
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
          Support Ticket System
        </YTXTypography>
        <YTXTypography variant="h5" color="grey.400" sx={{ maxWidth: '100%', lineHeight: 1.6 }}>
          Directly access technical support from your terminal. Create tickets, upload logs, and
          chat with support engineers without leaving your workflow.
        </YTXTypography>
      </Box>

      {/* QUICK SYNTAX */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography variant="h5" color="white" fontWeight={700} sx={{ mb: 3 }}>
          Syntax
        </YTXTypography>
        <Box sx={{ mb: 4 }}>
          <CodeBox title="Terminal Usage">mdm ticket [options] [command]</CodeBox>
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
            mdm ticket --help
          </code>{' '}
          or check the API docs.
        </YTXTypography>
      </Box>
    </Box>
  );
}
