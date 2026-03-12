"use client";

import {
  Box,
  Container,
  CssBaseline,
  IconButton,
  TextField,
  InputAdornment,
  Menu,
  MenuItem,
  CircularProgress,
  Breadcrumbs,
} from "@mui/material";
import DocsSidebar from "./DocsSidebar";
import React, { useRef, useEffect } from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { DrawerContext } from "@/context/DrawerContext";
import { useDrawer } from "@/context/DrawerContext";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";
import DocsSearch from "./DocsSearch";
import YTXTypography from "../components/YTXTypography";
export default function DocsShell({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchRef = useRef(null);
  const [searchIndex, setSearchIndex] = useState([]);
  const { onToggle } = useDrawer();
  const pathname = usePathname();
  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleClose = () => setAnchorEl(null);

  const segments = pathname.split("/").filter(Boolean);
  const showBreadcrumbs = segments.length > 1 && segments[0] === "docs";

  const breadcrumbItems = showBreadcrumbs
    ? segments.map((segment, index) => {
        const to = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;
        const displayText =
          segment.charAt(0).toUpperCase() +
          segment
            .slice(1)
            .replace(/([A-Z])/g, " $1")
            .trim();

        if (isLast) {
          return (
            <YTXTypography
              key={to}
              color="white"
              fontWeight={600}
              sx={{ fontSize: "0.95rem" }}
            >
              {displayText}
            </YTXTypography>
          );
        }

        return (
          <Link
            key={to}
            underline="hover"
            color="grey.400"
            href={to}
            sx={{
              mt: 10,
              fontSize: "0.95rem",
              fontWeight: 500,
              cursor: "pointer",
              transition: "color 0.2s ease",
              "&:hover": {
                color: "#00f5ff",
              },
            }}
          >
            {displayText}
          </Link>
        );
      })
    : null;
  return (
    <>
      <CssBaseline />
      <DrawerContext.Provider value={{ onToggle: handleDrawerToggle }}>
        <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0a0e17" }}>
          <DocsSidebar
            mobileOpen={mobileOpen}
            onDrawerToggle={handleDrawerToggle}
          />

          {/* Fixed Sticky Search - Always Visible at Viewport Top */}

          <DocsSearch handleDrawerToggle={handleDrawerToggle} />
          {/* <Box
            sx={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              zIndex: 100,
              mb: 20,
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              py: { xs: 1.5, md: 2 }, 
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Container
              maxWidth="xl"
              sx={{
                display: "flex",
                alignItems: "center", 
                justifyContent: "center",
                gap: 2, 
                px: { xs: 2, md: 0 },
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: "white",
                  display: { xs: "flex", md: "none" }, 
                  zIndex: 110,
                }}
              >
                <MenuIcon />
              </IconButton>

              <TextField
                inputRef={searchRef}
                fullWidth
                placeholder="Search documentation..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setAnchorEl(searchRef.current); 
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon sx={{ color: "grey.500" }} />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{
                  width: "100%",
                  maxWidth: { xs: "100%", sm: 500, md: 600, lg: 700 }, 
                  "& .MuiOutlinedInput-root": {
                    height: { xs: 52, md: 42 }, 
                    bgcolor: "rgba(255,255,255,0.05)",
                    borderRadius: 4,
                    border: "1px solid rgba(255,255,255,0.15)",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                    color: "white",
                    "&:hover": { borderColor: "#00f5ff" },
                    "&.Mui-focused": {
                      borderColor: "#00f5ff",
                      boxShadow: "0 0 0 4px rgba(0,245,255,0.25)",
                    },
                  },
                }}
              />

              <Menu
                anchorEl={searchRef.current} 
                open={Boolean(anchorEl) && searchResults.length > 0}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
                PaperProps={{
                  sx: {
                    width: "100%",
                    maxWidth: { xs: "100%", sm: 500, md: 600, lg: 700 },
                    maxHeight: 400,
                    mt: 1,
                    bgcolor: "rgba(2, 8, 16, 0.98)",
                    border: "1px solid rgba(0,245,255,0.2)",
                    borderRadius: 2,
                  },
                }}
              >
                {isLoading ? (
                  <Box sx={{ p: 3, textAlign: "center" }}>
                    <CircularProgress size={24} sx={{ color: "#00f5ff" }} />
                    <YTXYTXTypography
                      variant="body2"
                      color="grey.500"
                      sx={{ mt: 1 }}
                    >
                      Searching...
                    </YTXYTXTypography>
                  </Box>
                ) : (
                  searchResults.map((result) => (
                    <MenuItem
                      key={result.id}
                      onClick={handleClose}
                      component={Link}
                      href={result.path}
                      sx={{ whiteSpace: "normal" }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <YTXYTXTypography
                          variant="subtitle1"
                          fontWeight={600}
                          color="white"
                        >
                          {result.title}
                        </YTXYTXTypography>

                        <YTXYTXTypography
                          variant="body2"
                          color="grey.400"
                          sx={{ lineHeight: 1.4, mt: 0.5 }}
                        >
                          {result.snippet}
                        </YTXYTXTypography>

                        <YTXYTXTypography variant="caption" color="grey.600">
                          {result.path}
                        </YTXYTXTypography>
                      </Box>
                    </MenuItem>
                  ))
                )}
              </Menu>
            </Container>
          </Box> */}

          <Container maxWidth="lg" sx={{ mt: 5 }}>
            {showBreadcrumbs && (
              <Breadcrumbs
                separator={
                  <ChevronRightIcon
                    fontSize="small"
                    sx={{ color: "grey.500", mx: 0.5 }}
                  />
                }
                aria-label="breadcrumb"
                sx={{
                  mb: 3,
                  mt: 10,
                  color: "grey.400",
                  fontSize: "0.95rem",
                  maxWidth: "100%",
                  overflow: "hidden",
                }}
              >
                {breadcrumbItems}
              </Breadcrumbs>
            )}
            {children}
          </Container>
        </Box>
      </DrawerContext.Provider>
    </>
  );
}
