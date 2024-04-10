import React from "react";
import style from "./buttons.module.css";
export default function Buttons({ children, classProps }) {
  return (
    <button className={`bg-main text-white btn ${style.mainBtn} ${classProps}`}>
      {children}
    </button>
  );
}
