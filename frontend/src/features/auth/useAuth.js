"use client";

import { useDispatch } from "react-redux";
import { setUser, clearUser } from "@/store/authSlice";
import { fetchCurrentUser, logoutUser } from "./auth.api";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    async function checkAuth() {
        try {
            const user = await fetchCurrentUser();
            dispatch(setUser(user));
            return true;
        } catch {
            dispatch(clearUser());
            return false;
        }
    }

    async function handleLogout() {
        try {
            await logoutUser();
        } catch {
            // Even if the request fails, clear client state
        }
        dispatch(clearUser());
        router.push("/auth");
    }

    return {
        checkAuth,
        handleLogout,
    };
};
