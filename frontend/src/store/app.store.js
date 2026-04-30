import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            chat: chatReducer,
        },
    });
};