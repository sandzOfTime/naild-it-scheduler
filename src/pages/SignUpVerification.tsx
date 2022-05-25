import { green } from "@mui/material/colors";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MessageBlock from "../components/MessageBlock";

export default function SignUpVerification() {
  return (
    <MessageBlock
      color={green[500]}
      heading="Thank you for signing up!"
      message="A verification email will be sent to you shortly"
    >
      <CheckCircleIcon />
    </MessageBlock>
  );
}
