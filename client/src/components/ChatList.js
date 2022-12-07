import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getChats } from "../actions/chatActions";
import { AddOrSearchChat } from "./AddOrSearchChat";

//Display the list of chats belnging to the user
export const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Get the chats from the server and set the state to the chats when the component mounts
    React.useEffect(() => {
        try {
            setError("");
            getChats(dispatch).then((res) => {
                setChats(res);
            });
        } catch (err) {
            setError(err);
        }
    }, [dispatch]);

    return (
        <Fragment>
            <AddOrSearchChat />
            <div className="chat-list">
                { !!error &&
                    chats.map((chat) => (
                    <div
                        key={chat._id}
                        className="chat-list-item"
                        onClick={() => navigate(`/chat/${chat._id}`)}
                    >
                        {chat.name}
                    </div>
                ))}
            </div>
        </Fragment>
    );
    }
