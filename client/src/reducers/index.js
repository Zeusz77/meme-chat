// Root reducer

import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { errorReducer } from './auth/errorReducer';
import { chatReducer } from './chatReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    chats: chatReducer
});
