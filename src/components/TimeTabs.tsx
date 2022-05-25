import React from "react";

import { Box, Tabs, Tab, Typography, Stack, Button } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type TimeTabsProps = {
  handleClickOpen: () => void;
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
};

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const TimeTabs: React.FC<TimeTabsProps> = ({
  handleClickOpen,
  handleChange,
  value,
}) => {
  return (
    <>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Morning" {...a11yProps(0)} />
          <Tab label="Afternoon" {...a11yProps(1)} />
          <Tab label="Evening" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack spacing={2}>
            <Button variant="outlined" onClick={handleClickOpen}>
              10:00 am{" "}
            </Button>
            <Button variant="outlined">11:00 am</Button>
            <Button variant="outlined">11:30 am</Button>
          </Stack>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack spacing={2}>
            <Button variant="outlined" onClick={handleClickOpen}>
              12:00 pm
            </Button>
            <Button variant="outlined">1:00 pm</Button>
            <Button variant="outlined">2:00 pm</Button>
          </Stack>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Stack spacing={2}>
            <Button variant="outlined" onClick={handleClickOpen}>
              7:00 pm
            </Button>
            <Button variant="outlined">8:00 pm</Button>
            <Button variant="outlined">8:30 pm</Button>
          </Stack>
        </Box>
      </TabPanel>
    </>
  );
};

export default TimeTabs;
