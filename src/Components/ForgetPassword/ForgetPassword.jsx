import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
export default function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  async function forgetPassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      // check data success
      if (data.statusMsg === "success") {
        navigate("/verify-code");
        setLoading(false);
        setMsg(""); // There is no user registered with this email address
      }
    } catch (error) {
      setMsg(error.response.data.message); // There is no user registered with this email address
      setLoading(false);
    }
  }

  // validation form
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
  });

  // formik
  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: forgetPassword,
  });
  return (
    <>
      <h1 className="mt-3">please enter your verification code </h1>
      <form onSubmit={formik.handleSubmit}>
        {msg ? <p className="alert alert-danger">{msg}</p> : ""}
        <input
          type="email"
          placeholder="Email"
          className="form-control p-3 my-4"
          id="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.email && formik.touched.email ? (
          <p className="alert alert-danger">{formik.errors.email}</p>
        ) : (
          ""
        )}
        <button className="btn bg-main text-white" type="submit">
          {loading ? (
            <Oval
              visible={true}
              height="25"
              width="65"
              color="#8ae689"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </>
  );
}
