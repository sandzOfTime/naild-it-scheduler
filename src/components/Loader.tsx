import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

type Props = {
  loading: boolean;
};

const Loader: React.FC<Props> = ({ loading }) => {
  return (
    <Backdrop sx={{ color: "#fff", zIndex: 9999 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loader;
