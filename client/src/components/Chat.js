import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMessages, createMessage } from "../actions/messageActions";
import { getMessageSelector } from "../utils/selectors";

export const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [error, setError] = useState(null);
    const messageState = useSelector(getMessageSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        try {
            setError("");
            getMessages(dispatch);
            setMessages(messageState);
        }
        catch (err) {
            setError(err);
        }
    }, [dispatch, messageState]);

    const { state } = useLocation();

    return (
        <div className="container">
            <h1>Chat: {state}</h1>
            <div className="row">
                <div className="col">
                    {// Display Chat Messages

                        

                    }  
                </div>
                <div className="col">
                    
                </div>
            </div>
        </div>
    );
};