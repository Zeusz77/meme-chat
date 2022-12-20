import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Display } from "./Display";
import { Create } from "./Create";
import { getIsLoggedIn } from "../utils/selectors";

export const Chat = () => {
    const [error, setError] = useState(null);
    const isLoggenIn = useSelector(getIsLoggedIn);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggenIn) {
            navigate("/login");
        }

        try {
            setError("");
        }
        catch (err) {
            setError(err);
        }
    }, [isLoggenIn, navigate]);

    const { state } = useLocation();

    return (
        <div className="container">
            <h1>{ 
                state ? state.split(" ")[0] : "No chat selected"
            }</h1>
            { error && <div className="alert alert-danger">{error}</div> }
            <div className="row">
                <div className="col">
                   <Display />
                </div>
                <div className="col">
                    <Create />
                </div>
            </div>
        </div>
    );
};