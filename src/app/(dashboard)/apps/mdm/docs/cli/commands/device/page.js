'use client';

import { Typography, Box } from '@mui/material';

const Code = ({ children }) => (
  <Box
    sx={{
      bgcolor: '#111',
      p: 3,
      borderRadius: 2,
      fontFamily: 'monospace',
      color: '#00f5ff',
      my: 2,
    }}
  >
    <code>$ {children}</code>
  </Box>
);

export default function DeviceCommands() {
  return (
    <>
      <Typography variant="h3" fontWeight={800} color="white" gutterBottom>
        device — Manage enrolled devices
      </Typography>

      <Typography variant="h5" color="white" sx={{ mt: 4 }}>
        List devices
      </Typography>
      <Code>mdm device list --output table</Code>

      <Typography variant="h5" color="white">
        Find lost devices
      </Typography>
      <Code>mdm device list --status lost</Code>

      <Typography variant="h5" color="white" sx={{ mt: 4 }}>
        Send remote command
      </Typography>
      <Code>mdm device command ABC123DEF lock --passcode 123456</Code>
    </>
  );
}
