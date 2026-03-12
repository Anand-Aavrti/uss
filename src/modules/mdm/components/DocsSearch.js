/* eslint-disable react-hooks/refs */
import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Container,
  TextField,
  InputAdornment,
  CircularProgress,
  MenuItem,
  IconButton,
  Popper, // ✅ Changed from Menu
  Paper, // ✅ To wrap content
  ClickAwayListener, // ✅ To close when clicking outside
  Grow,
  Divider, // ✅ For animation
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import Fuse from "fuse.js";
import YTXTypography from "./YTXTypography";
// --- Helper Components (Highlight/Snippet) ---
const Highlight = ({ text, indices }) => {
  if (!indices || indices.length === 0) return <span>{text}</span>;
  indices = [...indices].sort((a, b) => a[0] - b[0]);
  const parts = [];
  let pos = 0;
  indices.forEach((idx) => {
    if (idx[0] > pos) parts.push(text.substring(pos, idx[0]));
    parts.push(
      <mark
        key={idx[0]}
        style={{ backgroundColor: "rgba(0, 245, 255, 0.3)", color: "inherit" }}
      >
        {text.substring(idx[0], idx[1] + 1)}
      </mark>
    );
    pos = idx[1] + 1;
  });
  if (pos < text.length) parts.push(text.substring(pos));
  return <>{parts}</>;
};

const getSnippetAndIndices = (body, indices, query, context = 120) => {
  // ✅ Increased context to 120 for more relevant surrounding text
  let effectiveIndices = indices;

  if (!effectiveIndices || effectiveIndices.length === 0) {
    // ✅ FIX: Fallback to search for query position in body (case-insensitive)
    // This ensures snippet centers on the actual query term even if Fuse matched only on title
    const lowerBody = body.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const pos = lowerBody.indexOf(lowerQuery);
    if (pos !== -1) {
      const len = query.length;
      effectiveIndices = [[pos, pos + len - 1]]; // Treat as single match at query position
    } else {
      // True no-match case: Use first 150 chars as before
      const snippet = body.length > 150 ? body.substring(0, 150) + "..." : body;
      return { snippet, indices: [] };
    }
  }

  // ✅ IMPROVE: Instead of always using first match, use the "best" (earliest or central) for better snippet
  // Sort by start position and pick the one closest to the middle of body for more contextual snippet
  effectiveIndices.sort((a, b) => a[0] - b[0]);
  const bodyCenter = body.length / 2;
  const bestMatch =
    effectiveIndices.reduce((best, curr) => {
      const bestDist = Math.abs((best ? best[0] : 0) - bodyCenter);
      const currDist = Math.abs(curr[0] - bodyCenter);
      return currDist < bestDist ? curr : best;
    }, null) || effectiveIndices[0]; // Fallback to first if no best

  const firstMatch = bestMatch;
  let start = Math.max(0, firstMatch[0] - context);
  let end = Math.min(body.length, firstMatch[1] + context + 1);
  let snippet = body.substring(start, end);
  if (start > 0) snippet = "..." + snippet;
  if (end < body.length) snippet += "...";

  // ✅ Adjust all indices (not just first) to snippet boundaries for full highlighting
  const adjustedIndices = effectiveIndices
    .filter((idx) => idx[0] >= start && idx[1] < end)
    .map((idx) => [idx[0] - start, idx[1] - start]);

  return { snippet, indices: adjustedIndices };
};

