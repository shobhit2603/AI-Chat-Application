"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { PaperPlaneTilt, Sparkle } from "@phosphor-icons/react";
import { useChat } from "@/features/chats/useChat";
import Sidebar from "@/components/Sidebar";

export default function Home() {
    const { handleGetAIResponse } = useChat();
    const tempMessages = useSelector((state) => state.chat.tempMessages);
    const currentChatId = useSelector((state) => state.chat.currentChatId);
    const chats = useSelector((state) => state.chat.chats);
    const isStreaming = useSelector((state) => state.chat.isStreaming);
    const currentChat = chats[currentChatId];

    const [message, setMessage] = useState("");
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Get the messages to display
    const displayMessages = useMemo(() => currentChat?.messages || tempMessages || [], [currentChat?.messages, tempMessages]);
    const showEmptyState = displayMessages.length === 0 && !isStreaming;

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [displayMessages, isStreaming]);

    // Auto resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "24px";
            textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
        }
    }, [message]);

    function handleSend() {
        const trimmed = message.trim();
        if (!trimmed || isStreaming) return;
        setMessage("");
        handleGetAIResponse({ message: trimmed, chatId: currentChatId || null });
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }

    const bubbleFadeUp = {
        hidden: { opacity: 0, y: 12, scale: 0.97 },
        visible: {
            opacity: 1, y: 0, scale: 1,
            transition: { type: "spring", stiffness: 400, damping: 30 },
        },
    };

    const dotBounce = (delay) => ({
        y: [0, -6, 0],
        transition: { duration: 0.6, repeat: Infinity, delay, ease: "easeInOut" },
    });

    return (
        <div className="flex w-full h-screen bg-background text-foreground overflow-hidden transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 flex flex-col h-screen relative overflow-hidden">
                {showEmptyState ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="flex-1 flex flex-col items-center justify-center gap-4 p-10"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                            className="w-14 h-14 rounded-[18px] bg-linear-to-br from-violet-500 to-violet-700 flex items-center justify-center text-white mb-2 shadow-[0_0_40px_rgba(139,92,246,0.2)]"
                        >
                            <Sparkle size={28} weight="fill" />
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-[22px] font-medium text-(--app-text) tracking-tight"
                        >
                            What can I help you with?
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm text-(--app-text-subtle) max-w-[320px] text-center leading-relaxed"
                        >
                            Start a conversation with Aura — ask anything, explore ideas, or get instant help.
                        </motion.p>
                    </motion.div>
                ) : (
                    <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-1">
                        <div className="max-w-180 w-full mx-auto px-6 flex flex-col gap-1">
                            <AnimatePresence initial={false}>
                                {displayMessages.map((msg, i) => (
                                    <motion.div
                                        key={msg.timestamp ? `${msg.timestamp}-${i}` : `msg-${i}`}
                                        variants={bubbleFadeUp}
                                        initial="hidden"
                                        animate="visible"
                                        className={`flex gap-3 py-1.5 w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div className={`flex flex-col max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                                            <div className={`flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider mb-1 px-1 ${
                                                msg.role === "user" ? "text-violet-500 flex-row-reverse" : "text-(--app-text-subtle)"
                                            }`}>
                                                <span>{msg.role === "user" ? "You" : "Aura"}</span>
                                                {msg.timestamp && (
                                                    <span className="text-[9px] font-normal normal-case opacity-50">
                                                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                )}
                                            </div>
                                            {msg.role === "ai" && msg.content === "" && isStreaming ? (
                                                <div className="flex items-center gap-1.25 py-3.5 px-5 bg-(--app-surface-muted) rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-md border border-(--app-border) w-fit shrink-0">
                                                    <motion.div className="w-1.5 h-1.5 rounded-full bg-violet-600/60" animate={dotBounce(0)} />
                                                    <motion.div className="w-1.5 h-1.5 rounded-full bg-violet-600/60" animate={dotBounce(0.15)} />
                                                    <motion.div className="w-1.5 h-1.5 rounded-full bg-violet-600/60" animate={dotBounce(0.3)} />
                                                </div>
                                            ) : (
                                                <div className={`px-4.5 py-3 text-sm leading-relaxed tracking-[0.01em] wrap-break-word whitespace-pre-wrap inline-block ${
                                                    msg.role === "user"
                                                        ? "bg-violet-600 text-white rounded-tl-[20px] rounded-tr-[20px] rounded-br-md rounded-bl-[20px] shadow-[0_2px_16px_rgba(139,92,246,0.2)] text-left"
                                                        : "bg-(--app-surface-muted) text-(--app-text) rounded-tl-[20px] rounded-tr-[20px] rounded-br-[20px] rounded-bl-md border border-(--app-border) text-left"
                                                }`}>
                                                    {msg.content}
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                )}

                {/* Input Bar */}
                <div className="shrink-0 px-6 pb-6 pt-3 flex justify-center">
                    <div className="max-w-180 w-full flex items-end gap-2.5 bg-(--app-panel) border border-(--app-border-strong) rounded-[20px] pl-5 pr-1.5 py-1.5 transition-all duration-300 backdrop-blur-xl focus-within:border-violet-600/30 focus-within:shadow-(--app-input-shadow)">
                        <textarea
                            ref={textareaRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Message Aura..."
                            rows={1}
                            className="flex-1 bg-transparent border-none outline-none text-(--app-text) text-sm leading-relaxed resize-none min-h-6 max-h-37.5 py-2 font-[inherit] placeholder:text-(--app-text-subtle)"
                        />
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={handleSend}
                            disabled={!message.trim() || isStreaming}
                            className="w-10 h-10 rounded-[14px] border-none bg-violet-600 text-white flex items-center justify-center cursor-pointer transition-all duration-200 shrink-0 hover:bg-violet-700 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
                        >
                            <PaperPlaneTilt size={18} weight="fill" />
                        </motion.button>
                    </div>
                </div>
            </main>
        </div>
    );
}
