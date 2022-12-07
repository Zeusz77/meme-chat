import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getChats } from "../actions/chatActions";
import { AddOrSearchChat } from "./AddOrSearchChat";
import { getIsLoggedIn } from "../utils/selectors";

//Display the list of chats belnging to the user
export const ChatList = () => {
    const chats = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn);

    //Get the chats from the server and set the state to the chats when the component mounts
    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }

        const i1 = setInterval(() => {
            try {
                setError("");
                getChats(dispatch);
            } catch (err) {
                setError(err);
            }
        }, 1000);
        return () => clearInterval(i1);
    }, [dispatch, navigate, isLoggedIn]);

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
