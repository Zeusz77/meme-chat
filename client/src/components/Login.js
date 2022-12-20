import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoginSchema } from "../schemas";
import { loginUser } from "../actions/authActions";

export const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    try {
      setError("");
      dispatch(loginUser(values, navigate, dispatch));
    } catch (err) {
      setError(err);
    }
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  return (
    <div>
      <h1>Login</h1>
      
        {error && <div>Incorrect email or password</div>}

        <form onSubmit={handleSubmit}>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && <span>{errors.email}</span>}

          <label htmlFor="password">Password</label>  
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          />
          {errors.password && touched.password && <p>{errors.password}</p>}

          <button type="submit">
            Login
          </button>
        </form>
    </div>
  );
};
