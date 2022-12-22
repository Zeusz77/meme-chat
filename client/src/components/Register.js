import React, {useState} from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { RegisterSchema } from '../schemas';
import { registerUser } from '../actions/authActions';

export const Register = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (values) => {
        try {
            setError("");
            dispatch(registerUser(values, navigate, dispatch));
        } catch (err) {
            setError(err);
        }
    };

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues: {
            handle: "",
            email: "",
            password: "",
            passwordConfirm: ""
        },
        validationSchema: RegisterSchema,
        onSubmit,
    });

    return (
        <div className="container">
        <h1 className="text-center mb-4">Register</h1>

        {error && <div className="alert alert-danger">Incorrect email or password</div>}

        <form onSubmit={handleSubmit}>

            <label htmlFor="handle" >Handle</label>
            <input
                type="text"
                name="handle"
                placeholder="Handle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.handle}
                className="form-control mb-2"
            />
            {errors.handle && touched.handle && <p className="text-danger">{errors.handle}</p>}
            <br/>
            <label htmlFor="email" >Email</label>
            <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                className="form-control mb-2"
            />
            {errors.email && touched.email && <p className="text-danger">{errors.email}</p>}
            <br/>
            <label htmlFor="password" >Password</label>
            <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="form-control mb-2"
            />
            {errors.password && touched.password && <p className="text-danger">{errors.password}</p>}
            <br/>
            <label htmlFor="passwordConfirm" >Confirm Password</label>
            <input
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirm}
                className="form-control mb-2"
            />
            {errors.passwordConfirm && touched.passwordConfirm && <p className="text-danger">{errors.passwordConfirm}</p>}
            <br/>
            <button type="submit" className="btn btn-primary btn-block">Register</button>
        </form>
    </div>

    );
};