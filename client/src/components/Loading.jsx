import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Loader = () => (
  <ThreeDots
    color="#somecolor"
    height={80}
    width={80}
    timeout={3000} //3 secs
  />
);

export default Loader;
