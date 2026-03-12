import { Paper, Box, Chip } from "@mui/material";
import YTXTypography from "./YTXTypography";
import CodeBox from "./CodeBox";
// Assuming YTXTypography and CodeBox are imported/available in the parent file

const CodeCard = ({ item }) => {
  return (
    <Paper
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
        overflow: "visible", // 🚀 FIX HERE
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
      {/* Card Header */}
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
            sx={{ zIndex: -1 }}
          >
            {item.cmd}
          </YTXTypography>
        </Box>
        <YTXTypography
          variant="body1"
          color="grey.400"
          lineHeight={1.6}
          sx={{ mt: 3 }}
        >
          {item.desc}
        </YTXTypography>
      </Box>

      {/* Syntax Bar */}
      <Box sx={{ px: 3, pt: 1 }}>
        <CodeBox>{item.syntax}</CodeBox>
      </Box>
    </Paper>
  );
};

export default CodeCard;

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
