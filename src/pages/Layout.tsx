import React, { useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

//Components
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SplashScreen from "./SplashScreen";
import Loader from "../components/Loader";

//Redux Hooks
import { useAppSelector, useAppDispatch } from "../app/hooks";

//Actions
import { markAsOpen } from "../slices/splashSlice";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../App";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      // This is green.A700 as hex.
      main: "#FF10F0",
    },
  },
});

const Layout: React.FC = () => {
  const hasBeenOpened = useAppSelector((state) => state.splash.hasBeenOpened);
  const authLoading = useAppSelector((state) => state.authLoad.loading);
  const dispatch = useAppDispatch();

  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    setTimeout(() => {
      dispatch(markAsOpen());
    }, 4000);
  }, []);

  return (
    <>
      {!hasBeenOpened ? (
        <SplashScreen />
      ) : (
        <ThemeProvider theme={theme}>
          <NavBar />
          <main>
            <Outlet />
          </main>
          <Footer />
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <Loader loading={authLoading} />
        </ThemeProvider>
      )}
    </>
  );
};

export default Layout;
