import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Loading } from "../common/loading";
import { PostType } from "../common/types";

const Home: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    axios
      .get("/blog")
      .then((res) => {
        setTimeout(() => {
          // setTimeout is used only to make the ui smooth on local machine 🙃
          setPosts(res.data);
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        console.log("fetch erro", err);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: string) => {
    axios
      .delete(`/blog/delete/${id}`)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="articles">
        {posts.map((post) => (
          <div className="article-sum" key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <div className="article-links">
              <Link to={`/blog/${post._id}`}>Read More</Link>
              &nbsp;-&nbsp;
              <Link to={`/blog/edit/${post._id}`}>Edit</Link>
              &nbsp;-&nbsp;
              <span
                className="delete-article"
                onClick={() => handleDelete(post._id)}
              >
                Delete
              </span>
            </div>
          </div>
        ))}
        <div className="new-button">
          <img
            src="/icons/plus-round.svg"
            alt="add new post"
            onClick={() => history.push("/new")}
          />
        </div>
      </div>
    );
  }
};
export default Home;
