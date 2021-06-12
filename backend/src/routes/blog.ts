import express, { Request, Response } from "express";
import { PostType } from "../common/types";
import { Post } from "../models/post";

const blogRouter = express.Router();

blogRouter.get("/blog", async (req: Request, res: Response) => {
  await Post.find()
    .then((posts) => res.status(200).send(posts))
    .catch((err) => res.status(400).send(err));
});

blogRouter.post("/blog/new", async (req: Request, res: Response) => {
  const post: PostType = new Post(req.body);
  await post
    .save()
    .then((newPost) => {
      res.status(200).send(newPost);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

blogRouter.get("/blog/:id", async (req: Request, res: Response) => {
  const ID = req.params.id;
  await Post.findById(ID)
    .then((post) => {
      res.status(200).send(post);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

blogRouter.put("/blog/edit/:id", async (req: Request, res: Response) => {
  const ID = req.params.id;
  await Post.updateOne({ _id: ID }, req.body)
    .then(() => res.status(200).send("Post udpated successfully"))
    .catch((err) => res.status(400).send(err));
});

blogRouter.delete("/blog/delete/:id", async (req: Request, res: Response) => {
  const ID = req.params.id;
  await Post.findByIdAndDelete(ID)
    .then(() => res.status(200).send("Deleted Successfully"))
    .catch((err) => res.status(400).send(err));
});

export default blogRouter;
