import React from "react";
import ReactDOM from "react-dom";

import Create from "./components/Create";
<<<<<<< HEAD
import View from "./components/View";
=======
import ViewReply from "./components/ViewReply";
>>>>>>> 377706d1364379bb851a3338d986292dc4a1a2ab
import Authenticate from "./components/Authenticate";
import { getNotes } from "./components/helpers";
import "./index.css";

//router boiler plate
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Note = (props) => {
  const { id, prompt, title } = props;
  const state = {
    id,
    title,
    prompt,
  };

  return (
    <Link
      to={{
        pathname: "/Authenticate",
        state,
      }}
    >
      <button className="note">{title}</button>
    </Link>
  );
};

const Noteboard = (props) => {
  const notes = props.noteObjects.map((note) => {
    const { _id, title, prompt } = note;

    return <Note key={_id} id={_id} title={title} prompt={prompt} />;
  });

  return (
    <div>
      <Link to="/Create">
        <button className="plusNewNote">New Note</button>
      </Link>
      {notes}
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteTitles: [],
      noteObjects: [],
      noteClicked: {},
    };
  }

  async componentDidMount() {
    const noteContent = await getNotes();
    this.setState({
      noteTitles: noteContent.map((x) => x["title"]),
      noteObjects: noteContent,
    });
  }

  render() {
    return (
      <Router>
        <li>
          <Link to="/Create">Create</Link>
        </li>
        <li>
          <Link to="/Authenticate">Authenticate</Link>
        </li>
        <li>
          <Link to="/View">View</Link>
        </li>
        <li>
          <Link to="/">Noteboard</Link>
        </li>
        <p></p>
        <Switch>
          <Route component={Authenticate} path="/Authenticate" />
          <Route component={Create} path="/Create" />
          <Route component={View} path="/View" />
          <Route path="/">
            <Noteboard
              noteTitles={this.state.noteTitles}
              noteObjects={this.state.noteObjects}
            />
          </Route>
        </Switch>
      </Router>
    );
  }
}

// ========================================

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
