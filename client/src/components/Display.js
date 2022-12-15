import React from "react";
import { useLocation } from "react-router-dom";

export const Display = () => {

    const state = useLocation();
    const chatId = state.state.split(" ")[1];

    return (
        <div>
            <h3>Display: {chatId}</h3>
        </div>
    );
};