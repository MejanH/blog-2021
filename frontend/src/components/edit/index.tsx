import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Loading } from "../common/loading";
import { PostType } from "../common/types";

export const EditPost: React.FC = () => {
  const history = useHistory();
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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    const title = event.target.title.value;
    const description = event.target.description.value;
    const values = { title, description };

    axios
      .put(`/blog/edit/${id}`, values)
      .then(() => {
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="new-article">
        {post && (
          <>
            <h3>Edit Blog Post</h3>
            <form onSubmit={handleSubmit} autoComplete="off">
              <fieldset>
                <legend>Please fill out the form</legend>
                <div className="article-form">
                  <label htmlFor="title">Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={post.title}
                  />
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    id="description"
                    cols={30}
                    rows={10}
                    defaultValue={post.description}
                  />
                  <button type="submit" disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </fieldset>
            </form>
          </>
        )}
      </div>
    );
  }
};
