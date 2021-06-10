import express, { Request, Response } from "express";
import { PostType } from "../common/types";
import { Post } from "../models/post";

const blogRouter = express.Router();

blogRouter.get("/blog", async (req: Request, res: Response) => {
  const post: PostType = new Post({
    title: "hello world",
    description: "lorem  sdf ww er vwer wer",
  });
  await post.save();
  return res.send("all posts");
});

export default blogRouter;
