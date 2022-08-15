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

  static async getChatList({ roomId }) {
    const room = await Room.findById({ id: roomId });
    if (!room) {
      const errorMessage =
        "해당 id를 가진 학력 채팅방은 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    const chats = await Chat.findyByRoomId({ roomId });
    return chats;
  }
}

export { chatService };
