import React, { FC } from "react";
import Lottie from "react-lottie";

import * as spinner from "../lottie/lottie-loading.json";
import * as manicure from "../lottie/lottie-manicure-treatment.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: manicure,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SplashScreen: FC = () => {
  return (
    <>
      <div className="center-screen loading-screen">
        <Lottie options={defaultOptions} height={200} width={200} />
      </div>
    </>
  );
};

export default SplashScreen;
