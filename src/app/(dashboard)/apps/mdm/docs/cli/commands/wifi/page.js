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
import TerminalOutput from '../../../../../../../../modules/mdm/components/TerminalOutput';
// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddNetworkIcon from '@mui/icons-material/AddToQueue';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import YTXTypography from '../../../../../../../../modules/mdm/components/YTXTypography';
import CodeBox from '../../../../../../../../modules/mdm/components/CodeBox';
import CodeCard from '../../../../../../../../modules/mdm/components/CodeCard';

// --- WIFI SUBCOMMAND DATA ---
const subCommands = [
  {
    cmd: 'create',
    syntax: 'mdm wifi create ',
    desc: 'Create a new WiFi network profile. Supports WPA2, WPA3, and Open security standards for corporate or guest access.',
    icon: <AddNetworkIcon sx={{ color: '#27c93f' }} />, // Green for creation
    options: [
      {
        flag: '--ssid <name>',
        desc: 'The unique name of the WiFi network (Required)',
      },
      {
        flag: '--password <val>',
        desc: 'Password for WPA/WPA2/WPA3 networks',
      },
      {
        flag: '--security <type>',
        desc: "Type: 'wpa2' (default), 'wpa3', 'open'",
      },
      {
        flag: '--hidden',
        desc: 'Connect to a hidden network (non-broadcasting SSID)',
      },
    ],
  },
  {
    cmd: 'list',
    syntax: 'mdm wifi list ',
    desc: 'View all configured WiFi networks. Check security types and distribution status across your fleet.',
    icon: <ListIcon sx={{ color: '#fff' }} />,
    options: [
      {
        flag: '--json',
        desc: 'Output the network list in raw JSON format',
      },
      {
        flag: '--security <type>',
        desc: "Filter results by security type (e.g., 'wpa2')",
      },
    ],
  },
  {
    cmd: 'update',
    syntax: 'mdm wifi update <id>',
    desc: 'Modify an existing WiFi profile. Update passwords or SSIDs without redeploying the entire profile.',
    icon: <EditIcon sx={{ color: '#ffbd2e' }} />, // Yellow/Orange for edit
    options: [
      {
        flag: '<id>',
        desc: 'The unique ID of the WiFi profile (Required)',
      },
      {
        flag: '--password <new>',
        desc: 'Set a new password for the network',
      },
      {
        flag: '--hidden <bool>',
        desc: 'Toggle hidden network status (true/false)',
      },
    ],
  },
  {
    cmd: 'delete',
    syntax: 'mdm wifi delete <id>',
    desc: 'Permanently remove a WiFi profile. Devices will no longer auto-connect to this network.',
    icon: <DeleteOutlineIcon sx={{ color: '#ff5f56' }} />, // Red for delete
    options: [
      {
        flag: '<id>',
        desc: 'The unique ID of the WiFi profile (Required)',
      },
      {
        flag: '--force',
        desc: 'Skip confirmation prompt',
      },
    ],
  },
];

