import axios from 'axios';
import { GET_ERRORS } from "./types";

export const registerUser = (userData, navigate) => dispatch => {

    axios.post('/api/users/register', userData)
    .then(res => {
        navigate('/login');
    })
    .catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })}
    );
};