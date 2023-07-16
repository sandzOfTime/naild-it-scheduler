import { Box, Container, Grid, Typography } from "@mui/material";
import AccountPhoto from "../components/AccountPhoto";
import AccountProfileDetails from "../components/AccountProfileDetails";

import { auth } from "../App";
import useCurrentUser from "../hooks/useCurrentUser";

import Loader from "../components/Loader";

const Account = () => {
  const [currentUser, loading] = useCurrentUser(auth);
  console.log(currentUser);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
          mt: 10,
        }}
      >
        {currentUser ? (
          <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
              My Account
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={4} md={6} xs={12}>
                <AccountPhoto user={currentUser} />
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails user={currentUser} />
              </Grid>
            </Grid>
          </Container>
        ) : (
          <Loader loading={loading && !currentUser} />
        )}
      </Box>
    </>
  );
};

export default Account;
