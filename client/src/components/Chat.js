import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Display } from "./Display";
import { Create } from "./Create";

export const Chat = () => {
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            setError("");
        }
        catch (err) {
            setError(err);
        }
    }, []);

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