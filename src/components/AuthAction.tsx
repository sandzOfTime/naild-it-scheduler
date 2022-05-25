import React from "react";
import VerifyEmail from "../pages/VerifyEmail";

import { useSearchParams } from "react-router-dom";

const AuthAction = (props: any) => {
  const [params] = useSearchParams();

  const mode = params.get("mode");
  const actionCode = params.get("oobCode");

  switch (mode) {
    case "verifyEmail":
      return <VerifyEmail actionCode={actionCode} />;

    default:
      return (
        <div className="Action">
          <h1>Error encountered</h1>
          <p>The selected page mode is invalid.</p>
        </div>
      );
  }
};

export default AuthAction;
