import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";
import { Helmet } from "react-helmet";

export default function Login() {
  let { setIsUser, setLogin } = useContext(UserContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  // get Login
  async function getLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signin`,
        values
      );
      // check if data success
      if (data.message === "success") {
        setIsUser(data.token);
        // save token in local storage to save it when reload page
        localStorage.setItem("userToken", data.token);
        // to show Hi User-Name in nav
        setLogin(data.user.name); // user name {ahmed}
        // save userName in local storage to save it when reload page
        localStorage.setItem("userName", data.user.name);
        navigate("/");
        setLoading(false);
        setMsg(""); //Account Already Exists
      }
    } catch (error) {
      setMsg(error.response.data.message); //Account Already Exists
      setLoading(false);
    }
  }
  // validation form
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("email is required")
      .email("email is not valid"),
    password: Yup.string()
      .required("password is required")
      .min(5, "too short min is 5")
      .max(10, "too long max is 10")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password not valid it must start with capital character and only 10"
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: getLogin,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <h4>Login Now : </h4>
        <form onSubmit={formik.handleSubmit} className="w-75 mx-auto my-4">
          {msg ? <p className="alert alert-danger">{msg}</p> : ""}
          <label htmlFor="email">email :</label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <p className="alert alert-danger"> {formik.errors.email} </p>
          ) : (
            ""
          )}
          <label htmlFor="password">password :</label>
          <input
            type="password"
            className="form-control mb-3"
            maxLength={10}
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <p className="alert alert-danger"> {formik.errors.password} </p>
          ) : (
            ""
          )}

          <div className="d-flex justify-content-between align-items-center">
            <span
              onClick={() => {
                navigate("/forgetPassword");
              }}
              className="text-main fw-bold cursor-pointer"
            >
              Forget Your Password ?
            </span>
            <button
              type="submit"
              className="btn bg-main text-white "
              disabled={!(formik.isValid && formik.dirty)}
            >
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
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
