import React from "react";
import ReactDOM from "react-dom";
import { Synth } from "tone";

import Create from "./components/Create";
import ViewReply from "./components/ViewReply";
// import Example from "./components/ViewReply";
import Authenticate from "./components/Authenticate";
import { getNotes } from "./components/Methods";
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
    const path = "/Authenticate";

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
    const synth = new Synth().toDestination(); // why can't we set variables in useEffect?

    return (
      <Router>
        <li>
          <Link to="/Create">Create</Link>
        </li>
        <li>
          <Link to="/Authenticate">Authenticate</Link>
        </li>
        <li>
          <Link to="/ViewReply">ViewReply</Link>
        </li>
        <li>
          <Link to="/">Noteboard</Link>
        </li>
        <p></p>
        <Switch>
          <Route component={Authenticate} path="/Authenticate" />
          <Route component={Create} path="/Create" />
          <Route component={ViewReply} path="/ViewReply" />
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

ReactDOM.render(<App />, document.getElementById("root"));
