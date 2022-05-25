import React, { ReactNode } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

type BlockProps = {
  color: string;
  heading: string;
  message: string;
  children: ReactNode;
  showButton?: boolean;
  buttonName?: string;
  onClick?: () => void;
};

const MessageBlock: React.FC<BlockProps> = ({
  color,
  heading,
  message,
  children,
  showButton,
  buttonName,
  onClick,
}) => {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 25,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: color, width: 56, height: 56 }}>
          {children}
        </Avatar>
        <Typography component="h1" variant="h4" align="center" sx={{ mt: 3 }}>
          {heading}
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" align="center">
            {message}
          </Typography>
          {showButton ? (
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={onClick}
            >
              {buttonName || "OK"}
            </Button>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
};

export default MessageBlock;
