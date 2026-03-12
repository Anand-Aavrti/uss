'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Divider,
  Chip,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  Typography,
  Button,
} from '@mui/material';
import Link from 'next/link';
import YTXTypography from '../../../../../../../../modules/mdm/components/YTXTypography';
import CodeBox from '../../../../../../../../modules/mdm/components/CodeBox';
// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PolicyIcon from '@mui/icons-material/Policy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DescriptionIcon from '@mui/icons-material/Description';
import CodeCard from '../../../../../../../../modules/mdm/components/CodeCard';
// --- 2. POLICY SUBCOMMAND DATA ---
const subCommands = [
  {
    cmd: 'list',
    syntax: 'mdm policy list ',
    desc: 'View a list of all defined policies in your organization. Useful for auditing active configurations.',
    icon: <ListAltIcon sx={{ color: '#fff' }} />,
    options: [
      {
        flag: '--json',
        desc: 'Output the policy list in raw JSON format for parsing',
      },
      {
        flag: '--filter <name>',
        desc: 'Filter results by policy name',
      },
    ],
  },
  {
    cmd: 'create',
    syntax: 'mdm policy create ',
    desc: 'Create a new security policy. You can define rules interactively or import them from a file.',
    icon: <AddCircleOutlineIcon sx={{ color: '#27c93f' }} />,
    options: [
      {
        flag: '--name <name>',
        desc: 'Unique name for the new policy (Required)',
      },
      {
        flag: '--file <path>',
        desc: 'Path to a JSON configuration file to import',
      },
      {
        flag: '--desc <text>',
        desc: 'Optional description for the policy',
      },
    ],
  },
];

// --- 3. MAIN PAGE COMPONENT ---
export default function PolicyPage() {
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
        {/* <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Chip
            label="CLI Reference"
            variant="outlined"
            sx={{
              color: "#00f5ff",
              borderColor: "rgba(0,245,255,0.3)",
              fontWeight: 600,
            }}
          />
          <YTXTypography variant="caption" color="grey.500">
            v1.2.4
          </YTXTypography>
        </Box> */}
        <Link href="/apps/mdm/docs/cli/Commands" passHref>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'grey.400', textTransform: 'none', fontWeight: 600, mb: 5 }}
          >
            Back to ClI
          </Button>
        </Link>
        <YTXTypography
          variant="h2"
          fontWeight={900}
          color="white"
          sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2 }}
        >
          Policy Management
        </YTXTypography>
        <YTXTypography variant="h5" color="grey.400" sx={{ maxWidth: '100%', lineHeight: 1.6 }}>
          Create, view, and organize device policies directly from the terminal. Define security
          baselines and application whitelists with ease.
        </YTXTypography>
      </Box>

      {/* QUICK SYNTAX */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography variant="h5" color="white" fontWeight={700} sx={{ mb: 3 }}>
          Syntax
        </YTXTypography>
        <Box sx={{ mb: 4 }}>
          <CodeBox title="Terminal Usage">
            mdm policy [options]
            {/* [command] */}
          </CodeBox>
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

      {/* PRACTICAL EXAMPLES SECTION */}
      {/* <Box>
        <YTXTypography
          variant="h4"
          color="white"
          fontWeight={800}
          sx={{ mb: 4 }}
        >
          Common Examples
        </YTXTypography> */}

      {/* <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}> */}

      {/* <Box>
            <YTXTypography variant="h6" color="#00f5ff" sx={{ mb: 1 }}>
              Creating a Policy
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Create a new policy configuration from a local JSON definition
              file.
            </YTXTypography>
            <CodeBox> */}
      {/* mdm policy create  */}
      {/* --name "Kiosk-Mode-v1" --file
              ./configs/kiosk.json */}
      {/* </CodeBox>
          </Box> */}

      {/* <Box>
            <YTXTypography variant="h6" color="#27c93f" sx={{ mb: 1 }}>
              Listing & Auditing
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Retrieve a list of all policies in JSON format for integration
              with other tools.
            </YTXTypography>
           
            <CodeBox>mdm policy list  */}
      {/* --json {'>'} active_policies.json */}
      {/* </CodeBox> */}
      {/* </Box>
        </Box>
      </Box> */}

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
            mdm policy --help
          </code>{' '}
          or check the API docs.
        </YTXTypography>
      </Box>
    </Box>
  );
}
