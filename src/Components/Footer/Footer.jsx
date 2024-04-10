import React from "react";
import Buttons from "../Buttons/Buttons";
import amazon from "../../assets/Amazon_logo.svg.png";
import instapay from "../../assets/instapay.icon.png";
import googlePlay from "../../assets/google-play.png";
import appStore from "../../assets/app-store.png";
export default function Footer() {
  return (
    <footer className="bg-main-light py-4">
      <div className="container">
        <h2>Get The Fresh Cart App</h2>
        <p>
          we will send you a link , open it in your phone to download the app
        </p>
        <div className="d-flex flex-md-row flex-column gap-4">
          <input type="email" className="form-control" />
          <Buttons classProps={"w-25 mx-auto"}>Share App Link</Buttons>
        </div>

        <div className="border border-top-2 border-bottom-2 border-end-0 border-start-0 my-2 py-2 d-flex flex-md-row flex-column justify-content-between align-items-center">
          <div className=" d-flex justify-content-start align-items-center gap-2">
            <p className="mb-2">Payment Patterns </p>
            <img
              src={amazon}
              className="img-fluid"
              style={{ width: "35px" }}
              alt=""
            />
            <img
              src={instapay}
              className="img-fluid"
              style={{ width: "35px" }}
              alt=""
            />
          </div>
          <div className=" d-flex flex-md-row flex-column justify-content-start align-items-center gap-2">
            <p className="mb-0">Get Deliveries With Fresh Cart</p>
            <img
              src={googlePlay}
              className="img-fluid"
              style={{ width: "70px" }}
              alt=""
            />
            <img
              src={appStore}
              className="img-fluid"
              style={{ width: "70px" }}
              alt=""
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
