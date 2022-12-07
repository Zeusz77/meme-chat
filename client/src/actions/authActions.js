import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER, LOUGOUT_USER } from "../reducers/types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

export const loginUser = (userData, navigate, dispatch) => {
    axios.post('http://localhost:5000/api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
            navigate('/chatList');
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
};

export const registerUser = (userData, navigate, dispatch) => {
    axios.post('http://localhost:5000/api/users/register', userData)
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

export const logout = (navigate, dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthToken();
    dispatch(
        {
            type: LOUGOUT_USER,
        }
    );
    navigate('/');
}