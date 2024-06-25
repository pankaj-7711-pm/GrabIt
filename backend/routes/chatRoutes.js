import express from "express";
import { isSeller, requireSignIn } from "../helpers/authHelpers.js";
import { createChatController, getAllMessageController, sendMessageController } from "../controllers/chatController.js";


const router = express.Router();


// create chat
router.post("/create-chat/:sid", requireSignIn, createChatController);

//get all messages of a chat
router.get("/get-all-messages/:cid",requireSignIn, getAllMessageController);

//send message
router.post("/send-message", requireSignIn,sendMessageController);





export default router;
