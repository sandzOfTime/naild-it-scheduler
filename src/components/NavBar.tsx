import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { IconButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

import GlobalStyles from "@mui/material/GlobalStyles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../App";
import { signOut } from "firebase/auth";

//Logo
import Logo from "../assets/logo.png";

//Redux Hooks
import { useAppDispatch } from "../app/hooks";

import { loadSpinner } from "../slices/authLoadSlice";

const NavBar: React.FC = () => {
  let navigate = useNavigate();
  const [user] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    signOut(auth);
    dispatch(loadSpinner());
    navigate("/");
  };

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          bgcolor: "black",
        }}
        enableColorOnDark
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Link to="/">
            <Box
              component="img"
              sx={{
                height: 48,
                mr: 2,
              }}
              alt="Nail'd it"
              src={Logo}
            />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            onClick={() => {}}
            sx={{ my: 2, color: "white", display: "block", mr: 2 }}
          >
            Contact Us
          </Button>
          {!user ? (
            <Link to="sign-in">
              <Button
                variant="outlined"
                sx={{ my: 1, mx: 1.5, color: "white" }}
              >
                Login
              </Button>
            </Link>
          ) : (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar src={user?.photoURL || "#"} alt={user.email || "user"}>
                  A
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>My Account</MenuItem>
                <MenuItem onClick={logout}>Sign out</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NavBar;
