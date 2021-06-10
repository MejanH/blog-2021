import { Document } from "mongoose";
export interface PostType extends Document {
  title: string;
  description: string;
}
