import axios from "axios";

import { GET_MESSAGES, GET_ERRORS } from "../reducers/types";

const setMessages = (messages) => {
    return {
        type: GET_MESSAGES,
        payload: messages
    }
}

export const getMessages = (chatId ,dispatch) => {
    axios.get(`http://localhost:5000/api/messages/get`, {params: {chatId: chatId}})
        .then(res => {
            //console.log(res.data);
            const messages = res.data;
            dispatch(setMessages(messages));
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
}

export const sendMessage = (dispatch, values) => {
    axios.post(`http://localhost:5000/api/messages/create`, values)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
}