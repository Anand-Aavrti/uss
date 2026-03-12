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
      {/* --- INSTALLATION SECTION --- */}
      <YTXTypography variant="h3" fontWeight={800} color="white" sx={{ mb: 3 }}>
        Installation
      </YTXTypography>
      <YTXTypography color="grey.300" fontSize="1.2rem" sx={{ mb: 3 }}>
        Get started quickly with our CLI tool. It's designed for cross-platform compatibility
        (Windows, macOS, Linux).
      </YTXTypography>
      <YTXTypography variant="h6" color="#00f5ff" sx={{ mb: 2, fontSize: '1.5rem' }}>
        Step 1: Install Globally
      </YTXTypography>
      <CodeBox>npm install -g @yantramatrix/aavrti</CodeBox>

      <YTXTypography variant="h6" color="#00f5ff" sx={{ mb: 2, fontSize: '1.5rem', mt: 4 }}>
        Step 2: Verify Installation
      </YTXTypography>
      <CodeBox>mdm --version</CodeBox>

      <YTXTypography color="grey.300" fontSize="1.2rem" sx={{ mt: 4, mb: 2 }}>
        <strong>Pro Tip:</strong> If you're behind a corporate proxy, add{' '}
        <Box
          component="span"
          sx={{
            fontFamily: 'monospace',
            bgcolor: 'rgba(0,245,255,0.1)',
            color: '#00f5ff',
            px: 1,
            borderRadius: 1,
          }}
        >
          --registry https://registry.npmjs.org/
        </Box>{' '}
        to the npm install command.
      </YTXTypography>
    </Box>
  );
}

export default page;
