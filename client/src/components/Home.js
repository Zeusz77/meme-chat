import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getIsLoggedIn } from '../utils/selectors';
import { MessageList } from './MessageList';

export const Home = () => {
    const isLoggedIn = useSelector(getIsLoggedIn);

    return (
        <div>
            {isLoggedIn ? ( 
                <MessageList />
             ) : (
                <Fragment>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/register">Register</Link>
                    </li>
                </Fragment>
            )}
        </div>
    );
};