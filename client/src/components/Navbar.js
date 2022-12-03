import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

import { getIsLoggedIn, getUser } from '../utils/selectors';
import { logout } from '../actions/authActions';

export const Navbar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn);
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            await dispatch(logout(navigate, dispatch));
        } catch (err) {}
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Meme-chat</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>

                        {isLoggedIn ? (
                            <li className="nav-item">
                                <a onClick={handleClick} className="nav-link" href="#logout">
                                    Logout {user.handle}
                                </a>
                            </li>
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
                        
                    </ul>
                </div>
            </div>
        </nav>


    );
};