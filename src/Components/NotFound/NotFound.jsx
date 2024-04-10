import React from "react";
import errorImage from "../../assets/error.svg";
export default function NotFound() {
  return (
    <div className="py-3 text-center">
      <img src={errorImage} alt="error" className="w-50" />
    </div>
  );
}
