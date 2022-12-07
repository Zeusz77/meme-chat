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