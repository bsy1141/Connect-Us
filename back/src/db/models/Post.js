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

  static findOne = async ({ getPost }) => {
    const post = await PostModel.findOne({
      id: getPost.id,
    });
    return post;
  };
}

export { Post };
