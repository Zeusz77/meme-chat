import axios from "axios";

import { GET_TEMPLATES, GET_ERRORS } from "../reducers/types";

const setTemplates = (templates) => {
    return {
        type: GET_TEMPLATES,
        payload: templates
    }
}

export const getTemplates = (dispatch) => {
    axios.get('http://localhost:5000/api/templates/all')
        .then(res => {
            //console.log(res.data);
            const templates = res.data;
            dispatch(setTemplates(templates));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
}

export const addTemplate = (templateData, navigate, dispatch) => {
    axios.post('http://localhost:5000/api/templates/upload', templateData , {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(res => {
            console.log(res.data);
            navigate("/chatList");
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
}