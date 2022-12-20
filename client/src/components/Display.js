import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMessagesSelector } from "../utils/selectors";
import { getMessages } from "../actions/messageActions";

export const Display = () => {
    const [error, setError] = useState('');
    const [messages, setMessages] = useState([]);
    const messagesState = useSelector(getMessagesSelector);

    const dispatch = useDispatch();

    const state = useLocation();
    const chatId = state.state.split(" ")[1];

    useEffect(() => {
        const i1 = setInterval(() => {
            try {
                setError("");
                getMessages(chatId, dispatch);
                setMessages(messagesState);
            }
            catch (err) {
                setError(err);
            }
        }, 1000);
        return () => clearInterval(i1);
    }, [chatId, messagesState, dispatch]);

    return (
        <div>
            { error && <div className="alert alert-danger">{error}</div> }
            <div className="display">
                { Array.isArray(messages) && !error &&
                    messages.map((message) => (
                        <div key={message._id} className="display-item">
                            <div className="display-item-name">
                                <p>{message.user}</p>
                                <img src={message.userAvatar} alt="" height='150vh'/>
                                <img src={`http://localhost:5000/api/messages/${message._id}`} alt="" height='150vh'/>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};