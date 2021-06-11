import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const NewPost: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setLoading(true);
    const title = event.target.title.value;
    const description = event.target.description.value;
    const values = { title, description };
    axios
      .post("/blog/new", values)
      .then(() => {
        setLoading(false);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <div className="new-article">
      <h3>Add a New Blog Post</h3>
      <form onSubmit={handleSubmit} autoComplete="off">
        <fieldset>
          <legend>Please fill out the form</legend>
          <div className="article-form">
            <label htmlFor="title">Title</label>
            <input id="title" name="title" type="text" />
            <label htmlFor="description">Description</label>
            <textarea name="description" id="description" cols={30} rows={10} />
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
