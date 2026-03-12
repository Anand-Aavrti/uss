'use client';

import React, { useState } from 'react';
// Removed next/link to avoid build errors in preview
import {
  Box,
  Grid,
  Divider,
  Paper,
  Chip,
  Button,
  Typography,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';

// Icons
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import YTXTypography from '../../../../../../../../modules/mdm/components/YTXTypography';
import CodeBox from '../../../../../../../../modules/mdm/components/CodeBox';
import CodeCard from '../../../../../../../../modules/mdm/components/CodeCard';
// --- GROUP SUBCOMMAND DATA ---
const subCommands = [
  {
    cmd: 'create',
    syntax: 'mdm group create',
    desc: 'Create a new child device group to organize your fleet hierarchically.',
    icon: <CreateNewFolderIcon sx={{ color: '#27c93f' }} />, // Green for create
  },
  {
    cmd: 'upload',
    syntax: 'mdm group upload',
    desc: 'Upload a file to a specific device group for distribution.',
    icon: <CloudUploadIcon sx={{ color: '#00f5ff' }} />, // Cyan for upload
  },
  {
    cmd: 'list',
    syntax: 'mdm group list [options]',
    desc: 'List all device groups currently configured in the tenant.',
    icon: <FormatListBulletedIcon sx={{ color: '#fff' }} />,
  },
  {
    cmd: 'files',
    syntax: 'mdm group files',
    desc: 'List all uploaded files currently stored in the tenant bucket.',
    icon: <FolderOpenIcon sx={{ color: '#ffbd2e' }} />, // Yellow for storage
  },
  {
    cmd: 'update',
    syntax: 'mdm group update <id>',
    desc: "Update an existing group's name or description.",
    icon: <EditIcon sx={{ color: '#b388ff' }} />, // Purple for edit
  },
  {
    cmd: 'delete',
    syntax: 'mdm group delete <id>',
    desc: 'Delete a device group permanently.',
    icon: <DeleteOutlineIcon sx={{ color: '#ff5f56' }} />, // Red for delete
  },
  {
    cmd: 'delete-file',
    syntax: 'mdm group delete-file',
    desc: "Remove a specific file from a group's storage.",
    icon: <RemoveCircleOutlineIcon sx={{ color: '#ff5f56' }} />, // Red for remove
  },
  {
    cmd: 'tree',
    syntax: 'mdm group tree',
    desc: 'Show device groups visualization as a beautiful hierarchy tree.',
    icon: <AccountTreeIcon sx={{ color: '#00f5ff' }} />, // Cyan for structure
  },
  {
    cmd: 'help',
    syntax: 'mdm group help [command]',
    desc: 'display help for command',
    icon: <HelpOutlineIcon sx={{ color: '#fff' }} />, // White/Grey for help
  },
];

// --- MAIN PAGE COMPONENT ---
export default function GroupPage() {
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
          Device Group & File Management
        </YTXTypography>
        <YTXTypography variant="h5" color="grey.400" sx={{ maxWidth: '100%', lineHeight: 1.6 }}>
          Organize devices into hierarchical groups, manage file distributions, and maintain
          structure across your organization efficiently.
        </YTXTypography>
      </Box>

      {/* QUICK SYNTAX */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography variant="h5" color="white" fontWeight={700} sx={{ mb: 3 }}>
          Syntax
        </YTXTypography>
        <Box sx={{ mb: 4 }}>
          <CodeBox title="Terminal Usage">mdm group [options] [command]</CodeBox>
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
            mdm group --help
          </code>{' '}
          or check the API docs.
        </YTXTypography>
      </Box>
    </Box>
  );
}
