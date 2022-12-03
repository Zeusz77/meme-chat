// Root reducer

import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { errorReducer } from './auth/errorReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    error: errorReducer
});
