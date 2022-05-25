import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

import moment from "moment";

//Firebase
import { firebaseApp } from "../App";
import { getFirestore, doc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

//Components
import Loader from "../components/Loader";
import Calendar from "../components/Calendar";
import AppointmentModal from "../components/AppointmentModal";
import ConfirmationCard from "../components/ConfirmationCard";
import TimeTabs from "../components/TimeTabs";

const BookAppointment: React.FC = () => {
  let params = useParams();
  const [snapshot, loading, error] = useDocumentOnce(
    doc(getFirestore(firebaseApp), "services", params.serviceId || "")
  );

  const [value, setValue] = React.useState(0);
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [time, setTime] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [pageLoading, setpageLoading] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const submitAppointment = () => {
    setpageLoading(true);
  };

  return (
    <Container maxWidth={false} component="main" sx={{ pt: 8, pb: 6 }}>
      <CssBaseline />
      <Typography
        component="h1"
        variant="h5"
        align="center"
        color="text.secondary"
        gutterBottom
        sx={{ mt: 4 }}
      >
        Pick a date and time
      </Typography>
      <Box
        sx={{
          marginTop: 7,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={3}>
          <Grid item lg={5} md={12} xl={9} xs={12}>
            <ConfirmationCard
              snapshot={snapshot}
              title={snapshot?.data()?.title}
              photoUrl={snapshot?.data()?.photoUrl}
              duration={snapshot?.data()?.duration}
              price={snapshot?.data()?.price}
              description={snapshot?.data()?.description}
            />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Card variant="outlined">
              <CardHeader
                title={`Book on ${moment(date).format("MMMM Do, YYYY")}`}
              />
              <Divider />
              <CardContent>
                <Box
                  sx={{
                    // height: 300,
                    position: "relative",
                  }}
                />
                <Calendar
                  date={date}
                  onChange={(dateObj) => {
                    setDate(dateObj?._d);
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={3} md={6} xl={3} xs={12}>
            <TimeTabs
              handleClickOpen={handleClickOpen}
              handleChange={handleChange}
              value={value}
            />
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Your Nail Appointment</DialogTitle>
        <DialogContent dividers>
          <AppointmentModal
            title={snapshot?.data()?.title}
            price={snapshot?.data()?.price}
            date={moment(date).format("MMMM Do, YYYY")}
            time="12:00 pm"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Link to="/appointment-confirmed">
            <Button onClick={submitAppointment}>Confirm</Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Divider sx={{ mt: 5 }} />
      <Loader loading={loading} />
      <Loader loading={pageLoading} />
    </Container>
  );
};

export default BookAppointment;
