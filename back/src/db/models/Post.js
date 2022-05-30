import { PostModel } from "../schemas/post";

class Post {
  static create = async ({ newPost }) => {
    const checkAlreadyExist = await PostModel.findOne({
      post: newPost.post,
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

  static findOne = async ({ getPost }) => {
    const post = await PostModel.findOne({
      id: getPost.id,
    });
    return post;
  };
}

export { Post };
