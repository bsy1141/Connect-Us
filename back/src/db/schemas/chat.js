import { Schema, model } from "mongoose";

const ChatSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    chat: String,
    gif: String,
  },
  {
    timestamps: true,
  }
);

const ChatModel = model("Chat", ChatSchema);

export { ChatModel };
