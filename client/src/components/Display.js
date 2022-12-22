import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMessagesSelector } from "../utils/selectors";
import { getMessages } from "../actions/messageActions";

export const Display = () => {
const [error, setError] = useState("");
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
    } catch (err) {
    setError(err);
    }
}, 1000);
return () => clearInterval(i1);
}, [chatId, messagesState, dispatch]);

return (
<div>
    {error && <div className="alert alert-danger">{error}</div>}
    <div className="display col">
    {Array.isArray(messages) &&
        !error &&
        messages.reverse().map((message) => (
        <div key={message._id} className="col-12 col-md-6">
            <div className="display-item card">
            <div className="card-body d-flex">
                <div className="display-item-name align-items-center">
                <img
                    src={message.userAvatar}
                    alt=""
                    height="150vh"
                    style={{ maxWidth: "100%" }}
                    className="img-fluid rounded-circle"
                />
                <p className="ml-3">{message.user}</p>
                </div>
                <img
                src={`http://localhost:5000/api/messages/images/${message.messageImage}`}
                alt=""
                height="150vh"
                style={{ maxWidth: "80%" }}
                className="img-fluid ml-auto"
                />
            </div>
            </div>
        </div>
        ))}
    </div>
</div>
);
};
