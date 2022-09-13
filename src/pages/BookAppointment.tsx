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
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import moment, { Moment } from "moment";

//Firebase
import { firebaseApp } from "../App";
import { getFirestore, doc } from "firebase/firestore";
import { useDocumentOnce } from "react-firebase-hooks/firestore";

//Components
import Loader from "../components/Loader";
import Calendar from "../components/Calendar";
import AppointmentModal from "../components/AppointmentModal";
import ConfirmationCard from "../components/ConfirmationCard";
import TimeTab, { TimeObj } from "../components/TimeTab";

//Supabase
import { supabase } from "../api/supabaseClient";

//API/Utils
import { getAvailableTimes } from "../api";
import { getCurrentUser } from "../utils/user";
import { calculateEndTime } from "../utils/times";

const BookAppointment: React.FC = () => {
  let params = useParams();
  const [snapshot, loading] = useDocumentOnce(
    doc(getFirestore(firebaseApp), "services", params.serviceId || "")
  );

  const [date, setDate] = React.useState<Date | null>(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const [pageLoading, setpageLoading] = useState(true);
  const [blackoutDates, setblackoutDates] = useState<any[] | null>([]);
  const [availableTimes, setavailableTimes] = useState<TimeObj[] | null>([]);
  const [selectedTime, setselectedTime] = useState<TimeObj>({
    time_slot: "9:00 am",
    actual_time: new Date(),
  });

  //Navigate
  let navigate = useNavigate();

  //Use Effects
  useEffect(() => {
    const fetchBlackoutDates = async () => {
      const { data: BlackoutDates, error } = await supabase
        .from("BlackoutDates")
        .select("date_of_day");

      if (error) {
        console.error(error);
        return;
      }

      setblackoutDates(BlackoutDates);
    };

    fetchBlackoutDates().catch((error) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const fetchAvailableTimes = async () => {
      const avail_times = await getAvailableTimes(date);
      setavailableTimes(avail_times);
      setpageLoading(false);
    };

    fetchAvailableTimes().catch((error) => {
      console.error(error);
    });
  }, [date]);

  const handleDateSelected = (dateObj: TimeObj) => {
    setselectedTime(dateObj);
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const submitAppointment = async () => {
    let user = await getCurrentUser();
    const endDate = calculateEndTime(
      snapshot?.data()?.duration,
      selectedTime?.actual_time
    );
    const { data: appointments, error } = await supabase
      .from("Appointments")
      .insert([
        {
          user_id: user?.id,
          service_id: snapshot?.data()?.supabaseId,
          startDate: selectedTime?.actual_time,
          endDate,
          time_string: selectedTime?.time_slot,
          notes: "",
        },
      ]);

    console.log(appointments);

    if (error) return;

    navigate("/appointment-confirmed", {
      state: {
        service: snapshot?.data()?.title,
        date: date,
        time: selectedTime?.time_slot,
      },
    });
  };

  const onDateChange = async (value: any) => {
    setpageLoading(true);
    setDate(value?._d);
  };

  const getBlackoutDates = (day: Moment) => {
    let disabledDates = blackoutDates?.length
      ? blackoutDates?.map((bd) => bd?.date_of_day)
      : [];

    return (
      moment(day).day() === 0 ||
      disabledDates?.includes(moment(day).format("YYYY-MM-DD"))
    );
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
                  onChange={onDateChange}
                  shouldDisableDate={getBlackoutDates}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={3} md={6} xl={3} xs={12}>
            <TimeTab
              times={availableTimes}
              handleDateSelected={handleDateSelected}
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
            time={selectedTime?.time_slot}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitAppointment}>Confirm</Button>
        </DialogActions>
      </Dialog>
      <Divider sx={{ mt: 5 }} />
      <Loader loading={loading} />
      <Loader loading={pageLoading} />
    </Container>
  );
};

export default BookAppointment;
