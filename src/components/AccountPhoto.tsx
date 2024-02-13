import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { ChangeEvent, useState } from "react";
import { storage } from "../App";
import { ref as storageRef, getDownloadURL } from "firebase/storage"
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../App";

import { getDisplayPhotoName } from "../utils/storage";


type Props = {
  user: any;
  uploadFile: (storageRef: any, data: any, metadata?: any) => Promise<any>;
  updateProfile: (updates: ProfileUpdate) => Promise<void>;
  openSuccessModal: () => void;
}

type ProfileUpdate = {
  displayName?: string;
  photoUrl: string;
}



const AccountProfile: React.FC<Props> = ({user, uploadFile, updateProfile, openSuccessModal}) => {
  const ref = storageRef(storage, getDisplayPhotoName(user?.firstName, user?.lastName))
  const [photo, setPhoto] = useState<string>("");
  

  //Get current user
  const { firstName, lastName, photoUrl } = user;

  const handlePhotoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      //Upload image in file storage
      const result = await uploadFile(ref, e.target.files[0], {contentType: 'image/jpg'});

      //Grab url reference and update profile
      const photoUrl = await getDownloadURL(result?.ref);
      await updateProfile({displayName: user?.firstName, photoUrl});

      //Display photo using state
      setPhoto(URL.createObjectURL(e.target.files[0]));

      //Store url reference in DB
      const userRef = doc(db, "users", user?.userId)
      await updateDoc(userRef, {photoUrl})
      openSuccessModal();
      
    }
  };

  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Avatar
            src={photo || photoUrl}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {`${firstName} ${lastName.split("")[0].toUpperCase()}`}
          </Typography>
          {/* <Typography color="textSecondary" variant="body2">
            {`${user.city} ${user.country}`}
          </Typography> */}
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
          component="label"
          endIcon={<CameraAltIcon />}
        >
          Upload picture
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handlePhotoChange}
          />
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;
