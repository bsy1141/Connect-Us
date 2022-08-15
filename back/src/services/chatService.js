import { Room, Chat } from "../db";
import { v4 as uuidv4 } from "uuid";

class chatService {
  static async createRoom({ users }) {
    const room = await Room.findByUsers({ users });

    if (room) {
      const error = new Error("채팅방이 이미 존재합니다.");
      error.statusCode = 400;
      throw error;
    }
    const id = uuidv4();
    const newRoom = { id, users };
    const createdNewRoom = await Room.create(newRoom);

    return createdNewRoom;
  }
}

export { chatService };
