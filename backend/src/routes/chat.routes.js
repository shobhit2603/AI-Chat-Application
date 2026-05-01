import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { handleMessage, getChats, getChat, deleteChat } from "../controllers/chat.controller.js";

const chatRouter = Router();

/**
 * @routes GET /api/chat
 * @description Fetches all chats for the authenticated user
 */
chatRouter.get("/", authMiddleware, getChats);

/**
 * @routes GET /api/chat/:id
 * @description Fetches a specific chat with messages
 */
chatRouter.get("/:id", authMiddleware, getChat);

/**
 * @routes DELETE /api/chat/:id
 * @description Deletes a chat
 */
chatRouter.delete("/:id", authMiddleware, deleteChat);

/**
 * @routes POST /api/chat
 * @argument req.body = {content:string,chatId:string?}
 */
chatRouter.post("/", authMiddleware, handleMessage);

export default chatRouter;