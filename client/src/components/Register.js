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
        <div>
            <h1>Register</h1>

            {error && <div>Incorrect email or password</div>}

            <form onSubmit={handleSubmit}>

                <label htmlFor="handle">Handle</label>
                <input
                    type="text"
                    name="handle"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.handle}
                />
                {errors.handle && touched.handle && <p>{errors.handle}</p>}

                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                />
                {errors.email && touched.email && <p>{errors.email}</p>}

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                />
                {errors.password && touched.password && <p>{errors.password}</p>}

                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input
                    type="password"
                    name="passwordConfirm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                />
                {errors.passwordConfirm && touched.passwordConfirm && <p>{errors.passwordConfirm}</p>}

                <button type="submit">Register</button>
            </form>
        </div>
    );
};