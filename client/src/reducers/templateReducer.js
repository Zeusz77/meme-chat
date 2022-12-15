import { GET_TEMPLATES } from './types';

const initialState = {};

export const templateReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_TEMPLATES:
            return action.payload;
        default:
            return state;
    }
};