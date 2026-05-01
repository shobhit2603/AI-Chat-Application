import chatModel from "../models/chat.model.js";

export async function createChat({title, user, messages = []}) {
    const chat = await chatModel.create({ title, user, messages });
    return chat;
}

export async function getChatsByUser(userId) {
    const chats = await chatModel.find({ user: userId, isDeleted: false })
        .sort({ createdAt: -1 })
        .select("title createdAt messages")
        .lean();
    return chats;
}

export async function getChatById(chatId, userId) {
    const chat = await chatModel.findOne({ _id: chatId, user: userId, isDeleted: false }).lean();
    return chat;
}

export async function addMessagesToChat(chatId, messages) {
    return await chatModel.findByIdAndUpdate(
        chatId,
        { $push: { messages: { $each: messages } } },
        { new: true }
    );
}

export async function softDeleteChat(chatId, userId) {
    return await chatModel.findOneAndUpdate(
        { _id: chatId, user: userId },
        { isDeleted: true },
        { new: true }
    );
}