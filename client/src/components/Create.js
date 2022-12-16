import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { getTemplates } from "../actions/templateActions";
import { getTemplateSelector } from "../utils/selectors";

export const Create = () => {
    const [error, setError] = useState("");
    const [templates, setTemplates] = useState("");
    const dispatch = useDispatch();
    const templateState = useSelector(getTemplateSelector);

    const state = useLocation();
    const chatId = state.state.split(" ")[1];

    useEffect(() => {

        const i2 = setInterval(() => {
            try {
                setError("");
                getTemplates(dispatch);
                setTemplates(templateState);
            }
            catch (err) {
                setError(err);
            }
        }, 1000);
        return () => clearInterval(i2);
    }, [dispatch, templateState]);


    const { values, handleChange, handleSubmit, errors, touched} = useFormik({
        initialValues: {
            template: "",
            text: '',
            chat: chatId,
        },

        onSubmit: (values) => {
            console.log(values);
        }

        
    });

    

    return (
        <div>
            <form>
                

                {Array.isArray(templates) && !error && templates.map((template) => (
                    <div key={template._id}>
                        <img src={`http://localhost:5000/api/templates/images/${template.imageName}`} alt=""/>
                        <input
                            type="radio"
                            name="template"
                            value={template.imageName}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                
            </form>
        </div>
    );
};