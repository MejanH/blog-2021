import { Document } from "mongoose";
export interface PostType extends Document {
  title: string;
  description: string;
}
export interface BlogPost {
  _id: string;
  title: string;
  description: string;
}
