import Link from "@mui/material/Link";
import { Typography } from "@mui/material";

const Copyright: React.FC = () => (
  <Typography variant="body2" color="text.secondary" align="center">
    {"Copyright © "}
    <Link color="inherit" href="https://mui.com/">
      Lashan Nail'd it
    </Link>{" "}
    {new Date().getFullYear()}
    {"."}
  </Typography>
);

export default Copyright;
