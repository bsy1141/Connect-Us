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
    const total = await PostModel.countDocuments({
      userId: getPosts.userId,
    });

    const limit = getPosts.perPage;
    const offset = (getPosts.page - 1) * limit;

    const posts = await PostModel.find({
      userId: getPosts.userId,
    })
      .limit(limit)
      .skip(offset);

    const newPosts = {
      total: total,
      posts: posts,
    };

    return newPosts;
  };

  static findOne = async ({ getPost }) => {
    const post = await PostModel.findOne({
      id: getPost.id,
    });
    return post;
  };
}

export { Post };
