import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getIsLoggedIn } from '../utils/selectors';

export const Home = () => {
    const isLoggedIn = useSelector(getIsLoggedIn);
    const navigate = useNavigate();
        
    useEffect(() => {
        if (isLoggedIn) {
            navigate('/chatList');
        }
    }, [isLoggedIn, navigate]);

    return (
        <div>
            {isLoggedIn ? ( 
                null
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