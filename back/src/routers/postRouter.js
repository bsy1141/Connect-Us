import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { postService } from "../services/postService";

const postRouter = Router();

postRouter.get("/postlist", login_required, async (req, res, next) => {
  try {
    const postlist = await postService.getPosts();

    if (postlist.errorMessage) {
      throw new Error(postlist.errorMessage);
    }
    res.status(200).send(postlist);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/postlist/:userId", login_required, async (req, res, next) => {
  try {
    if (is.emptyObject(req.query)) {
      throw new Error("페이지네이션을 위한 쿼리를 확인해주세요.");
    }

    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 3;

    const getPosts = {
      userId: req.params.userId,
      page: page,
      perPage: perPage,
    };

    const post = await postService.getPostsByUserId({ getPosts });

    if (post.errorMessage) {
      throw new Error(post.errorMessage);
    }

    res.status(200).send(post);
  } catch (error) {
    next(error);
  }
});

postRouter.get("/post/:postId", login_required, async (req, res, next) => {
  try {
    const postId = req.params.postId;

    const post = await postService.getPostById({ id: postId });

    if (post.errorMessage) {
      throw new Error(post.errorMessage);
    }

    res.status(200).send(post);
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

postRouter.delete(
  "/post/:postId",
  login_required,
  async function (req, res, next) {
    try {
      const id = req.params.postId;

      // 해당 리뷰 아이디로 리뷰 정보를 db에서 찾아 삭제함.
      const result = await postService.deletePost({ id });

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { postRouter };
