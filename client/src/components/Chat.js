import React from "react";
import { useParams } from "react-router-dom";

export const Chat = () => {

    const { id } = useParams();

    return (
        <div>
            <h1>Chat: {id}</h1>
        </div>
    );
};