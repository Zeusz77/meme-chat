import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getIsLoggedIn } from "../utils/selectors";
import { TemplateSchema } from "../schemas";
import { addTemplate } from "../actions/templateActions";

export const AddTemplate = () => {
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(getIsLoggedIn);
    
    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }  
    }, [dispatch, navigate, isLoggedIn]);


    const { values, handleChange, handleSubmit, errors, touched} = useFormik({
        initialValues: {
            name: "",
            imageName: "",
            numberOfFields: "",
            fields: "",
        },

        validationSchema: TemplateSchema,

        onSubmit: (values) => {
            try{
                setError("");
                dispatch(addTemplate(values, navigate, dispatch));
            }
            catch(err){
                setError(err);
            }
        }

    });

    return (
        <div>
            {error.fields && <div>{error.fields}</div>}
            <form 
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                />
                {errors.name && touched.name && <p>{errors.name}</p>}
                <input
                    type="file"
                    name="imageName"
                    onChange={handleChange}
                    value={values.imageName}
                />
                {errors.imageName && touched.imageName && <p>{errors.imageName}</p>}
                <input
                    type="number"
                    name="numberOfFields" 
                    onChange={handleChange}
                    value={values.numberOfFields}
                />
                {errors.numberOfFields && touched.numberOfFields && <p>{errors.numberOfFields}</p>}
                <input
                    type="text"
                    name="fields"
                    onChange={handleChange}
                    value={values.fields}    
                />
                {errors.fields && touched.fields && <p>{errors.fields}</p>}
                <button type="submit">Add Template</button>
            </form>
        </div>
    )
}