import { CommentModel } from "../schemas/comment";

class Comment {
  static create = async ({ newComment }) => {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  };

  static findById = async ({ id }) => {
    const CommentInfo = await CommentModel.findOne({ _id: id }).lean();
    return CommentInfo;
  };
}

export { Comment };
