// Root reducer

import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { userReducer } from './auth/userReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});
