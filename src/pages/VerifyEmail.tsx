import React, { useState, useEffect } from "react";
import { green, red } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import MessageBlock from "../components/MessageBlock";

type Props = {
  actionCode: string | null;
};

const VerifyEmail: React.FC<Props> = ({ actionCode }) => {
  let navigate = useNavigate();
  const [emailVerified, setemailVerified] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      const { data } = await axios.post(
        `${process.env.REACT_APP_EMAIL_VERIFY_URL}?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
        {
          oobCode: actionCode,
        }
      );

      setemailVerified(data?.emailVerified);
    };

    confirmEmail().catch((error) => {
      console.error(error);
    });
  }, [actionCode]);

  return (
    <>
      {emailVerified ? (
        <MessageBlock
          color={green[500]}
          heading="Success"
          message="Your email has been verified! You can now sign in as a user"
          showButton={true}
          buttonName="Go to Sign In"
          onClick={() => {
            navigate("/sign-in");
          }}
        >
          <CheckCircleIcon />
        </MessageBlock>
      ) : (
        <MessageBlock
          color={red[500]}
          heading="Error"
          message="There was a problem with verifying your email. Please try signing up again."
          showButton={true}
          buttonName="Return to Home"
          onClick={() => {
            navigate("/");
          }}
        >
          <ErrorIcon />
        </MessageBlock>
      )}
    </>
  );
};

export default VerifyEmail;
