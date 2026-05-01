import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import authReducer from "./authSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            chat: chatReducer,
            auth: authReducer,
        },
    });
};