import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use(blogRouter);

mongoose.connect("mongodb://localhost/personal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Mongodb connected");
});

app.listen(5000, () => {
  console.log("Server is running at http://localhost:5000");
});

export default app;
