import React from "react";

import { Box, Stack, Button, Typography, Divider } from "@mui/material";

type TimeTabsProps = {
  handleClickOpen: () => void;
};

const TimeTab: React.FC<TimeTabsProps> = ({ handleClickOpen }) => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          alignItems: "center",
          flexDirection: "column",
          display: "flex",
        }}
      >
        <Typography variant="h6" gutterBottom component="div">
          Available Times
        </Typography>
        <Divider />
      </Box>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack spacing={1.5}>
          <Button
            variant="outlined"
            onClick={handleClickOpen}
            sx={{ width: "300px" }}
          >
            10:00 am
          </Button>
          <Button variant="outlined" sx={{ width: "300px" }}>
            11:00 am
          </Button>
          <Button variant="outlined" sx={{ width: "300px" }}>
            11:30 am
          </Button>
          <Button variant="outlined" sx={{ width: "300px" }}>
            12:00 pm
          </Button>
          <Button variant="outlined" sx={{ width: "300px" }}>
            1:00 pm
          </Button>
          <Button variant="outlined" sx={{ width: "300px" }}>
            1:30 pm
          </Button>
          <Button variant="outlined" sx={{ width: "300px" }}>
            2:30 pm
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default TimeTab;
