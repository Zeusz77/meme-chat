import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { getChats } from "../actions/chatActions";
import { AddOrSearchChat } from "./AddOrSearchChat";
import { getIsLoggedIn } from "../utils/selectors";
import { getChatss } from "../utils/selectors";

//Display the list of chats belnging to the user
export const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(getIsLoggedIn);
    const chatState = useSelector(getChatss);

    //Get the chats from the server and set the state to the chats when the component mounts
    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate("/login");
        }

        const i1 = setInterval(() => {
            try {
                setError("");
                getChats(dispatch);
                setChats(chatState);
            } catch (err) {
                setError(err);
            }
        }, 1000);
        return () => clearInterval(i1);
    }, [dispatch, navigate, isLoggedIn, chatState]);

    return (
        <Fragment>
            <AddOrSearchChat />
            <div className="chat-list">
                { Array.isArray(chats) && !error &&
                    chats.map((chat) => (
                        <Link 
                            to={`/chat/${chat._id}`}
                            key={chat._id}
                            state={chat.name + " " + chat._id}
                        >
                             <div className="chat-list-item">
                                <div className="chat-list-item-name">
                                    {chat.name}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </Fragment>
    );
    }
