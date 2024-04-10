import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Oval } from "react-loader-spinner";
export default function ResetPassword() {
  let { setIsUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  async function resetNewPassword(values) {
    try {
      setLoading(true);
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        values
      );
      // check data success
      if (data) {
        setIsUser(data.token);
        // save token in local storage to save it when reload page
        localStorage.setItem("userToken", data.token);
        // navigate To Home
        navigate("/");
        setLoading(false);
        setMsg(""); //Account Already Exists
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
    newPassword: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{5,10}$/, "password not valid"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetNewPassword,
  });

  return (
    <>
      <h1 className="mt-3">reset your account password</h1>
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
        {/* new password */}
        <input
          type="password"
          className="form-control p-3 my-4"
          placeholder="New Password"
          id="newPassword"
          value={formik.values.newPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.errors.newPassword && formik.touched.newPassword ? (
          <p className="alert alert-danger"> {formik.errors.newPassword} </p>
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
            "Reset Password"
          )}
        </button>
      </form>
    </>
  );
}
