
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

type ProfileProps = {
  userInfo: UserInfo;
  isDetailsChanged: boolean;
  handleDetailsChange: (event: {    target: {        name: any;        value: any;    };}) => void;
}

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNum: string;
}

const AccountProfileDetails: React.FC<ProfileProps> = ({userInfo, isDetailsChanged, handleDetailsChange}) => {

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  return (
    <form autoComplete="off" noValidate>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleDetailsChange}
                required
                value={userInfo.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleDetailsChange}
                required
                value={userInfo.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleDetailsChange}
                required
                value={userInfo.email}
                variant="outlined"
                disabled
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phoneNum"
                onChange={handleDetailsChange}
                type="number"
                value={userInfo.phoneNum}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" disabled={!isDetailsChanged}>
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountProfileDetails;
