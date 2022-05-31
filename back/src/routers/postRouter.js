import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { postService } from "../services/postService";

const postRouter = Router();

postRouter.get("/postlist", login_required, async (req, res, next) => {
  try {
    const postlist = await postService.getPosts();

    if (postlist.errorMessage) {
      throw new Error(post.errorMessage);
    }
    res.status(200).send(postlist);
  } catch (error) {
    next(error);
  }
});

postRouter.post("/post/create", login_required, async (req, res, next) => {
  try {
    if (
      is.emptyObject(req.body) ||
      !req.body.userId ||
      !req.body.title ||
      !req.body.content ||
      !req.body.description
    ) {
      throw new Error(
        "데이터 생성에 필요한 정보가 없습니다. Body안의 데이터를 확인해주세요."
      );
    }
    const newPost = {
      userId: req.body.userId,
      title: req.body.title,
      content: req.body.content,
      description: req.body.description,
    };

    const post = await postService.addPost({ newPost });

    if (post.errorMessage) {
      throw new Error(post.errorMessage);
    }

    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
});

export { postRouter };
