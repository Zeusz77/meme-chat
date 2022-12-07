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
            <div className="row">
                <form onSubmit={handleSubmit}>
                    {error && <div>Imput couldn't be parsed</div>}
                    <div className="col s12">
                        <div className="input-field">
                            <input
                                type="text"
                                name="name"
                                onChange={handleChange}
                                value={values.name}
                            />
                            <label htmlFor="name">Chat Name</label>
                            {errors.name && touched.name && <p>{errors.name}</p>}
                            
                            <input
                                type="text"
                                name="participants"
                                onChange={handleChange}
                                value={values.participants}
                            />
                            <label htmlFor="participants">Participants</label>
                            {errors.participants && touched.participants && <p>{errors.participants}</p>}

                            <button
                                className="btn waves-effect waves-light"
                                type="submit"
                                name="action"
                            >
                                Add Chat
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}