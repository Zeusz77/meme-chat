import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLocation } from "react-router-dom";

import { getTemplates } from "../actions/templateActions";
import { getTemplateSelector } from "../utils/selectors";
import { sendMessage } from "../actions/messageActions";

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

    const onSubmit = (values) => {
        console.log(values);
        try {
            setError("");
            sendMessage(values);
        }
        catch (err) {
            setError(err);
        }
    };

    const { values, handleChange, handleSubmit, errors, touched} = useFormik({
        initialValues: {
            template: "",
            text: [],
            chat: chatId,
        },

        onSubmit,
    });

    const renderFields = () => {
        if (values.template) {
            const template = templates.find(t => t.imageName === values.template);
            const fields = template.fields.match(/\d+/g).reduce((acc, cur, idx) => {
                idx % 2 ? acc[acc.length - 1].push(cur) : acc.push([cur]);
                return acc;
            }, []);
              
            return fields.map((field, index) => (
                <div key={index}>
                    <label htmlFor={field}>{field[0]}, {field[1]}</label>
                    <input
                        id={field}
                        name={field}
                        type="text"
                        onChange={handleChange}
                        value={values[field]}
                    />
                    {errors[field] && touched[field] && <div>{errors[field]}</div>}
                </div>
            ));
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {renderFields()}
                {Array.isArray(templates) && !error && templates.map((template) => (
                    <div key={template._id}>
                        <img src={`http://localhost:5000/api/templates/images/${template.imageName}`} alt="" height='125vh'/>
                        <input
                            type="radio"
                            name="template"
                            value={template.name}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

