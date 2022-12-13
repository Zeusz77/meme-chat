import axios from "axios";

import { GET_MESSAGES, GET_ERRORS } from "../reducers/types";

const setMessages = (messages) => {
    return {
        type: GET_MESSAGES,
        payload: messages
    }
}

export const getMessages = (dispatch) => {
    axios.get('http://localhost:5000/api/messages/all')
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

export const createMessage = (messageData, navigate, dispatch) => {
    messageData = {
        name: messageData.name,
        // get the participants and add the current user to the list
        participants: messageData.participants.split(',').map(participant => participant.trim())
    }
    axios.post('http://localhost:5000/api/messages/create', messageData)
        .then(res => {
            navigate(`/message/${res.data._id}`);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
}