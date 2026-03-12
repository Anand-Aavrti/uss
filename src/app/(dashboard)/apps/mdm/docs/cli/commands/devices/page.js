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
  Button,
  Typography, // Added Typography import
} from '@mui/material';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ListIcon from '@mui/icons-material/List';
import YTXTypography from '../../../../../../../../modules/mdm/components/YTXTypography';
import CodeBox from '../../../../../../../../modules/mdm/components/CodeBox';
import Link from 'next/link';
import CodeCard from '../../../../../../../../modules/mdm/components/CodeCard';

const subCommands = [
  {
    cmd: 'list',
    syntax: 'mdm device list ',
    desc: 'View a paginated list of all enrolled devices. Filter by status or group to narrow down your search.',
    icon: <ListIcon sx={{ color: '#fff' }} />,
    options: [
      {
        flag: '--status <val>',
        desc: "Filter by status: 'online', 'offline', 'unknown'",
      },
      {
        flag: '--group <id>',
        desc: 'Show devices only from a specific Group ID',
      },
      { flag: '--json', desc: 'Output the list in raw JSON format' },
    ],
  },
  {
    cmd: 'lock',
    syntax: 'mdm device lock <deviceId>',
    desc: 'Instantly lock the device screen. You can optionally display a message on the lock screen.',
    icon: <SecurityIcon sx={{ color: '#ff5f56' }} />,
    options: [
      { flag: '<deviceId>', desc: 'The unique ID of the device (Required)' },
      {
        flag: '--message <txt>',
        desc: 'Custom text to display on the lock screen',
      },
      {
        flag: '--phone <num>',
        desc: 'Phone number to display for return contact',
      },
    ],
  },
  {
    cmd: 'wipe',
    syntax: 'mdm device wipe <deviceId>',
    desc: 'Factory reset the device. This clears all user data and enterprise profiles.',
    icon: <SecurityIcon sx={{ color: '#ff5f56' }} />,
    options: [
      { flag: '<deviceId>', desc: 'The unique ID of the device (Required)' },
      { flag: '--force', desc: 'Skip the interactive confirmation prompt' },
      {
        flag: '--keep-enroll',
        desc: 'Wipe data but re-enroll automatically on boot',
      },
    ],
  },
  {
    cmd: 'reboot',
    syntax: 'mdm device reboot <deviceId>',
    desc: 'Remotely restart the device. Useful for clearing temporary cache issues.',
    icon: <RestartAltIcon sx={{ color: '#27c93f' }} />,
    options: [{ flag: '<deviceId>', desc: 'The unique ID of the device (Required)' }],
  },
  {
    cmd: 'brightness',
    syntax: 'mdm device brightness <deviceId> <level>',
    desc: 'Set the screen brightness level remotely.',
    icon: <SettingsBrightnessIcon sx={{ color: '#ffbd2e' }} />,
    options: [
      { flag: '<deviceId>', desc: 'The unique ID of the device (Required)' },
      {
        flag: '<level>',
        desc: 'Integer value: 0 (darkest) to 255 (brightest)',
      },
    ],
  },
  {
    cmd: 'enroll-qr',
    syntax: 'mdm device enroll-qr ',
    desc: 'Generate a Zero-Touch QR Code to enroll new devices.',
    icon: <QrCodeIcon sx={{ color: '#00f5ff' }} />,
    options: [
      { flag: '--ssid <name>', desc: 'Embed Wi-Fi SSID into the QR code' },
      {
        flag: '--password <pw>',
        desc: 'Embed Wi-Fi password into the QR code',
      },
      {
        flag: '--expire <min>',
        desc: 'Set QR code expiration time in minutes',
      },
    ],
  },
];

// --- 3. MAIN PAGE COMPONENT ---
export default function DevicePage() {
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
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Link href="/apps/mdm/docs/cli/Commands" passHref>
            <Button
              startIcon={<ArrowBackIcon />}
              sx={{
                color: 'grey.400',
                textTransform: 'none',
                fontWeight: 600,
                mb: 2,
              }}
            >
              Back to ClI
            </Button>
          </Link>
          {/* <Chip
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
          </YTXTypography> */}
        </Box>
        <YTXTypography
          variant="h2"
          fontWeight={900}
          color="white"
          sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2 }}
        >
          Device Control
        </YTXTypography>
        <YTXTypography variant="h5" color="grey.400" sx={{ maxWidth: '100%', lineHeight: 1.6 }}>
          Full remote device control directly from your terminal. Manage screen states, security
          actions, and inventory without leaving the command line.
        </YTXTypography>
      </Box>

      {/* QUICK INSTALL / USAGE */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography variant="h5" color="white" fontWeight={700} sx={{ mb: 3 }}>
          Syntax
        </YTXTypography>
        <CodeBox title="Terminal Usage">mdm device [options] </CodeBox>
        {/* [command] */}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 8 }} />

      {/* SUBCOMMANDS GRID - REDESIGNED */}
      <Box sx={{ mb: 10 }}>
        <YTXTypography variant="h4" color="white" fontWeight={800} sx={{ mb: 4 }}>
          Available Commands
        </YTXTypography>

        <Grid container spacing={4}>
          {subCommands.map((item) => (
            <Grid item xs={12} lg={6} key={item.cmd}>
              <CodeCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* PRACTICAL EXAMPLES SECTION */}
      <Box>
        {/* <YTXTypography
          variant="h4"
          color="white"
          fontWeight={800}
          sx={{ mb: 4 }}
        >
          Common Examples
        </YTXTypography> */}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Example 1: Basics */}
          {/* <Box>
            <YTXTypography variant="h6" color="#00f5ff" sx={{ mb: 1 }}>
              Inventory & Status
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              List all devices or filter by status to get a quick overview of
              your fleet.
            </YTXTypography>
            <CodeBox>mdm device list --status online</CodeBox>
          </Box> */}

          {/* Example 2: Screen Controls */}
          {/* <Box>
            <YTXTypography variant="h6" color="#00f5ff" sx={{ mb: 1 }}>
              Screen Management
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Adjust brightness levels (0-255) or toggle screen power for
              kiosks.
            </YTXTypography>
            <CodeBox>
              {`mdm device brightness ABC-123 200
mdm device screen-off ABC-123
mdm device screen-on ABC-123`}
            </CodeBox>
          </Box> */}

          {/* Example 3: Security */}
          {/* <Box>
            <YTXTypography variant="h6" color="#ff5f56" sx={{ mb: 1 }}>
              Emergency Actions
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Critical security controls. <strong>Use with caution.</strong>
            </YTXTypography>
            <CodeBox>
              {`mdm device lock ABC-123 --message "Return to IT Dept"
mdm device wipe ABC-123 --force`}
            </CodeBox>
          </Box> */}
        </Box>
      </Box>

      {/* Footer Support Link */}
      <Box
        sx={{
          mt: 10,
          pt: 4,
          borderTop: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
        }}
      >
        <YTXTypography color="grey.600" fontSize="0.9rem">
          Missing a command? Check the{' '}
          <span style={{ color: '#00f5ff', cursor: 'pointer' }}>API Reference</span> or run{' '}
          <code
            style={{
              background: '#222',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            mdm device --help
          </code>
        </YTXTypography>
      </Box>
    </Box>
  );
}
