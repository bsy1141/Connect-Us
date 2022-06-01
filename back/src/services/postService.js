import { Post, User } from "../db";
import { v4 as uuidv4 } from "uuid";

class postService {
  static addPost = async ({ newPost }) => {
    const id = uuidv4();
    newPost.id = id;

    const user = await User.findById({ user_id: newPost.userId });
    newPost.userName = user.name;

    const createNewPostResult = await Post.create({ newPost });
    createNewPostResult.errorMessage = null;

    return createNewPostResult;
  };

  static getPosts = async () => {
    const getPostsResult = await Post.findAll();

    if (!getPostsResult) {
      const errorMessage = "포스트들을 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getPostsResult;
  };

  static getPostsByUserId = async ({ getPosts }) => {
    const getPostsResult = await Post.findAllToUser({ getPosts });

    if (!getPostsResult) {
      const errorMessage = "해당 유저의 포스트들을 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getPostsResult;
  };

  static getPost = async ({ getPost }) => {
    const getPostResult = await Post.findOne({ getPost });

    if (!getPostResult) {
      const errorMessage = "특정 포스트를 불러오는 데 실패했습니다.";
      return { errorMessage };
    }

    return getPostResult;
  };
}

export { postService };
