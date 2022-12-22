import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import { useFormik } from "formik";

import {getTemplates} from "../actions/templateActions";
import {getTemplateSelector} from "../utils/selectors";
import {sendMessage} from "../actions/messageActions";

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

    const { values, handleSubmit, handleChange} = useFormik({
        initialValues: {
            template: "",
            text: [],
            chat: chatId,
        },

        onSubmit: (values) => {
            try {
                setError("");
                sendMessage(dispatch, values);
            }
            catch (err) {
                setError(err);
            }
        }
    });

    useEffect(() => {
        document.getElementById("selector").addEventListener("change", (e) => {
            const template = templateState.find(t => t.imageName === e.target.value);
            document.getElementById("tmp").src = `http://localhost:5000/api/templates/images/${template.imageName}`;
        });
    }, [templateState]);

    const renderFields = () => {
        if (values.template) {
            const template = templateState.find(t => t.imageName === values.template);
            const fields = template.fields.match(/\d+/g).reduce((acc, cur, idx) => {
                idx % 2 ? acc[acc.length - 1].push(cur) : acc.push([cur]);
                return acc;
            }, []);
              
            return fields.map((field, index) => (
                <div key={index} className="form-group">
                <label htmlFor={field}>{field[0]}, {field[1]}</label>
                <input
                    id={field}
                    name={'text[' + index + ']'}
                    type="text"
                    onChange={handleChange}
                    className="form-control"
                />
                </div>
            ));
        }
    }

    return (
    <form onSubmit={handleSubmit}>
        <div>
            <img id="tmp" src="" alt="Selected Template" height="175px" className="img-fluid" />
        </div>
        <div className="form-group">
            <label htmlFor="selector">Select a template:</label>
            <select id="selector" name="template" onChange={handleChange} className="form-control">
            <option defaultValue='' disabled={true}>Select a template</option>
            {  Array.isArray(templates) && !error &&
            templates.map(template => (
                <option key={template._id} value={template.imageName}>{template.name}</option>
            ))}
            </select>
        </div>
        {renderFields()}
        <button type="submit" className="btn btn-primary">Send</button>
    </form>
    );
}