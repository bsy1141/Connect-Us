import { PostModel } from "../schemas/post";

class Post {
  static create = async ({ newPost }) => {
    const checkAlreadyExist = await PostModel.findOne({
      id: newPost.id,
    });
    if (checkAlreadyExist) {
      return checkAlreadyExist;
    }

    const createdNewPost = await PostModel.create(newPost);
    return createdNewPost;
  };

  static findAll = async () => {
    const posts = await PostModel.find({});
    return posts;
  };

  static findAllToUser = async ({ getPosts }) => {
    const { userId, page, perPage } = getPosts;
    const totalDocuments = await PostModel.countDocuments({ userId });
    const total = Math.ceil(totalDocuments / perPage);
    const posts = await PostModel.find({ userId })
      .sort({ createdAt: 1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return { total, posts };
  };

  static findById = async ({ id }) => {
    const post = await PostModel.findOne({ id }).populate("comments").lean();
    return post;
  };

  static delete = async ({ id }) => {
    const result = await PostModel.deleteOne({ id });
    const isDataDeleted = result.deletedCount === 1;
    return isDataDeleted;
  };

  static addComment = async ({ id, commentId }) => {
    const filter = { id };
    const update = { $push: { comments: commentId } };
    const option = { returnOriginal: false };

    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedPost;
  };

  static deleteComment = async ({ id, commentId }) => {
    const filter = { id };
    const update = { $pull: { comments: commentId } };
    const option = { returnOriginal: false };

    const updatedReview = await PostModel.findOneAndUpdate(
      filter,
      update,
      option
    );

    return updatedReview;
  };
}

export { Post };
