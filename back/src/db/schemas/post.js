import { Schema, model } from "mongoose";

const LikeSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
});

const PostSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    likes: [LikeSchema],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const PostModel = model("Post", PostSchema);

export { PostModel };
