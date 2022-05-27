import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Stack from "@mui/material/Stack";
import { TextField } from "@mui/material";

import { firebaseApp } from "../App";
import { getFirestore, collection } from "firebase/firestore";
import { useCollectionOnce } from "react-firebase-hooks/firestore";
import { HashLink } from "react-router-hash-link";

//Components
import ServiceCard from "../components/ServiceCard";
import Loader from "../components/Loader";

//Redux Hooks
import { useAppDispatch, useAppSelector } from "../app/hooks";

import { stopSpinner } from "../slices/authLoadSlice";

const Services: React.FC = () => {
  const [snapshot, loading] = useCollectionOnce(
    collection(getFirestore(firebaseApp), "services")
  );
  const authLoading = useAppSelector((state) => state.authLoad.loading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authLoading) {
      dispatch(stopSpinner());
    }
  }, [authLoading, dispatch]);

  return (
    <>
      {/* Hero unit */}
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
          mt: 15,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome to Lashan Nail'd It!
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            paragraph
          >
            Our aim is to deliver perfection, one nail at a time😍. Check out
            some of the services that we offer!
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <HashLink to="#popServices">
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowDownwardIcon />}
                color="secondary"
              >
                Browse Services
              </Button>
            </HashLink>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Divider id="popServices" textAlign="left" sx={{ mb: 2 }}>
          Popular Services
        </Divider>
        {/* End hero unit */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {snapshot &&
            snapshot.docs.map((doc) => {
              const service = doc.data();
              return (
                <Grid key={service?.title} item xs={6}>
                  <ServiceCard
                    title={service?.title}
                    duration={service?.duration}
                    price={service?.price}
                    description={service?.description}
                    photoUrl={service?.photoUrl}
                    serviceId={doc?.id}
                  />
                </Grid>
              );
            })}
        </Grid>
        <Divider textAlign="left" sx={{ mb: 5, mt: 10 }}></Divider>
        <Grid container spacing={2}>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Typography gutterBottom variant="subtitle1">
                  Stay up to date with what's happening!
                </Typography>
                <Typography gutterBottom variant="body2">
                  Be the first to get notified about all of our new deals and
                  discounts.
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  id="standard-basic"
                  label="Email Address"
                  variant="standard"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item>
                <Box
                  sx={{
                    width: 300,
                    height: 75,
                  }}
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ ml: 10 }}
                >
                  Subscribe
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Loader loading={loading} />
    </>
  );
};
export default Services;
