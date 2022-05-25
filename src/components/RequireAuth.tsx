import React from "react";

import { useLocation, Navigate } from "react-router-dom";
import { auth } from "../App";

function RequireAuth({ children }: { children: JSX.Element }) {
  let location = useLocation();

  if (!auth.currentUser) {
    return <Navigate to="/sign-in" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
