import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";

import Logo from "../assets/logo.png";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

type CardProps = {
  title: string;
  price: string;
  date: string;
  time: string;
};

const AppointmentModal: React.FC<CardProps> = ({
  title,
  price,
  date,
  time,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "auto",
        // maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128, bgcolor: "black" }}>
            <Img alt="logo" src={Logo} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                component="div"
                sx={{ mb: 2 }}
              >
                {title}
              </Typography>
              <Typography variant="body2" gutterBottom sx={{ fontWeight: 600 }}>
                {date}
              </Typography>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {time}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2">
                Are you sure that you would like to confirm this appointment?
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" component="div">
              ${price}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AppointmentModal;
