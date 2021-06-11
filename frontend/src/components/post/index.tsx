import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../common/loading";
import { PostType } from "../common/types";

export const SinglePost: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<PostType | null>(null);

  const { id }: { id: string } = useParams();

  useEffect(() => {
    axios
      .get(`/blog/${id}`)
      .then((res) => {
        // setTimeout is used only to make the ui smooth on local machine 🙃
        setTimeout(() => {
          setPost(res.data);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log("fetch erro", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        {post && (
          <>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </>
        )}
      </div>
    );
  }
};
