import React from "react";
import { Circles } from "react-loader-spinner";
import style from "./loading.module.css";

export default function LoadingSpinner() {
  return (
    <Circles
      height="80"
      width="80"
      color="#4fa94d"
      ariaLabel="circles-loading"
      wrapperStyle={{}}
      wrapperClass={`${style.loading} d-flex justify-content-center align-items-center position-fixed `}
      visible={true}
    />
  );
}
