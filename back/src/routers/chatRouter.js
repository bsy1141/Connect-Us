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

export { chatRouter };
