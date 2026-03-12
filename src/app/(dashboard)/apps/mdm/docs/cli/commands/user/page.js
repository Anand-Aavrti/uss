'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Divider,
  IconButton,
  Snackbar,
  Alert,
  Paper,
  Typography,
  Chip,
  Button,
} from '@mui/material';
import Link from 'next/link';
// Icons
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import LockResetIcon from '@mui/icons-material/LockReset';
import CodeBox from '../../../../../../../../modules/mdm/components/CodeBox';
import YTXTypography from '../../../../../../../../modules/mdm/components/YTXTypography';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CodeCard from '../../../../../../../../modules/mdm/components/CodeCard';

// --- USER SUBCOMMAND DATA ---
const subCommands = [
  {
    cmd: 'invite',
    syntax: 'mdm user invite <email>',
    desc: 'Invite a new user to your organization. The user will receive an email verification link to set up their account.',
    icon: <PersonAddIcon sx={{ color: '#27c93f' }} />, // Green for add
    options: [
      {
        flag: '<email>',
        desc: 'The email address of the new user (Required)',
      },
      {
        flag: '--role <role>',
        desc: 'Initial role assignment (admin, manager, user, viewer)',
      },
    ],
  },
  {
    cmd: 'list',
    syntax: 'mdm user list [options]',
    desc: 'View a directory of all users in the current tenant, including their active roles and status.',
    icon: <PeopleAltIcon sx={{ color: '#fff' }} />,
    options: [
      {
        flag: '--json',
        desc: 'Output the user list in raw JSON format',
      },
      {
        flag: '--role <val>',
        desc: "Filter users by specific role (e.g., 'admin')",
      },
    ],
  },
  {
    cmd: 'role',
    syntax: 'mdm user role <email> <role>',
    desc: "Update an existing user's permission level. Changes take effect immediately upon next login.",
    icon: <ManageAccountsIcon sx={{ color: '#ffbd2e' }} />, // Yellow for modify
    options: [
      {
        flag: '<email>',
        desc: 'The email address of the user (Required)',
      },
      {
        flag: '<role>',
        desc: "New role: 'admin', 'manager', 'user', 'viewer'",
      },
    ],
  },
  {
    cmd: 'password',
    syntax: 'mdm user password <email>',
    desc: 'Trigger a password reset flow. Generates a secure link that can be sent to the user manually if needed.',
    icon: <LockResetIcon sx={{ color: '#00f5ff' }} />, // Blue for security
    options: [
      {
        flag: '<email>',
        desc: 'The email address of the user (Required)',
      },
    ],
  },
  {
    cmd: 'delete',
    syntax: 'mdm user delete <email>',
    desc: 'Permanently remove a user from the tenant. This revokes all access tokens immediately.',
    icon: <PersonRemoveIcon sx={{ color: '#ff5f56' }} />, // Red for delete
    options: [
      {
        flag: '<email>',
        desc: 'The email address of the user to remove (Required)',
      },
    ],
  },
  {
    cmd: 'help',
    syntax: 'mdm user help [command]',
    desc: 'display help for command',
    icon: <HelpOutlineIcon />,
  },
];

// --- MAIN PAGE COMPONENT ---
export default function Page() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 4 },
        px: { xs: 2, md: 0 },
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      {/* HEADER SECTION - Cleaned up */}
      <Box sx={{ mb: 8 }}>
        <Link href="/apps/mdm/docs/cli/Commands" passHref>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              color: 'grey.400',
              textTransform: 'none',
              fontWeight: 600,
              mb: 3,
            }}
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
          User Management
        </YTXTypography>
        <YTXTypography variant="h5" color="grey.400" sx={{ maxWidth: '100%', lineHeight: 1.6 }}>
          Manage team access and permissions within your tenant. Invite new admins, assign roles,
          and handle account security directly from the command line.
        </YTXTypography>
      </Box>

      {/* QUICK SYNTAX */}
      <Box sx={{ mb: 8 }}>
        <YTXTypography variant="h5" color="white" fontWeight={700} sx={{ mb: 3 }}>
          Syntax
        </YTXTypography>
        <Box sx={{ mb: 4 }}>
          <CodeBox title="Terminal Usage">
            mdm user [options]
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
            mdm user --help
          </code>{' '}
          or check the API docs.
        </YTXTypography>
      </Box>
    </Box>
  );
}

{
  /* Options List */
}
{
  /* <Box sx={{ px: 3, pb: 3, flexGrow: 1 }}>
                  <YTXTypography
                    variant="caption"
                    color="grey.500"
                    fontWeight={700}
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      mb: 2,
                      display: "block",
                    }}
                  >
                    Options
                  </YTXTypography>
                  <Box component="ul" sx={{ p: 0, m: 0, listStyle: "none" }}>
                    {item.options.map((opt, i) => (
                      <Box
                        component="li"
                        key={i}
                        sx={{
                          display: "flex",
                          flexDirection: { xs: "column", sm: "row" },
                          mb: 2,
                          gap: { xs: 0.5, sm: 2 },
                        }}
                      >
                        <Box sx={{ minWidth: "160px" }}>
                          <Chip
                            label={opt.flag}
                            size="small"
                            sx={{
                              fontFamily: "monospace",
                              bgcolor: "rgba(255,255,255,0.08)",
                              color: "grey.200",
                              borderRadius: 1,
                              height: "24px",
                              "& .MuiChip-label": { px: 1 },
                            }}
                          />
                        </Box>
                        <YTXTypography
                          variant="body2"
                          color="grey.500"
                          sx={{ flex: 1, fontSize: "0.9rem" }}
                        >
                          {opt.desc}
                        </YTXTypography>
                      </Box>
                    ))}
                  </Box>
                </Box> */
}

{
  /* <Paper
                elevation={0}
                sx={{
                  p: 0,
                  bgcolor: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 3,
                  width: { xs: "100%", md: "560px" },
                  minWidth: "auto",
                  maxWidth: "100%",
                  mx: "auto", 
                  height: "100%", 
                  overflow: "hidden",
                  transition: "all 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  "&:hover": {
                    bgcolor: "rgba(255,255,255,0.04)",
                    borderColor: "#00f5ff",
                    boxShadow: "0 10px 40px -10px rgba(0,245,255,0.1)",
                  },
                }}
              >
                
                <Box
                  sx={{
                    p: 3,
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1,
                        bgcolor: "rgba(255,255,255,0.05)",
                        borderRadius: 2,
                        display: "flex",
                        color: "#00f5ff",
                      }}
                    >
                      {item.icon}
                    </Box>
                    <YTXTypography
                      variant="h5"
                      color="white"
                      fontFamily="monospace"
                      fontWeight={700}
                      sx={{zIndex:1}}
                    >
                      {item.cmd}
                    </YTXTypography>
                  </Box>
                  <YTXTypography
                    variant="body1"
                    color="grey.400"
                    lineHeight={1.6}
                    sx={{mt:3}}
                  >
                    {item.desc}
                  </YTXTypography>
                </Box>

                
                <Box sx={{ px: 3, pt: 1 }}>
                  <CodeBox>{item.syntax}</CodeBox>
                </Box>

                
              </Paper> */
}
