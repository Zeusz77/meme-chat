import { GET_MESSAGES } from './types';

const initialState = {};

export const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return action.payload;
        default:
            return state;
    }
};