// --- MAIN PAGE COMPONENT ---
export default function WifiPage() {
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
      <Box sx={{ mb: 10 }}>
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
          sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' }, mb: 2, mt: 8 }}
        >
          WiFi Management
        </YTXTypography>
        <YTXTypography variant="h5" color="grey.400" sx={{ maxWidth: '100%', lineHeight: 1.6 }}>
          Configure connectivity for your entire fleet. Create specific corporate networks, manage
          guest access, and handle WPA security protocols securely from the CLI.
        </YTXTypography>
      </Box>

      {/* QUICK SYNTAX */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography variant="h5" color="white" fontWeight={700} sx={{ mb: 3 }}>
          Syntax
        </YTXTypography>
        <Box sx={{ mb: 4 }}>
          <CodeBox title="Terminal Usage">
            mdm wifi [options]
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
      <Box>
        <YTXTypography variant="h4" color="white" fontWeight={800} sx={{ mb: 4 }}>
          Common Examples
        </YTXTypography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Example 1: Corporate WiFi */}
          <Box>
            <YTXTypography variant="h6" color="#00f5ff" sx={{ mb: 1 }}>
              1 Create a Wifi Network
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Deploy a standard corporate network to all devices.
            </YTXTypography>
            <TerminalOutput>
              {`user2@USER2-PC:~$ mdm wifi create
? WiFi Name (SSID): Aavrti123
? Security Type: WPA2
? Password: [hidden]
? Hidden Network? Yes
? Auto-connect? Yes

WiFi Network Created Successfully!

ID:   2b6775a8-da2b-422d-beed-f078ec34ca3a
SSID: Aavrti123`}
            </TerminalOutput>
          </Box>

          {/* Example 2: Hidden Network */}
          <Box>
            <YTXTypography variant="h6" color="#ffbd2e" sx={{ mb: 1 }}>
              2. List All Wifi Networks
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Display all the Available Wifi Networks
            </YTXTypography>

            <TerminalOutput>
              {/* mdm wifi create --ssid "YTX-Admin-Only" --password "AdminKey99"
              --hidden */}
              {`user2@USER2-PC:~$ mdm wifi list
Configured WiFi Networks (3):

╔══════════════════════════════════════╤═══════════╤══════════╤═════════╤═══════════╗
║ ID                                   │ SSID      │ Security │ Hidden  │ Auto-Join ║
╟──────────────────────────────────────┼───────────┼──────────┼─────────┼───────────╢
║ 2b6775a8-da2b-422d-beed-f078ec34ca3a │ Aavrti123 │ WPA2     │ Hidden  │ Yes       ║
║ 76eb1636-41e0-4185-af75-4d079126b30e │ Aavrti123 │ WPA3     │ Hidden  │ Yes       ║
║ ea163d9f-55cd-49ef-980c-72a1c374606b │ wifi1     │ WPA2     │ Visible │ Yes       ║
╚══════════════════════════════════════╧═══════════╧══════════╧═════════╧═══════════╝`}
            </TerminalOutput>
          </Box>

          {/* Example 3: Update */}

          <Box>
            <YTXTypography variant="h6" color="#ffbd2e" sx={{ mb: 1 }}>
              3. Update Wifi Network
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Modify an existing WiFi network's SSID, security type, password, or hidden status.
            </YTXTypography>
            <TerminalOutput>
              {`user2@USER2-PC:~$ mdm wifi update 2b6775a8-da2b-422d-beed-f078ec34ca3a 
? New SSID: newId 
? New Security Type: WPA2 
? New Password: [hidden] 
? Hidden? Yes 
WiFi network updated successfully!`}
            </TerminalOutput>
          </Box>

          {/* Example 4: Deletion */}

          <Box>
            <YTXTypography variant="h6" color="#ffbd2e" sx={{ mb: 1 }}>
              4. Delete Wifi Network
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Remove a WiFi network configuration permanently after confirmation.
            </YTXTypography>
            <TerminalOutput>
              {`user2@USER2-PC:~$ mdm wifi delete 2b6775a8-da2b-422d-beed-f078ec34ca3a
? Delete WiFi network ec34ca3a permanently? Yes
WiFi network deleted permanently
`}
            </TerminalOutput>
          </Box>

          {/* Example 5: help */}

          <Box>
            <YTXTypography variant="h6" color="#ffbd2e" sx={{ mb: 1 }}>
              5. Help Command
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Display usage information, options, and available commands for WiFi management.
            </YTXTypography>
            <TerminalOutput>
              {`user2@USER2-PC:~$ mdm wifi help
Usage: mdm wifi [options] [command]

Corporate & Guest WiFi Management

Options:
  -h, --help      display help for command

Commands:
  create          Create new WiFi network (WPA2/WPA3/Open)
  list [options]  List all configured WiFi networks
  update <id>     Update WiFi network settings
  delete <id>     Delete WiFi network permanently
  help [command]  display help for command

   mdm wifi create   → Add secure corporate/guest WiFi
   mdm wifi list     → View all networks with security details
   mdm wifi update   → Change SSID, password, or visibility
   mdm wifi delete   → Remove network permanently

`}
            </TerminalOutput>
          </Box>

          {/* <Box>
            <YTXTypography variant="h6" color="#ff5f56" sx={{ mb: 1 }}>
              Revoke Access
            </YTXTypography>
            <YTXTypography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Remove a WiFi profile to prevent devices from auto-connecting.
            </YTXTypography>
            <CodeBox>mdm wifi delete wifi_profile_abc123</CodeBox>
          </Box> */}
        </Box>
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
            mdm wifi --help
          </code>{' '}
          or check the API docs.
        </YTXTypography>
      </Box>
    </Box>
  );
}
