import React from "react";
import Typography from "@mui/material/Typography";

const YTXTypography = ({ sx = {}, ...props }) => {
  return (
    <Typography
      {...props}
      sx={{
        fontFamily:
          "Inter Display, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        ...sx,
        color: "white",
        zIndex: 1999,
      }}
    />
  );
};

export default YTXTypography;
