import { Room, Chat } from "../db";
import { v4 as uuidv4 } from "uuid";

class chatService {
  static async createRoom({ users }) {
    const room = await Room.findByUsers({ users });
    console.log(room);
    if (room) {
      return room;
    }
    const id = uuidv4();
    const newRoom = { id, users };
    const createdNewRoom = await Room.create(newRoom);

    return createdNewRoom;
  }
}

export { chatService };
