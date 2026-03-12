import { Box } from "@mui/material";

const TerminalOutput = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: "#0a0f1a",
        color: "#7df9ff",
        p: 3,
        borderRadius: 2,
        fontFamily: "Consolas, Menlo, Monaco, monospace",
        fontSize: { xs: "0.75rem", md: "0.95rem" },
        overflowX: "auto",
        border: "1px solid rgba(125,249,255,0.15)",
        boxShadow: "0 0 20px rgba(0, 245, 255, 0.05)",
        lineHeight: 1.4,
      }}
    >
      <pre
        style={{
          margin: 0,
          whiteSpace: "pre",
          minWidth: "max-content",
        }}
      >
        {children}
      </pre>
    </Box>
  );
};

export default TerminalOutput;
