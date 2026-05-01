import { getAiResponse, fetchChatHistory, fetchChatById, deleteChatById } from "./chat.api";
import {
    addChat,
    addChatToList,
    appendMessage,
    appendMessageContent,
    appendTempMessage,
    appendTempMessageContent,
    clearTempMessages,
    removeChatFromList,
    setChatFromTempChat,
    setChatList,
    setCurrentChatId,
    setIsStreaming,
    setTempChat
} from "@/store/chatSlice";
import { useDispatch, useSelector } from "react-redux";

export const useChat = () => {

    const dispatch = useDispatch();
    const chats = useSelector(state => state.chat.chats);

    async function handleGetAIResponse({ message, chatId }) {
        dispatch(setIsStreaming(true));
        
        const isNewChat = !chatId;

        if (isNewChat) {
            dispatch(clearTempMessages());
            dispatch(appendTempMessage({
                role: "user",
                content: message,
                timestamp: Date.now()
            }));
            dispatch(appendTempMessage({
                role: "ai",
                content: "",
                timestamp: Date.now()
            }));
        } else {
            dispatch(appendMessage({
                chatId,
                message: { role: "user", content: message, timestamp: Date.now() }
            }));
            dispatch(appendMessage({
                chatId,
                message: { role: "ai", content: "", timestamp: Date.now() + 1 }
            }));
        }

        await getAiResponse({
            message, chatId,
            onContent: (content) => {
                if (isNewChat) { 
                    dispatch(appendTempMessageContent({ index: 1, content }));
                } else {
                    dispatch(appendMessageContent({ chatId, content }));
                }
            },
            onChat: (chat) => {
                // Only called for new chats when title is generated
                dispatch(setTempChat({ chat }));
                dispatch(addChatToList({
                    _id: chat.id,
                    title: chat.title,
                    createdAt: new Date().toISOString(),
                }));
            },
            onComplete: () => {
                if (isNewChat) {
                    dispatch(setChatFromTempChat());
                } else {
                    dispatch(setIsStreaming(false));
                }
            }
        });
    }

    async function loadChatHistory() {
        try {
            const chats = await fetchChatHistory();
            dispatch(setChatList(chats));
        } catch (error) {
            console.error("Failed to load chat history:", error);
        }
    }

    async function loadChat(id) {
        if (chats[id]) {
            dispatch(setCurrentChatId(id));
            dispatch(clearTempMessages());
            return;
        }

        try {
            const chat = await fetchChatById(id);
            dispatch(addChat({ id: chat._id, ...chat, messages: chat.messages || [] }));
            dispatch(setCurrentChatId(chat._id));
            dispatch(clearTempMessages());
        } catch (error) {
            console.error("Failed to load chat:", error);
        }
    }

    async function handleDeleteChat(id) {
        try {
            await deleteChatById(id);
            dispatch(removeChatFromList(id));
        } catch (error) {
            console.error("Failed to delete chat:", error);
        }
    }

    return {
        handleGetAIResponse,
        loadChatHistory,
        loadChat,
        handleDeleteChat
    };
};