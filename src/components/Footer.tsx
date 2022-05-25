import * as React from "react";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

import Copyright from "./Copyright";

const Footer: React.FC = () => (
  <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
    <Typography
      variant="subtitle1"
      align="center"
      color="text.secondary"
      component="p"
    >
      Delivering perfection, one nail at a time
    </Typography>
    <Copyright />
  </Box>
);

export default Footer;
