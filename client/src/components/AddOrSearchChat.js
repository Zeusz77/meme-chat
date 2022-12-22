import React, { Fragment } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { createChat } from "../actions/chatActions";

export const AddOrSearchChat = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (values) => {
        try {
            setError("");
            createChat(values, navigate, dispatch);
        } catch (err) {
            setError(err);
        }
    };

    const { values, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            name: "",
            participants: "",
        },
        onSubmit,
        validate: (values) => {
            const errors = {};

            if (!values.name) {
                errors.name = "Required";
            }

            if (!values.participants) {
                errors.participants = "Required";
            }

            return errors;
        }
    });


    return (
<Fragment>
  <div className="container">
    <div className="row">
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">Input couldn't be parsed</div>}
        <div className="col-12">
          <div className="form-group">
            <label htmlFor="name">Chat Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name}
              className="form-control"
            />
            {errors.name && touched.name && <p className="text-danger">{errors.name}</p>}
            
            <label htmlFor="participants">Participants</label>
            <input
              type="text"
              name="participants"
              onChange={handleChange}
              value={values.participants}
              className="form-control"
            />
            {errors.participants && touched.participants && <p className="text-danger">{errors.participants}</p>}

            <button
              className="btn btn-primary"
              type="submit"
              name="action"
            >
              Add Chat
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</Fragment>

    );
}