import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        chats: {},
        chatList: [],
        currentChatId: null,
        tempChat: null,
        tempMessages: [],
        isStreaming: false,
    },
    reducers: {
        setChats: (state, action) => {
            state.chats = action.payload;
        },
        setChatList: (state, action) => {
            state.chatList = action.payload;
        },
        removeChatFromList: (state, action) => {
            state.chatList = state.chatList.filter(chat => chat._id !== action.payload);
            delete state.chats[action.payload];
            if (state.currentChatId === action.payload) {
                state.currentChatId = null;
                state.tempMessages = [];
            }
        },
        addChatToList: (state, action) => {
            // Add to the front of the list (newest first)
            state.chatList.unshift(action.payload);
        },
        addChat: (state, action) => {
            state.chats[action.payload.id] = action.payload;
            state.currentChatId = action.payload.id;
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload;
        },
        appendMessage: (state, action) => {
            const { chatId, message } = action.payload;
            if (!state.chats[chatId]) state.chats[chatId] = { messages: [] };
            state.chats[chatId].messages.push(message);
        },
        appendMessageContent: (state, action) => {
            const { chatId, content } = action.payload;
            const msgs = state.chats[chatId].messages;
            if (msgs.length > 0) {
                msgs[msgs.length - 1].content += content;
            }
        },
        appendTempMessage: (state, action) => {
            state.tempMessages.push({
                role: action.payload.role,
                content: action.payload.content,
                timestamp: Date.now(),
            });
        },
        appendTempMessageContent: (state, action) => {
            const { index, content } = action.payload;
            state.tempMessages[index].content += content;
        },
        setTempChat: (state, action) => {
            state.tempChat = action.payload.chat;
        },
        setChatFromTempChat: (state) => {
            state.chats[state.tempChat.id] = state.tempChat;
            state.chats[state.tempChat.id].messages = state.tempMessages;
            state.currentChatId = state.tempChat.id;
            state.tempChat = null;
            state.tempMessages = [];
            state.isStreaming = false;
        },
        clearTempMessages: (state) => {
            state.tempMessages = [];
            state.tempChat = null;
        },
        setIsStreaming: (state, action) => {
            state.isStreaming = action.payload;
        },
    },
});

export const {
    setChats,
    setChatList,
    removeChatFromList,
    addChatToList,
    addChat,
    setCurrentChatId,
    appendMessage,
    appendMessageContent,
    appendTempMessage,
    appendTempMessageContent,
    setTempChat,
    setChatFromTempChat,
    clearTempMessages,
    setIsStreaming,
} = chatSlice.actions;
export default chatSlice.reducer;