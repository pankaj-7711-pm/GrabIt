import chatModel from "../models/chatModel.js";
import messageModel from "../models/messageModel.js";

export const createChatController = async (req, res) => {
    try {
        const { sid } = req.params;
        let chat = await chatModel.findOne({ user: req.user._id, seller: sid });
        if (chat) {
            res.send({
                success: true,
                chat
            })
        }
        else {
            const newChat = new chatModel({
                user: req.user._id,
                seller:sid
            })
            await newChat.save();
            chat = await chatModel.findOne({ user: req.user._id, seller: sid });
            res.status(201).send({
                success: true,
                chat
            })
        }
    } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error in creating chat",
          error,
        });
    }
}


export const getAllMessageController = async (req, res) => {
    try {
        const { cid } = req.params;
        const messages = await messageModel.find({ chat:cid });
        res.status(201).send({
          success: true,
          messages,
        });
    } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error in fetching messages",
          error,
        });
    }
}

export const sendMessageController = async (req, res) => {
    try {
        const { message, cid, senderRole } = req.body;
        const newMessage = new messageModel({
            message: message,
            chat: cid,
            senderRole:senderRole,
            sender:req.user._id
        })
        await newMessage.save();
        res.status(201).send({
            success: true,
        })
    } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error in creating messages",
          error,
        });
    }
}

export const getAllChatController = async (req, res) => {
    try {
        const { sid } = req.params;
        const chats = await chatModel.find({ seller: sid }).populate("user");
        res.status(201).send({
            success: true,
            chats
        })
    } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error in fetching chats",
          error,
        });
    }
}

export const getSinleChatController = async (req, res) => {
    try {
        const { cid } = req.params;
        const chat = await chatModel.findOne({ _id: cid }).populate("user");
        res.status(201).send({
          success: true,
          chat,
        });
    } catch (error) {
        res.status(500).send({
          success: false,
          message: "Error in fetching chats",
          error,
        });
    }
}