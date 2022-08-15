import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { socketIOMiddleware } from "../middlewares/socketIOMiddleware";

const chatRouter = Router();

chatRouter.get(
  "/room/:id",
  login_required,
  socketIOMiddleware,
  async function (req, res, next) {
    try {
      const io = req.io;
      //const currentRoom=io.adapter.rooms.get(req.params.id);
    } catch (err) {
      next(err);
    }
  }
);
