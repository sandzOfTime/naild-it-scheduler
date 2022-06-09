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
  CssBaseline,
} from "@mui/material";

import { Link, Navigate, useLocation } from "react-router-dom";
import EventNoteIcon from "@mui/icons-material/EventNote";

import moment from "moment";

import Logo from "../assets/logo.png";

type LocationProps = {
  state: {
    service: string;
    date: Date | any;
    time: string;
  };
};

const AppointmentFinal: React.FC = () => {
  const [open, setOpen] = useState(true);
  let location = useLocation() as LocationProps;

  return (
    <>
      {location?.state ? (
        <>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card sx={{ width: "100%" }}>
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
                    <Grid container spacing={2} sx={{ mb: 4 }}>
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
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                          color="text.secondary"
                        >
                          Service
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          {location?.state?.service}
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
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                          color="text.secondary"
                        >
                          Date
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          {moment(location?.state?.date).format(
                            "dddd, MMMM Do YYYY"
                          )}
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
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                          color="text.secondary"
                        >
                          Time
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography
                          variant="subtitle1"
                          gutterBottom
                          component="div"
                        >
                          {location?.state?.time}
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
      ) : (
        <Navigate to="/services" />
      )}
    </>
  );
};

export default AppointmentFinal;
