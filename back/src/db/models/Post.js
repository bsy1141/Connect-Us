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
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    return posts;
  };

  static findAllToUser = async ({ getPosts }) => {
    const { userId, page, perPage } = getPosts;
    const totalDocuments = await PostModel.countDocuments({ userId });
    const total = Math.ceil(totalDocuments / perPage);
    const posts = await PostModel.find({ userId })
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage);
    return { total, posts };
  };

  static findById = async ({ id }) => {
    const post = await PostModel.findOne({ id }).populate("comments").lean();
    return post;
  };

  static findByFollowingUserId = async ({ followingUserId }) => {
    const posts = await PostModel.find({
      userId: { $in: followingUserId },
    }).sort({ createdAt: -1 });

    return posts;
  };

  static update = async ({ id, toUpdate }) => {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      toUpdate,
      option
    );

    return updatedPost;
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

  static addLike = async ({ id, toUpdate }) => {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      {
        $push: {
          likes: toUpdate,
        },
      },
      option
    );
    return updatedPost;
  };

  static deleteLike = async ({ id, toUpdate }) => {
    const filter = { id };
    const option = { returnOriginal: false };
    const updatedPost = await PostModel.findOneAndUpdate(
      filter,
      {
        $pull: {
          likes: toUpdate,
        },
      },
      option
    );
    return updatedPost;
  };
}

export { Post };
