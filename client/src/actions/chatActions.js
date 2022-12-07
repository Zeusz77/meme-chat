import axios from "axios";

import { GET_CHATS, GET_ERRORS } from "../reducers/types";

export const getChats = (dispatch) => {
    axios.get('http://localhost:5000/api/chats/all')
        .then(res => {
            dispatch({
                type: GET_CHATS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
};

export const createChat = (chatData, navigate, dispatch) => {
    chatData = {
        name: chatData.name,
        // get the participants and add the current user to the list
        participants: chatData.participants.split(',').map(participant => participant.trim())
    }
    axios.post('http://localhost:5000/api/chats/create', chatData)
        .then(res => {
            navigate(`/chat/${res.data._id}`);
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
};