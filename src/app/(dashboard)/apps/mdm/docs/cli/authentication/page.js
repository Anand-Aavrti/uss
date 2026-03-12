// app/(docs)/cli/page.js
'use client';
import { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  Button,
  Divider,
  Chip,
  Paper,
  List,
  ListItem,
  ListItemText,
  Fade,
  Stack,
  Tooltip,
  Snackbar,
  Alert,
  IconButton,
  Grid,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import YTXTypography from '../../../../../../../modules/mdm/components/YTXTypography';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForwardIos';
import CodeBox from '../../../../../../../modules/mdm/components/CodeBox';
function page() {
  return (
    <Box sx={{ mt: 5 }}>
      {/* --- AUTHENTICATION SECTION (NEW) --- */}
      <YTXTypography variant="h3" fontWeight={800} color="white" sx={{ mb: 3 }}>
        Authentication
      </YTXTypography>
      <YTXTypography color="grey.300" fontSize="1.2rem" sx={{ mb: 5 }}>
        Before managing your fleet, you need to authorize the CLI. We use a secure web-based login
        flow to link your terminal session with your Yantrix tenant.
      </YTXTypography>

      {/* Authentication */}

      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <YTXTypography variant="h6" color="#27c93f" sx={{ mb: 1, fontSize: '1.5rem' }}>
            1. Login
          </YTXTypography>
          <YTXTypography color="grey.400" sx={{ mb: 2, fontSize: '1.2rem' }}>
            Opens your browser to the MDM login portal. Sign in with your standard credentials.
          </YTXTypography>
          <CodeBox sx={{ width: '100%' }}>mdm login</CodeBox>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <YTXTypography variant="h6" color="#00f5ff" sx={{ mb: 1, fontSize: '1.5rem' }}>
            2. Verify Session
          </YTXTypography>
          <YTXTypography color="grey.400" sx={{ mb: 2, fontSize: '1.2rem' }}>
            Confirm your identity, active role, and current tenant ID.
          </YTXTypography>
          <CodeBox sx={{ width: '100%' }}>mdm whoami</CodeBox>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <YTXTypography variant="h6" color="#ff5f56" sx={{ mb: 1, fontSize: '1.5rem' }}>
            3. Logout
          </YTXTypography>
          <YTXTypography color="grey.400" sx={{ mb: 2, fontSize: '1.2rem' }}>
            Securely remove your session tokens from the local machine.
          </YTXTypography>
          <CodeBox sx={{ width: '100%' }}>mdm logout</CodeBox>
        </Box>
      </Grid>
    </Box>
  );
}

export default page;
