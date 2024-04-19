import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  // concat with Api
  async function getRegister(values) {
    try {
      setLoading(true);
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      // check if data success
      if (data.message === "success") {
        navigate("/login");
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
    name: Yup.string()
      .required("name is required")
      .min(2, "too short min is 2")
      .max(10, "too long max is 6"),
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
    rePassword: Yup.string()
      .required("rePassword is required")
      .oneOf([Yup.ref("password")], "must be like password"),
    phone: Yup.string()
      .required("phone is required")
      .matches(/^(002)?(01)[0-25][0-9]{8}/, "phone not valid"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: getRegister,
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <div>
        <h4>Register Now : </h4>
        <form onSubmit={formik.handleSubmit} className="w-75 mx-auto my-4">
          {msg ? <p className="alert alert-danger">{msg}</p> : ""}
          <label htmlFor="name">name :</label>
          <input
            type="text"
            className="form-control mb-3"
            id="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name ? (
            <p className="alert alert-danger"> {formik.errors.name} </p>
          ) : (
            ""
          )}
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
            maxLength={10}
            className="form-control mb-3"
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

          <label htmlFor="rePassword">rePassword :</label>
          <input
            type="password"
            maxLength={10}
            className="form-control mb-3"
            id="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <p className="alert alert-danger"> {formik.errors.rePassword} </p>
          ) : (
            ""
          )}
          <label htmlFor="phone">phone :</label>
          <input
            type="tel"
            className="form-control mb-3"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <p className="alert alert-danger"> {formik.errors.phone} </p>
          ) : (
            ""
          )}
          <button
            type="submit"
            className="btn bg-main text-white ms-auto d-block"
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
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
