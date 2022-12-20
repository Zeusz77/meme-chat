import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Required"),
});

export const RegisterSchema = yup.object().shape({
    handle: yup.string().required("Required"),
    email: yup.string().email("Please enter a valid email").required("Required"),
    password: yup.string().required("Required"),
    passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required("Required"),
});

export const TemplateSchema = yup.object().shape({
    name: yup.string().required("Required"),
    imageName: yup.string().required("Required"),
});