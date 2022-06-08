import React from "react";

import { Box, Stack, Button, Typography, Divider } from "@mui/material";

export type TimeObj = {
  time_slot: string;
  actual_time: Date | any;
};

type TimeTabsProps = {
  times: TimeObj[] | null;
  handleDateSelected: (dateObj: TimeObj) => void;
};

const TimeTab: React.FC<TimeTabsProps> = ({ handleDateSelected, times }) => {
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
          {times &&
            times.map((time) => (
              <Button
                key={time.time_slot}
                variant="outlined"
                onClick={() => {
                  handleDateSelected(time);
                }}
                sx={{ width: "300px" }}
              >
                {time.time_slot}
              </Button>
            ))}
        </Stack>
      </Box>
    </>
  );
};

export default TimeTab;
