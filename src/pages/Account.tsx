import { Box, Container, Grid, Typography } from "@mui/material";
import AccountPhoto from "../components/AccountPhoto";
import AccountProfileDetails from "../components/AccountProfileDetails";
import CustomAlert from "../components/CustomAlert";
import CustomModal from "../components/CustomModal";

import { auth } from "../App";

import Loader from "../components/Loader";
import useCurrentUser from "../hooks/useCurrentUser";


//Firebase hooks
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useUploadFile } from "react-firebase-hooks/storage"
import { useEffect, useState } from "react";

import _ from "lodash";

type AccountDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNum: string;
}


const Account = () => {
  const [currentUser, loading] = useCurrentUser(auth); 
  const [uploadFile, uploading, snapshot, uploadError] = useUploadFile();
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const [photoUploaded, setPhotoUploaded] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(!!uploadError || !!updateError);

  const emptyDetails = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNum: "",
  };

  //Account details state
  const [open, setOpen] = useState<boolean>(false);
  const [details, setDetails] = useState<AccountDetails>(emptyDetails);
  const [originalDetails, setOriginalDetails] = useState<AccountDetails>(emptyDetails)
  const [isDetailsChanged, setIsDetailsChanged] = useState<boolean>(false);

  const handleDetailsChange = (event: { target: { name: any; value: any } }) => {
    const newDetails = {...details, [event.target.name]: event.target.value};
    
    setIsDetailsChanged(!_.isEqual(newDetails, originalDetails));

    setDetails({
      ...details,
      [event.target.name]: event.target.value,
    });
  };

  const openSucessModal = () => {
    setPhotoUploaded(true);
  }

  useEffect(() => {
    if (currentUser) {
      const currentUserDetails = {
        firstName: currentUser?.firstName,
        lastName: currentUser?.lastName,
        email: currentUser?.emailAddress,
        phoneNum: currentUser?.phoneNumber
      };

      setDetails(currentUserDetails);
      setOriginalDetails(currentUserDetails);
    }

  }, [currentUser])
  

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
                <AccountProfileDetails userInfo={details} isDetailsChanged={isDetailsChanged} handleDetailsChange={handleDetailsChange} />
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
            <CustomModal 
              open={open}
              handleClose={() => setOpen(false)}
              title="Changes saved?"
              description="Exiting this page means that all of your changes will be lost? Do you wish to continue?"
            
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
