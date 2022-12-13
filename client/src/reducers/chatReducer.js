import { GET_CHATS, LOUGOUT_USER } from "./types";

const initialState = {};

export const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOUGOUT_USER:
            return {
                ...state,
                chats: []
            };
        case GET_CHATS:
            return action.payload;
        default:
            return state;
    }
}