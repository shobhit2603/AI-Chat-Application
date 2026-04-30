"use client";

import { useState } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./app.store";

export default function ReduxProvider({ children }) {
    // Create the store instance the first time this renders using lazy initialization
    const [store] = useState(() => makeStore());

    return <Provider store={store}>{children}</Provider>;
}