import React from "react";
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
import { InputAdornment } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import "../utils/string.extensions";

//Components
import Loader from "../components/Loader";
import ValidatedInput from "../components/ValidatedInput";

import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../App";
import { supabase } from "../api/supabaseClient";

type FormInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: number;
};

export default function SignUp() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormInput>();

  const [createUserWithEmailAndPassword, user, loading] =
    useCreateUserWithEmailAndPassword(auth);

  let navigate = useNavigate();

  const onSubmit = async (data: FormInput) => {
    const { firstName, lastName, email, password, phoneNumber } = data;

    try {
      //Attempt to create user and store user data in Database
      createUserWithEmailAndPassword(email, password);
      const { data: users, error } = await supabase.from("Users").insert([
        {
          first_name: firstName,
          last_name: lastName,
          phone_num: phoneNumber,
          email_address: email,
        },
      ]);

      if (error) console.error(error);

      if (users) {
        navigate("/", {
          state: {
            welcome_message: `Welcome ${firstName.capitalize()}! Happy to have you!`,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <ValidatedInput
                  label="First Name"
                  id="firstName"
                  error={!!errors.firstName}
                  control={control}
                  errorText="Please provide a valid First Name"
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ValidatedInput
                  label="Last Name"
                  id="lastName"
                  error={!!errors.lastName}
                  control={control}
                  errorText="Please provide a valid Last Name"
                  rules={{ required: true }}
                />
              </Grid>
              <Grid item xs={12}>
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
                  type="email"
                />
              </Grid>
              <Grid item xs={12}>
                <ValidatedInput
                  label="Password"
                  id="password"
                  error={!!errors.password}
                  control={control}
                  errorText="Please provide a valid Password"
                  rules={{ required: true }}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <ValidatedInput
                  label="Phone Number"
                  id="phoneNumber"
                  error={!!errors.phoneNumber}
                  control={control}
                  errorText="Please provide a valid Phone Number"
                  rules={{
                    required: true,
                    maxLength: 7,
                    pattern: /^[1-9]([\\s-]?\d){3,6}$/,
                  }}
                  type="tel"
                  startAdornment={
                    <InputAdornment position="start">(242)</InputAdornment>
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            {loading ? (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled
              >
                Signing up user...
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
            )}
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  <Link to="/sign-in">Already have an account? Sign in</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Loader loading={loading} />
      </Container>
    </>
  );
}
