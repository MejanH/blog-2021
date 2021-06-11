import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.scss";
import { EditPost } from "./components/edit";
import Home from "./components/home";
import { NewPost } from "./components/new";
import { SinglePost } from "./components/post";

function App() {
  const history = useHistory();
  return (
    <div className="App">
      <header onClick={() => history.push("/")}>
        <h1>Crud.</h1>
      </header>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/new">
            <NewPost />
          </Route>
          <Route exact path="/blog/:id">
            <SinglePost />
          </Route>
          <Route exact path="/blog/edit/:id">
            <EditPost />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
