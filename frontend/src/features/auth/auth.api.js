
export async function fetchCurrentUser() {
    const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Not authenticated");
    }

    const data = await res.json();
    return data.user;
}

export async function logoutUser() {
    const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Logout failed");
    }

    return true;
}