export default function DocsSearch({ handleDrawerToggle }) {
  const searchRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchIndex, setSearchIndex] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [open, setOpen] = useState(false); // ✅ Explicit open state for Popper
  const [isLoading, setIsLoading] = useState(false);
  const fuseRef = useRef(null);
  const getAutocompleteSuggestions = (query, limit = 6) => {
    if (!fuseRef.current || query.length < 2) return [];

    const words = query.toLowerCase().trim().split(/\s+/);
    const lastWord = words[words.length - 1];

    // Search only on title + body, but extract clean phrases
    const results = fuseRef.current.search(lastWord, { limit: 30 });

    const seen = new Set();
    const phrases = [];

    for (const r of results) {
      const text = (r.item.title + " " + r.item.body).toLowerCase();

      // Find all occurrences of the lastWord and grab surrounding phrase
      const regex = new RegExp(`(.{0,30}${lastWord}.{0,30})`, "gi");
      const matches = text.match(regex) || [];

      for (const match of matches) {
        const cleaned = match.replace(/\s+/g, " ").trim();
        if (cleaned.length > lastWord.length + 2 && !seen.has(cleaned)) {
          seen.add(cleaned);
          phrases.push(cleaned.charAt(0).toUpperCase() + cleaned.slice(1));
          if (phrases.length >= limit) break;
        }
      }
    }
    return phrases;
  };
  // 1. Load Search Index
  useEffect(() => {
    fetch("/search-index.json")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setSearchIndex(data);
        if (data.length > 0) {
          fuseRef.current = new Fuse(data, {
            keys: ["title", "body"],
            threshold: 0.3,
            includeScore: true,
            includeMatches: true,
            minMatchCharLength: 2,
            ignoreLocation: true,
            useExtendedSearch: true,
          });
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2 || !fuseRef.current) {
      setSearchResults([]);
      setSuggestions([]);
      setOpen(false);
      return;
    }

    setIsLoading(true);
    setOpen(true);

    const timer = setTimeout(() => {
      const results = fuseRef.current.search(searchQuery, { limit: 6 });
      setSearchResults(results);

      // Generate autocomplete suggestions
      const suggs = getAutocompleteSuggestions(searchQuery, 5);
      setSuggestions(suggs);

      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleClose = () => {
    setOpen(false);
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleBlur = () => {
    // Small delay to allow clicking on a result before it closes
    setTimeout(() => setOpen(false), 200);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100000,
        backdropFilter: "blur(20px)",
        bgcolor: "rgba(2, 8, 16, 0.8)",
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

        {/* Live Search Input */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: { xs: "100%", sm: 500, md: 600, lg: 700 },
          }}
        >
          <ClickAwayListener onClickAway={() => setOpen(false)}>
            <Box>
              <TextField
                inputRef={searchRef}
                fullWidth
                placeholder="Search documentation..."
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                // On focus, if we have a query, show results again
                onFocus={() => {
                  if (searchQuery.length >= 2) setOpen(true);
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

              {/* Popper for quick search rather then the  */}
              <Popper
                open={open && (isLoading || searchResults.length > 0)}
                anchorEl={
                  searchRef.current?.closest(".MuiOutlinedInput-root") ||
                  searchRef.current
                }
                // anchorEl={searchRef.current}
                placement="bottom-start"
                transition
                style={{
                  mt: 10,
                  width: searchRef.current
                    ? searchRef.current.clientWidth
                    : "100%",
                  zIndex: 2146789,
                }}
              >
                {({ TransitionProps }) => (
                  <Grow {...TransitionProps} timeout={200}>
                    <Paper
                      sx={{
                        mt: 1,
                        width: { xs: "100%", md: "800px" },
                        bgcolor: "rgba(2,8,16,0.98)",
                        border: "1px solid rgba(0,245,255,0.2)",
                        borderRadius: 2,
                        maxHeight: 440,
                        overflowY: "auto",
                        boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                      }}
                    >
                      {/* === HEADER: Result count or suggestions === */}
                      {(searchResults.length > 0 || suggestions.length > 0) && (
                        <Box
                          sx={{
                            px: 2,
                            py: 1.5,
                            borderBottom: "1px solid rgba(255,255,255,0.08)",
                            bgcolor: "rgba(0,245,255,0.03)",
                          }}
                        >
                          <YTXTypography
                            variant="caption"
                            fontWeight={600}
                            color="#00f5ff"
                            sx={{ letterSpacing: "0.5px", fontSize: "1.2rem" }}
                          >
                            {searchResults.length > 0
                              ? `Search results (${searchResults.length})`
                              : `${suggestions.length} suggestion${
                                  suggestions.length > 1 ? "s" : ""
                                }`}
                          </YTXTypography>
                        </Box>
                      )}

                      {/* === AUTOCOMPLETE SUGGESTIONS (only when no full results yet) === */}
                      {suggestions.length > 0 && searchResults.length === 0 && (
                        <>
                          {suggestions.map((suggestion, i) => (
                            <MenuItem
                              key={i}
                              onClick={() => {
                                setSearchQuery(suggestion);
                                searchRef.current?.focus();
                              }}
                              sx={{
                                py: 1.8,
                                px: 2,
                                gap: 1.5,
                                "&:hover": { bgcolor: "rgba(0,245,255,0.08)" },
                              }}
                            >
                              <SearchIcon
                                fontSize="small"
                                sx={{ color: "grey.500" }}
                              />
                              <YTXTypography variant="body1" color="grey.300">
                                {suggestion}
                              </YTXTypography>
                            </MenuItem>
                          ))}
                          <Divider sx={{ my: 0.5 }} />
                        </>
                      )}

                      {/* === LOADING STATE === */}
                      {isLoading && (
                        <Box sx={{ p: 4, textAlign: "center" }}>
                          <CircularProgress
                            size={26}
                            sx={{ color: "#00f5ff" }}
                          />
                          <YTXTypography
                            variant="body2"
                            sx={{ mt: 1.5, color: "grey.500" }}
                          >
                            Searching...
                          </YTXTypography>
                        </Box>
                      )}

                      {/* === ACTUAL SEARCH RESULTS === */}
                      {!isLoading && searchResults.length > 0 && (
                        <>
                          {searchResults.map((result) => {
                            const item = result.item;
                            const titleMatch = result.matches?.find(
                              (m) => m.key === "title"
                            );
                            const bodyMatch = result.matches?.find(
                              (m) => m.key === "body"
                            );
                            const titleIndices = titleMatch
                              ? titleMatch.indices
                              : [];
                            const { snippet, indices } = getSnippetAndIndices(
                              item.body,
                              bodyMatch?.indices || [],
                              searchQuery,
                              100
                            );

                            return (
                              <MenuItem
                                key={item.id}
                                component={Link}
                                href={item.path}
                                onClick={handleClose}
                                sx={{
                                  whiteSpace: "normal",
                                  py: 1.8,
                                  px: 2,
                                  borderBottom:
                                    "1px solid rgba(255,255,255,0.05)",
                                  "&:hover": {
                                    bgcolor: "rgba(0,245,255,0.08)",
                                  },
                                }}
                              >
                                <Box sx={{ width: "100%" }}>
                                  <YTXTypography
                                    variant="subtitle1"
                                    fontWeight={600}
                                    color="white"
                                    fontSize="1.1rem"
                                  >
                                    <Highlight
                                      text={item.title}
                                      indices={titleIndices}
                                    />
                                  </YTXTypography>

                                  {/* Clamped 2-line snippet */}
                                  <YTXTypography
                                    variant="body2"
                                    color="grey.400"
                                    sx={{
                                      mt: 0.6,
                                      mb: 0.8,
                                      lineHeight: 1.35,
                                      display: "-webkit-box",
                                      WebkitLineClamp: 2,
                                      WebkitBoxOrient: "vertical",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      fontSize: "0.95rem",
                                    }}
                                  >
                                    <Highlight
                                      text={snippet}
                                      indices={indices}
                                    />
                                  </YTXTypography>

                                  {/* Breadcrumb path */}
                                  <YTXTypography
                                    variant="caption"
                                    color="grey.600"
                                    fontSize="1.1rem"
                                  >
                                    {item.path}
                                  </YTXTypography>
                                </Box>
                              </MenuItem>
                            );
                          })}
                        </>
                      )}

                      {/* === NO RESULTS (but not loading) === */}
                      {!isLoading &&
                        searchResults.length === 0 &&
                        suggestions.length === 0 && (
                          <Box sx={{ p: 4, textAlign: "center" }}>
                            <YTXTypography variant="body2" color="grey.500">
                              No results found for "
                              <strong>{searchQuery}</strong>"
                            </YTXTypography>
                          </Box>
                        )}
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </Box>
          </ClickAwayListener>
        </Box>
      </Container>
    </Box>
  );
}
