import * as chatDao from "../dao/chat.dao.js";
import { getAIResponse, getTitle } from "../services/ai.service.js";


export async function handleMessage(req, res) {
    const { content, chatId } = req.body;

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");


    const generateTitle = async () => {
        if (!chatId) {
            const data = await getTitle({ message: content })
            const chat = await chatDao.createChat({ 
                title: data.chatTitle, 
                user: req.user.id,
                messages: [{ role: "user", content }] 
            })
            res.write(`title: ${JSON.stringify({ title: data.chatTitle, chatId: chat._id })}\n\n`)
            return chat
        }
        return null
    }

    const aiStream = async () => {
        const stream = await getAIResponse({ content });

        let AIMessage = ""

        for await (const chunk of stream) {
            AIMessage += chunk[0].contentBlocks[0].text;
            res.write(`data: ${JSON.stringify({ text: chunk[0].contentBlocks[0].text })}\n\n`);
        }

        return AIMessage
    }

    const [chat, AIMessage] = await Promise.all([generateTitle(), aiStream()])

    // Save messages if it's an existing chat
    if (chatId) {
        await chatDao.addMessagesToChat(chatId, [
            { role: "user", content },
            { role: "ai", content: AIMessage }
        ]);
    } else if (chat) {
        // For new chat, user message was already added in createChat. Just add AI message.
        await chatDao.addMessagesToChat(chat._id, [
            { role: "ai", content: AIMessage }
        ]);
    }

    // res.write(`data: [DONE]\n\n`);
    res.end()
}

export async function getChats(req, res) {
    try {
        const chats = await chatDao.getChatsByUser(req.user.id);
        res.status(200).json({ chats });
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ message: "Failed to fetch chats" });
    }
}

export async function getChat(req, res) {
    try {
        const { id } = req.params;
        const chat = await chatDao.getChatById(id, req.user.id);
        
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        
        res.status(200).json({ chat });
    } catch (error) {
        console.error("Error fetching chat:", error);
        res.status(500).json({ message: "Failed to fetch chat" });
    }
}

export async function deleteChat(req, res) {
    try {
        const { id } = req.params;
        const chat = await chatDao.softDeleteChat(id, req.user.id);
        
        if (!chat) {
            return res.status(404).json({ message: "Chat not found" });
        }
        
        res.status(200).json({ message: "Chat deleted success" });
    } catch (error) {
        console.error("Error deleting chat:", error);
        res.status(500).json({ message: "Failed to delete chat" });
    }
}
