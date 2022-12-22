import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getIsLoggedIn } from "../utils/selectors";
import { TemplateSchema } from "../schemas";
import { addTemplate } from "../actions/templateActions";

export const AddTemplate = () => {
    const [error, setError] = useState("");
    const [file, setFile] = useState("");   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(getIsLoggedIn);
    
    React.useEffect(() => {
        document.querySelector("img").addEventListener("click", (e) => {
            let tmp = document.createElement("li");
            // The innerHTML property contains the x and y coordinates of the click on the image
            tmp.innerHTML = e.offsetX + " " + e.offsetY;
            tmp.addEventListener("click", (e) => {
                e.target.remove();
            });
            document.querySelector("#fields").appendChild(tmp);
        });
    }, []);

    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }  
    }, [navigate, isLoggedIn]);

    const onSubmit = (values) => {
        try{
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('imageName', file.name);
            formData.append('numberOfFields', document.querySelectorAll("#fields li").length);
            let fields = '';
            document.querySelectorAll("#fields li").forEach((li) => {
                fields += li.innerHTML + " ";
            });
            formData.append('fields', fields);
            formData.append('file', file, file.name);
            setError("");
            dispatch(addTemplate(formData, navigate, dispatch));
        }
        catch(err){
            setError(err);
        }
    }

    const { values, handleChange, handleSubmit, errors, touched} = useFormik({
        initialValues: {
            name: "",
            imageName: "",
        },

        validationSchema: TemplateSchema,

        onSubmit,

    });

    return (
        <div className="container">
        {error.fields && <div className="alert alert-danger">{error.fields}</div>}
        <form 
            onSubmit={handleSubmit}
            encType="multipart/form-data"
        >
            <div className="text-center mb-4">
            <img alt="Your template" className="img-thumbnail" />
            </div>
            <ul id="fields">

            </ul>

            <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                onChange={handleChange}
                value={values.name}
                className="form-control"
            />
            {errors.name && touched.name && <p className="text-danger">{errors.name}</p>}
            </div>
            <div className="form-group">
            <label htmlFor="imageName">Image</label>
            <input
                type="file"
                name="imageName"
                onChange={(event) => {
                setFile(event.target.files[0]);
                handleChange(event);
                const img = document.querySelector('img');
                img.src = URL.createObjectURL(event.target.files[0]);
                }}
                value={values.imageName}
                className="form-control-file"
            />
            </div>
            <button type="submit" className="btn btn-primary">Add Template</button>
        </form>
        </div>
    )
}