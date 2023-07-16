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

const AccountProfile = ({ user }: { user: any }) => {
  const [photo, setPhoto] = useState<string>("");

  //Get current user
  const { first_name, last_name, photo_url } = user;

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhoto(URL.createObjectURL(e.target.files[0]));
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
            src={photo_url || photo}
            sx={{
              height: 64,
              mb: 2,
              width: 64,
            }}
          />
          <Typography color="textPrimary" gutterBottom variant="h5">
            {`${first_name} ${last_name.split("")[0].toUpperCase()}`}
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
