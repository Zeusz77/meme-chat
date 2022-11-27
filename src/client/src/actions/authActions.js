import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GET_ERRORS } from "./types";

export const registerUser = (userData, history) => dispatch => {

    const navigate = useNavigate();

    axios.post('/api/users/register', userData)
    .then(res => navigate('/login'))
    .catch(err => 
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    );
};