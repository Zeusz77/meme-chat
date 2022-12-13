// Root reducer

import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { errorReducer } from './auth/errorReducer';
import { chatReducer } from './chatReducer';
import { messageReducer } from './messageReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    chats: chatReducer,
    messages: messageReducer
});
