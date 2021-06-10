import mongoose, { Schema, model, Model } from "mongoose";
import { PostType } from "../common/types";

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

export const Post: Model<PostType> = model("Post", postSchema);
