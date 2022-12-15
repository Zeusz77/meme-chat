// Root reducer

import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { errorReducer } from './auth/errorReducer';
import { chatReducer } from './chatReducer';
import { messageReducer } from './messageReducer';
import { templateReducer } from './templateReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer,
    chats: chatReducer,
    messages: messageReducer,
    templates: templateReducer
});
