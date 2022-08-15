import { Room, Chat } from "../db";
import { v4 as uuidv4 } from "uuid";

class chatService {
  static async createRoom({ users }) {
    const room = await Room.findByUsers({ users });

    if (room) {
      return room;
    }
    const id = uuidv4();
    const newRoom = { id, users };
    const createdNewRoom = await Room.create(newRoom);

    return createdNewRoom;
  }

  static async createChat({ id, chat, userId }) {
    const room = await Room.findById({ id });
    const newChat = {
      roomId: room.id,
      user: userId,
      chat,
    };
    const createdNewChat = await Chat.create({ newChat });
    return createdNewChat;
  }
}

export { chatService };
