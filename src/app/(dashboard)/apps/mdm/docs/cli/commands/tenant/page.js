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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DomainIcon from '@mui/icons-material/Domain';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import StorageIcon from '@mui/icons-material/Storage';
import DataObjectIcon from '@mui/icons-material/DataObject';
import ListAltIcon from '@mui/icons-material/ListAlt';
import WarningIcon from '@mui/icons-material/Warning';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import YTXTypography from '../../../../../../../../modules/mdm/components/YTXTypography';
import CodeBox from '../../../../../../../../modules/mdm/components/CodeBox';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import CodeCard from '../../../../../../../../modules/mdm/components/CodeCard';
// --- TENANT SUBCOMMAND DATA ---
const subCommands = [
  {
    cmd: 'list',
    syntax: 'mdm tenant list',
    desc: 'List all tenant namespaces. Useful for getting an overview of all organizations currently managed in the system.',
    icon: <ListAltIcon sx={{ color: '#fff' }} />,
  },
  {
    cmd: 'create',
    syntax: 'mdm tenant create [options]',
    desc: 'Create a new tenant (namespace). Initializes the datastore namespace and sets up default configurations.',
    icon: <AddBusinessIcon sx={{ color: '#27c93f' }} />, // Green for create
  },
  {
    cmd: 'get',
    syntax: 'mdm tenant get <namespace>',
    desc: 'Get details for a specific tenant. Returns configuration metadata, creation date, and status.',
    icon: <DomainIcon sx={{ color: '#00f5ff' }} />, // Cyan for details
  },
  {
    cmd: 'kinds',
    syntax: 'mdm tenant kinds <namespace>',
    desc: 'List all Datastore kinds within a tenant. Helps admins explore the schema usage of a specific namespace.',
    icon: <StorageIcon sx={{ color: '#ffbd2e' }} />, // Yellow for database/storage
  },
  {
    cmd: 'entities',
    syntax: 'mdm tenant entities <namespace> <kind>',
    desc: 'List all entities within a specific kind. View raw data entries for debugging or auditing purposes.',
    icon: <DataObjectIcon sx={{ color: '#b388ff' }} />, // Purple for raw data
  },
  {
    cmd: 'delete',
    syntax: 'mdm tenant delete <namespace>',
    desc: 'Delete an entire tenant and all associated data. WARNING: This action is irreversible.',
    icon: <WarningIcon sx={{ color: '#ff5f56' }} />, // Red for danger
  },
  {
    cmd: 'help',
    syntax: 'mdm tenant help [command]',
    desc: 'display help for command',
    icon: <HelpOutlineIcon />,
  },
];

// --- MAIN PAGE COMPONENT ---
export default function TenantPage() {
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
          Tenant Management
        </YTXTypography>
        <YTXTypography variant="h5" color="grey.400" sx={{ maxWidth: '100%', lineHeight: 1.6 }}>
          Super Admin tools for multi-tenancy. Create new organizations, manage namespaces, and
          access raw Datastore entities directly from the CLI.
        </YTXTypography>
      </Box>

      {/* QUICK SYNTAX */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography variant="h5" color="white" fontWeight={700} sx={{ mb: 3 }}>
          Syntax
        </YTXTypography>
        <Box sx={{ mb: 4 }}>
          <CodeBox title="Terminal Usage">mdm tenant [options] [command]</CodeBox>
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
            mdm tenant --help
          </code>{' '}
          or check the API docs.
        </YTXTypography>
      </Box>
    </Box>
  );
}
