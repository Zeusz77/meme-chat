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

/*import React, { useEffect } from "react";
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
        const formatted = {
            template: templates.find(t => t.imageName === values.template).name,
            text: [],
        }
        console.log(formatted);
        try {
            setError("");
            //sendMessage(values);
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
                        name={'text[' + index + ']'}
                        type="text"
                        onChange={handleChange}
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
                            onChange={handleChange}
                            value={template.imageName}
                        />
                    </div>
                ))}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};*/

/*import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useForm } from 'react-hook-form';

import { getTemplates } from "../actions/templateActions";
import { getTemplateSelector } from "../utils/selectors";
//import { sendMessage } from "../actions/messageActions";

export const Create = () => {
    const [error, setError] = useState("");
    const [templates, setTemplates] = useState("");
    const [selectedTemplate, setSelectedTemplate] = useState({
        _id: "",
        name: "",
        imageName: "",
        fields: ""
    });
    const dispatch = useDispatch();
    const templateState = useSelector(getTemplateSelector);
    const { handleSubmit } = useForm();

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

    useEffect(() => {
        document.querySelector("#selector").addEventListener('input', event => {
            const selectedTemplateId = event.target.value;
            setSelectedTemplate(templates.find(template => template._id === selectedTemplateId));
            console.log(selectedTemplate);
            document.getElementById("tmp").src = `http://localhost:5000/api/templates/images/${selectedTemplate.imageName}`;
        });
    }, [templates, selectedTemplate]);

    const onTemplateSelected = event => {
        const selectedTemplateId = event.target.value;
        setSelectedTemplate(templates.find(template => template._id === selectedTemplateId));
        console.log(selectedTemplate);
        document.getElementById("tmp").src = `http://localhost:5000/api/templates/images/${selectedTemplate.imageName}`;
    }

    const onSubmit = data => {
        // Create a new message object using the selected template and form data
        const message = {
        template: selectedTemplate,
        text: data.text,
        chat: chatId,
        date: new Date()
        };

        console.log(message);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <label>
            <div>
                <img id="tmp" src="" alt="Selected Template" height="175px"/>
            </div>
            Select a template:
            <select id="selector" name="template">
                <option value='' selected='true' disabled='true'>Select a template</option>
                {  Array.isArray(templates) && !error &&
                templates.map(template => (
                    <option key={template._id} value={template._id}>{template.name}</option>
                ))}
            </select>
        </label>
        {selectedTemplate && (
            <div>
            {selectedTemplate.fields.split(',').map((field, index) => (
                <label key={field}>
                {field}:
                <input type="text" name={`text[${index}]`} />
                </label>
            ))}
            </div>
        )}
        <button type="submit">Send message</button>
        </form>
    );
}; */