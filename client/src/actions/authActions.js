import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "../reducers/types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const loginUser = (userData, navigate, dispatch) => {
    axios.post('/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            navigate('/');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
    }