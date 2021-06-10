import express, { Request, Response } from "express";

const blogRouter = express.Router();

blogRouter.get("/blog", (req: Request, res: Response) => {
  return res.send("all posts");
});

export default blogRouter;
