import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

//Components
import Loader from "../components/Loader";
import CustomAlert from "../components/CustomAlert";
import ValidatedInput from "../components/ValidatedInput";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../App";

type FormInput = {
  email: string;
  password: string;
};

type LocationProps = {
  state: {
    from: Location;
  };
};

export default function SignIn() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInput>();

  const [open, setopen] = useState(false);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const onSubmit = (data: FormInput) => {
    const { email, password } = data;
    signInWithEmailAndPassword(email, password);
  };

  let navigate = useNavigate();

  let location = useLocation() as LocationProps;

  const from = location.state?.from?.pathname || "/";

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setopen(false);
  };

  useEffect(() => {
    if (user) {
      navigate(from);
    }

    if (error) {
      setopen(true);
    }
  }, [user, error, from, navigate]);

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <AccountCircleSharpIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <ValidatedInput
              label="Email"
              id="email"
              error={!!errors.email}
              control={control}
              errorText="Please provide a valid Email"
              rules={{
                required: true,
                pattern:
                  /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              }}
              margin="normal"
              type="email"
            />
            <ValidatedInput
              label="Password"
              id="password"
              error={!!errors.password}
              control={control}
              errorText="Please provide a valid Password"
              rules={{ required: true }}
              margin="normal"
              type="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            {loading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled
              >
                Logging in user...
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Typography variant="body2">
                  <Link to="#">Forgot password?</Link>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <Link to="/sign-up">{"Don't have an account? Sign Up"}</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Loader loading={loading} />
        <CustomAlert
          open={open}
          severity="error"
          message="We had an error with your attempt to sign in. Please try again."
          handleClose={handleClose}
        />
      </Container>
    </>
  );
}
