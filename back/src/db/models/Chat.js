import { ChatModel } from "../schemas/chat";

class Chat {
  static async create({ newChat }) {
    const createdNewChat = await ChatModel.create(newChat);
    return createdNewChat;
  }

  static async findyByRoomId({ roomId }) {
    const chats = await ChatModel.find({ roomId })
      .sort({ createdAt: 1 })
      .populate("user")
      .lean();
    return chats;
  }
}

export { Chat };
