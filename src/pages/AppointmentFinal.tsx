import React, { useState } from "react";
import CustomAlert from "../components/CustomAlert";
import {
  Container,
  Box,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  Avatar,
  Typography,
  Button,
} from "@mui/material";

import { Link } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";
import moment from "moment";

import Logo from "../assets/logo.png";

type Props = {
  service: string;
  appointmentDate: Date;
  appointmentTime: string;
};

const AppointmentFinal: React.FC = () => {
  const [open, setOpen] = useState(true);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card sx={{ width: 700 }}>
            <CardHeader title="Confirmation" />
            <Divider />
            <CardContent>
              <Box
                sx={{
                  marginTop: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Avatar
                      alt="Lashan nail'd it"
                      src={Logo}
                      sx={{ bgcolor: "black", width: 56, height: 56 }}
                    />
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="h6" gutterBottom component="div">
                      You are booked with Lashan Nail'd It 💅🏾
                    </Typography>
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={2}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                      color="text.secondary"
                    >
                      Service
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      Service
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={2}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                      color="text.secondary"
                    >
                      Date
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      Date
                    </Typography>
                  </Grid>
                </Grid>
                <Grid
                  container
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                >
                  <Grid item xs={2}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                      color="text.secondary"
                    >
                      Time
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                    >
                      Time
                    </Typography>
                  </Grid>
                </Grid>
                <Link to="/">
                  <Button
                    variant="contained"
                    startIcon={<EventNoteIcon />}
                    sx={{ mt: 2 }}
                    color="secondary"
                  >
                    Book another appointment
                  </Button>
                </Link>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <CustomAlert
        open={open}
        severity="success"
        message="You've successfully booked your nail appointment!"
        handleClose={() => setOpen(false)}
      />
    </>
  );
};

export default AppointmentFinal;
