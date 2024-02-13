import { Box, Container, Grid, Typography } from "@mui/material";
import AccountPhoto from "../components/AccountPhoto";
import AccountProfileDetails from "../components/AccountProfileDetails";

import { auth } from "../App";

import Loader from "../components/Loader";
import useCurrentUser from "../hooks/useCurrentUser";


//Firebase hooks
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useUploadFile } from "react-firebase-hooks/storage"
import CustomAlert from "../components/CustomAlert";
import { useState } from "react";


const Account = () => {
  const [currentUser, loading] = useCurrentUser(auth); 
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(!!uploadError || !!updateError);

  const openSucessModal = () => {
    setPhotoUploaded(true);
  }

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
                <AccountPhoto user={currentUser} uploadFile={uploadFile} updateProfile={updateProfile} openSuccessModal={openSucessModal}/>
              </Grid>
              <Grid item lg={8} md={6} xs={12}>
                <AccountProfileDetails user={currentUser} />
              </Grid>
            </Grid>
            <Loader loading={uploading || updating} />
            <CustomAlert
              open={photoUploaded}
              severity="success"
              message="Profile picture has been successfully updated"
              handleClose={() => setPhotoUploaded(false)}
            />
            <CustomAlert
              open={isError}
              severity="error"
              message="There was an error with uploading your profile picture"
              handleClose={() => setIsError(false)}
            />
          </Container>
        ) : (
          <Loader loading={loading && !currentUser} />
        )}
      </Box>
    </>
  );
};

export default Account;
