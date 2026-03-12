/* eslint-disable react/no-unescaped-entities */
'use client';
import React from 'react';
import { Box, Typography as YTXTypography, Divider, Grid, Button, Link } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const CLIPage = () => {
  return (
    <Box sx={{ py: { xs: 6, md: 2 }, px: { xs: 2, md: 0 } }}>
      {/* Back Button */}
      <Box sx={{ mb: 4 }}>
        <Link href="/apps/mdm/docs" passHref>
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{ color: 'grey.400', textTransform: 'none', fontWeight: 600 }}
          >
            Back to Documentation
          </Button>
        </Link>
      </Box>

      {/* Header */}
      <YTXTypography
        variant="h3"
        fontWeight={900}
        color="white"
        sx={{ mb: 2, fontSize: { xs: '2.8rem', md: '4rem' } }}
      >
        Yantrix CLI Overview
      </YTXTypography>

      <YTXTypography color="grey.300" fontSize="1.2rem" sx={{ mb: 6 }}>
        The Yantrix Command Line Interface (CLI) is a powerful tool designed for efficient
        management of mobile device fleets directly from the terminal. It streamlines administrative
        tasks, enabling seamless integration into automated workflows, scripts, and daily operations
        without relying on a graphical user interface.
      </YTXTypography>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', mb: 6 }} />

      {/* Getting Started Process */}
      <YTXTypography variant="h4" fontWeight={800} color="white" sx={{ mb: 3 }}>
        Getting Started
      </YTXTypography>
      <YTXTypography color="grey.300" fontSize="1.1rem" sx={{ mb: 4, lineHeight: 1.7 }}>
        Engaging with the Yantrix CLI follows a straightforward three-phase process. First,
        installation ensures the tool is readily available across supported platforms, including
        Windows, macOS, and Linux. This step prepares your environment for immediate use. Next,
        authentication establishes a secure connection to your Yantrix tenant, verifying your
        identity and granting access to your organization's resources. Finally, with credentials in
        place, you can dive into management operations, leveraging the CLI's intuitive syntax to
        handle devices, policies, and compliance at scale. This phased approach minimizes setup time
        and maximizes productivity from the outset.
      </YTXTypography>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 6 }} />

      {/* Authentication Overview */}
      <YTXTypography variant="h4" fontWeight={800} color="white" sx={{ mb: 3 }}>
        Authentication
      </YTXTypography>
      <YTXTypography color="grey.300" fontSize="1.1rem" sx={{ mb: 4, lineHeight: 1.7 }}>
        Security is paramount in fleet management, and the CLI's authentication mechanism reflects
        this by utilizing a browser-integrated flow for credential validation. This process links
        your local session to the Yantrix platform securely, supporting multi-tenant environments
        and role-based access. Once authenticated, session management allows for easy verification
        of your current context—such as active tenant and permissions—and provides options for
        graceful session termination when needed. This ensures that sensitive operations remain
        protected while keeping administrative friction low.
      </YTXTypography>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.1)', my: 6 }} />

      {/* Management Commands Overview */}
      <YTXTypography variant="h4" fontWeight={800} color="white" sx={{ mb: 3 }}>
        Management Capabilities
      </YTXTypography>
      <YTXTypography color="grey.300" fontSize="1.1rem" sx={{ mb: 4, lineHeight: 1.7 }}>
        At its core, the CLI excels in delivering robust management commands tailored for MDM
        administrators. These encompass device lifecycle operations, such as enrollment, monitoring,
        and remote actions; policy enforcement to maintain compliance and restrict unauthorized
        access; and app lifecycle management for distribution and updates. Group-based workflows
        enable targeted interventions across subsets of your fleet, while reporting tools provide
        insights into device status and usage patterns. Designed for extensibility, these commands
        support scripting and automation, allowing you to build custom solutions for recurring tasks
        like compliance audits or bulk configurations. Whether handling a handful of devices or
        thousands, the CLI adapts to your scale with precision and efficiency.
      </YTXTypography>

      {/* Explore Further */}
      <YTXTypography variant="h5" fontWeight={700} color="#00f5ff" sx={{ mb: 3, mt: 6 }}>
        Ready to Explore?
      </YTXTypography>
      <YTXTypography color="grey.400" fontSize="1.1rem" sx={{ mb: 6, lineHeight: 1.6 }}>
        For detailed guidance on implementation, dive into the dedicated sections below. Each covers
        practical aspects to help you leverage the full potential of the Yantrix CLI.
      </YTXTypography>

      <Grid container spacing={3} sx={{ mb: 8 }}>
        <Grid item xs={12} md={4}>
          <Link href="/apps/mdm/docs/cli/installation" passHref style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                p: 3,
                bgcolor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                height: '100%',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#00f5ff',
                  boxShadow: '0 4px 20px rgba(0,245,255,0.1)',
                },
              }}
            >
              <YTXTypography variant="h6" color="white" sx={{ mb: 2 }}>
                Installation
              </YTXTypography>
              <YTXTypography color="grey.400">
                Set up the CLI on your system for cross-platform compatibility.
              </YTXTypography>
            </Box>
          </Link>
        </Grid>

        <Grid item xs={12} md={4}>
          <Link
            href="/apps/mdm/docs/cli/authentication"
            passHref
            style={{ textDecoration: 'none' }}
          >
            <Box
              sx={{
                p: 3,
                bgcolor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                height: '100%',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#00f5ff',
                  boxShadow: '0 4px 20px rgba(0,245,255,0.1)',
                },
              }}
            >
              <YTXTypography variant="h6" color="white" sx={{ mb: 2 }}>
                Authentication
              </YTXTypography>
              <YTXTypography color="grey.400">
                Connect securely to your Yantrix tenant and manage sessions.
              </YTXTypography>
            </Box>
          </Link>
        </Grid>

        <Grid item xs={12} md={4}>
          <Link href="/apps/mdm/docs/cli/commands" passHref style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                p: 3,
                bgcolor: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 2,
                height: '100%',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: '#00f5ff',
                  boxShadow: '0 4px 20px rgba(0,245,255,0.1)',
                },
              }}
            >
              <YTXTypography variant="h6" color="white" sx={{ mb: 2 }}>
                Commands Reference
              </YTXTypography>
              <YTXTypography color="grey.400">
                Discover the full suite of tools for device and policy management.
              </YTXTypography>
            </Box>
          </Link>
        </Grid>
      </Grid>

      {/* Pro Tip */}
      {/* <Box
        sx={{
          mt: 10,
          p: 5,
          bgcolor: "rgba(0,245,255,0.06)",
          borderRadius: 4,
          border: "1px dashed #00f5ff",
        }}
      >
        <YTXTypography variant="h6" color="#00f5ff" sx={{ mb: 3 }}>
          Pro Tip: Integrate with Automation
        </YTXTypography>
        <YTXTypography color="grey.400" sx={{ lineHeight: 1.6 }}>
          The CLI pairs effortlessly with scripting languages and CI/CD pipelines, enabling automated fleet maintenance and real-time reporting tailored to your operational needs.
        </YTXTypography>
      </Box> */}

      {/* Footer */}
    </Box>
  );
};

export default CLIPage;
