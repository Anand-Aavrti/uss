'use client';

import React, { useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { usePathname } from 'next/navigation';
import { ArrowBack as ArrowBackIcon, ArrowForward as ArrowForwardIcon } from '@mui/icons-material';
import Link from 'next/link';
import YTXTypography from '../../../../../../modules/mdm/components/YTXTypography';

const pagesOrder = [
  { path: '/apps/mdm/docs/cli', title: 'Overview' },
  { path: '/apps/mdm/docs/cli/Installation', title: 'Installation' },
  { path: '/apps/mdm/docs/cli/Authentication', title: 'Authentication' },
  { path: '/apps/mdm/docs/cli/commands', title: 'commands' },
  { path: '/apps/mdm/docs/cli/commands/devices', title: 'Devices' },
  { path: '/apps/mdm/docs/cli/commands/enterprise', title: 'Enterprise' },
  { path: '/apps/mdm/docs/cli/commands/groups', title: 'Groups' },
  { path: '/apps/mdm/docs/cli/commands/playstore', title: 'Playstore' },
  { path: '/apps/mdm/docs/cli/commands/policy', title: 'Policy' },
  { path: '/apps/mdm/docs/cli/commands/tenant', title: 'Tenant' },
  { path: '/apps/mdm/docs/cli/commands/ticket', title: 'Ticket' },
  { path: '/apps/mdm/docs/cli/commands/user', title: 'User' },
  { path: '/apps/mdm/docs/cli/commands/wifi', title: 'Wifi' },
];

const CLILayout = ({ children }) => {
  const pathname = usePathname();

  // Fixed logic: Use a loop to find the most specific match (last matching index)
  let currentIndex = -1;
  for (let i = 0; i < pagesOrder.length; i++) {
    const page = pagesOrder[i];
    if (pathname === page.path || pathname.startsWith(page.path + '/')) {
      currentIndex = i;
    }
  }

  const prevPage = currentIndex > 0 ? pagesOrder[currentIndex - 1] : null;
  const nextPage = currentIndex < pagesOrder.length - 1 ? pagesOrder[currentIndex + 1] : null;

  useEffect(() => {
    console.log('next page: ', nextPage);
  }, [nextPage]);

  return (
    <Box>
      {children}
      {(prevPage || nextPage) && (
        <Box
          sx={{
            mt: 4,
            py: 4,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            // borderTop: "1px solid rgba(255,255,255,0.1)",
            // bgcolor: "rgba(255,255,255,0.02)",
          }}
        >
          {prevPage && (
            <Link href={prevPage.path} passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{
                  height: '60px', // ✅ fixed spelling + bigger
                  width: '260px', // ✅ wider
                  color: '#00f5ff',
                  borderColor: '#00f5ff',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '16px', // ✅ bigger text
                  '&:hover': {
                    borderColor: '#00f5ff',
                    bgcolor: 'rgba(0,245,255,0.04)',
                  },
                }}
              >
                Previous: {prevPage.title}
              </Button>
            </Link>
          )}
          {nextPage && (
            <Link href={nextPage.path} passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  height: '60px', // same height
                  width: '260px', // same width
                  bgcolor: '#00f5ff',
                  color: '#000',
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '16px', // bigger text
                  '&:hover': { bgcolor: '#00f5ff' },
                }}
              >
                Next: {nextPage.title}
              </Button>
            </Link>
          )}
        </Box>
      )}
      <Box sx={{ mt: 12, textAlign: 'center' }}>
        <YTXTypography variant="body2" color="grey.500">
          Need help? Email <strong style={{ color: '#00f5ff' }}>support@aavrti.com</strong> •{' '}
          <Link href="https://aavrti.com" style={{ color: '#00f5ff' }}>
            aavrti.com
          </Link>
        </YTXTypography>
      </Box>
    </Box>
  );
};

export default CLILayout;
