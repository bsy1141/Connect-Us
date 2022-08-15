import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { chatService } from "../services/chatService";
const chatRouter = Router();

chatRouter.post("/room", login_required, async function (req, res, next) {
  try {
    const users = req.body.users;
    const newRoom = await chatService.createRoom({ users });

    res.status(200).send(newRoom);
  } catch (err) {
    next(err);
  }
});

chatRouter.post("/room/:id/chat", async (req, res, next) => {
  try {
    const id = req.params.id;
    const chat = req.body.chat;
    const userId = req.body.userId;

    const createdChat = await chatService.createChat({ id, chat, userId });
    req.app.get("io").of("/chat").to(req.params.id).emit("chat", createdChat);
    res.send("ok");
  } catch (err) {
    next(err);
  }
});

export { chatRouter };
