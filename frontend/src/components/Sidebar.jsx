"use client";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import {
    PencilSimpleLine,
    ChatCircleDots,
    SignOut,
    User,
    MountainsIcon,
    CaretUp,
    Moon,
    Sun,
} from "@phosphor-icons/react";
import { useAuth } from "@/features/auth/useAuth";
import { useChat } from "@/features/chats/useChat";
import { setCurrentChatId, clearTempMessages } from "@/store/chatSlice";
import { Trash } from "@phosphor-icons/react";

export default function Sidebar() {
    const [profileOpen, setProfileOpen] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (typeof document === "undefined") return "dark";
        return document.documentElement.classList.contains("dark") ? "dark" : "light";
    });
    const popoverRef = useRef(null);
    const dispatch = useDispatch();
    const { handleLogout } = useAuth();
    const { loadChatHistory, loadChat, handleDeleteChat } = useChat();

    const user = useSelector((state) => state.auth.user);
    const chatList = useSelector((state) => state.chat.chatList);
    const currentChatId = useSelector((state) => state.chat.currentChatId);

    useEffect(() => {
        loadChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function toggleTheme() {
        const nextTheme = theme === "dark" ? "light" : "dark";
        document.documentElement.classList.toggle("dark", nextTheme === "dark");
        localStorage.setItem("aura-theme", nextTheme);
        setTheme(nextTheme);
    }

    // Close popover on click outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (popoverRef.current && !popoverRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        }
        if (profileOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [profileOpen]);

    function handleNewChat() {
        dispatch(setCurrentChatId(null));
        dispatch(clearTempMessages());
    }

    function handleSelectChat(chatId) {
        loadChat(chatId);
    }

    function onDelete(e, chatId) {
        e.stopPropagation();
        if (confirm("Are you sure you want to delete this chat?")) {
            handleDeleteChat(chatId);
        }
    }

    function getInitials(name) {
        if (!name) return "?";
        return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
    }

    return (
        <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-70 min-w-70 h-screen bg-(--app-surface) border-r border-(--app-border) flex flex-col relative z-40"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-5 pb-3 shrink-0">
                <div className="flex items-center gap-2 hover:scale-105 duration-250 transition-transform cursor-pointer" onClick={handleNewChat}>
                    <div className="w-7.5 h-7.5 rounded-full bg-violet-600 flex items-center justify-center text-white">
                        <MountainsIcon size={16} weight="fill" />
                    </div>
                    <span className="text-base font-medium text-(--app-text) tracking-tight">
                        Aura.ai
                    </span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleNewChat}
                    title="New Chat"
                    className="w-8.5 h-8.5 rounded-[10px] border border-(--app-border-strong) bg-(--app-surface-muted) text-(--app-text-muted) flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-violet-600/15 hover:border-violet-600/30 hover:text-violet-500"
                >
                    <PencilSimpleLine size={18} weight="bold" />
                </motion.button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto px-2.5 py-2 flex flex-col gap-0.5">
                <span className="text-[10px] font-semibold text-(--app-text-subtle) uppercase tracking-widest px-2 pt-2 pb-2.5">
                    Recent Chats
                </span>
                <div className="flex flex-col gap-0.5">
                    {chatList.length === 0 && (
                        <div className="flex flex-col items-center gap-2 py-8 px-4 text-(--app-text-subtle) text-xs">
                            <ChatCircleDots size={20} weight="light" className="text-(--app-text-subtle)" />
                            <span>No chats yet</span>
                        </div>
                    )}
                    {chatList.map((chat) => (
                        <motion.button
                            key={chat._id}
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelectChat(chat._id)}
                            className={`group flex items-center gap-2.5 py-2.5 px-3 rounded-[10px] border bg-transparent text-[13px] cursor-pointer transition-all duration-150 text-left w-full ${
                                currentChatId === chat._id
                                    ? "bg-violet-600/20 text-violet-800 dark:text-violet-700 border-violet-600/15"
                                    : "border-transparent text-(--app-text-muted) hover:bg-(--app-hover) hover:text-(--app-text)"
                            }`}
                        >
                            <ChatCircleDots size={16} weight={currentChatId === chat._id ? "fill" : "regular"} className="shrink-0" />
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap flex-1">
                                {chat.title || "Untitled Chat"}
                            </span>
                            <div 
                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-500/20 text-red-400"
                                onClick={(e) => onDelete(e, chat._id)}
                                title="Delete Chat"
                            >
                                <Trash size={14} />
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Profile Section */}
            <div className="relative px-2.5 py-3 shrink-0 border-t border-(--app-border)" ref={popoverRef}>
                <AnimatePresence>
                    {profileOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scaleY: 0.9 }}
                            animate={{ opacity: 1, y: 0, scaleY: 1 }}
                            exit={{ opacity: 0, y: 10, scaleY: 0.9 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            className="absolute bottom-full left-2.5 right-2.5 mb-1 bg-(--app-panel) border border-(--app-border-strong) rounded-xl p-1 origin-bottom shadow-(--app-popover-shadow) z-50"
                        >
                            <button className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg border-none bg-transparent text-(--app-text-muted) text-[13px] cursor-pointer w-full transition-all duration-150 hover:bg-(--app-hover) hover:text-(--app-text)">
                                <User size={16} weight="regular" />
                                <span>Profile</span>
                            </button>
                            <button
                                className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg border-none bg-transparent text-(--app-text-muted) text-[13px] cursor-pointer w-full transition-all duration-150 hover:bg-(--app-hover) hover:text-(--app-text)"
                                onClick={toggleTheme}
                            >
                                {theme === "dark" ? <Sun size={16} weight="regular" /> : <Moon size={16} weight="regular" />}
                                <span>{theme === "dark" ? "Light mode" : "Dark mode"}</span>
                            </button>
                            <div className="h-px bg-(--app-border) mx-2 my-0.5" />
                            <button
                                className="flex items-center gap-2.5 py-2.5 px-3 rounded-lg border-none bg-transparent text-(--app-text-muted) text-[13px] cursor-pointer w-full transition-all duration-150 hover:bg-red-500/10 hover:text-red-400"
                                onClick={handleLogout}
                            >
                                <SignOut size={16} weight="regular" />
                                <span>Log out</span>
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    whileHover={{ backgroundColor: "var(--app-hover)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setProfileOpen((prev) => !prev)}
                    className="flex items-center gap-2.5 w-full py-2.5 px-2.5 rounded-xl border-none bg-transparent cursor-pointer transition-all duration-150"
                >
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white text-xs font-semibold tracking-tight shrink-0">
                        {getInitials(user?.name)}
                    </div>
                    <span className="flex-1 text-left text-[13px] font-medium text-(--app-text-muted) overflow-hidden text-ellipsis whitespace-nowrap">
                        {user?.name || "User"}
                    </span>
                    <motion.div
                        animate={{ rotate: profileOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-(--app-text-subtle) flex items-center"
                    >
                        <CaretUp size={14} weight="bold" />
                    </motion.div>
                </motion.button>
            </div>
        </motion.aside>
    );
}
