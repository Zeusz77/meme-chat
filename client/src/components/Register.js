import React from 'react';
import { Formik } from 'formik';

export const Register = () => {
    return (
        <div>
            <h1>Register</h1>

            <Formik
                initialValues={{ handle: '', email: '', password: '', confirmPassword: '' }}
                validate={(values) => {
                    const errors = {};
                    if (!values.handle) {
                        errors.handle = 'Required';
                    }
                    if (!values.email) {
                        errors.email = 'Required';
                    } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
                    ) {
                        errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                        errors.password = 'Required';
                    } else if (values.password.length < 6) {
                        errors.password = 'Password must be at least 6 characters';
                    }
                    if (!values.confirmPassword) {
                        errors.confirmPassword = 'Required';
                    } else if (values.confirmPassword !== values.password) {
                        errors.confirmPassword = 'Passwords must match';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,

                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="handle"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.handle}
                        />

                        {errors.handle && touched.handle && errors.handle}

                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                        />

                        {errors.email && touched.email && errors.email}

                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                        />

                        {errors.password && touched.password && errors.password}

                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                        />

                        {errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}

                        <button type="submit" disabled={isSubmitting}>
                            Register
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};