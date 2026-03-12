import { useState } from "react";
import { Box, IconButton, Snackbar, Alert } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const CodeBox = ({ children, isCopy = true }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        component="pre"
        sx={{
          bgcolor: "#111",
          color: "#00f5ff",
          p: 3,
          borderRadius: 3,
          overflowX: "auto",
          fontFamily: "monospace",
          fontSize: "1.15rem",
          my: 3,
          border: "1px solid rgba(0,245,255,0.2)",
          whiteSpace: "pre-wrap",
          position: "relative",
        }}
      >
        <code>{children}</code>
        {isCopy && (
          <IconButton
            onClick={handleCopy}
            sx={{
              position: "absolute",
              top: 15,
              right: 8,
              color: "#00f5ff",
              bgcolor: "rgba(0,245,255,0.1)",
              "&:hover": { bgcolor: "rgba(0,245,255,0.2)" },
              minWidth: 40,
              height: 40,
            }}
          >
            {copied ? (
              <CheckCircleIcon fontSize="small" />
            ) : (
              <ContentCopyIcon fontSize="small" />
            )}
          </IconButton>
        )}
      </Box>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          icon={<CheckCircleIcon />}
          severity="success"
          sx={{ bgcolor: "#00f5ff", color: "#000" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CodeBox;
