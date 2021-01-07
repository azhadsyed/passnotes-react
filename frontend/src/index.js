import React from "react";
import ReactDOM from "react-dom";
import { Synth } from "tone";
import "./index.css";

import Create from "./components/Create";
import Authenticate from "./components/Authenticate";

//router boiler plate
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

class Noteboard extends React.Component {
  //this shows default state
  constructor(props) {
    super(props);
    this.state = {
      squares: [],
    };
  }

  async componentDidMount() {
    const noteContent = await getNotes();
    this.setState({ squares: noteContent.map((x) => x["title"]) });
  }

  handleClick(i) {
    const squares = this.squares.slice();
    squares[i] = "hi";
    this.setState({ squares: squares });
  }

  render() {
    // eventually this won't be a bullet point
    const notes = this.state.squares.map((x) => {
      return (
        <div className="note" onClick={console.log("fettucine")}>
          <li>
            <Link to="/Authenticate">Authenticate</Link>
          </li>
          {x}
        </div>
      );
    });
    return (
      <div className="game">
        <div className="game-board">{notes}</div>{" "}
      </div>
    );
  }
}

export default function App() {
  const hue = `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`;
  // code review: how do I change this each time I land on Authenticate?
  // Does each visitation "mount" and "unmount" the component?
  const synth = new Synth().toDestination();

  return (
    <Router>
      <li>
        <Link to="/Create">Create</Link>
      </li>
      <li>
        <Link to="/Authenticate">Authenticate</Link>
      </li>
      <li>
        <Link to="/">Noteboard</Link>
      </li>
      <p></p>
      <Switch>
        <Route path="/Authenticate">
          <Authenticate
            title="Twinkle Twinkle Little Star"
            hue={hue}
            synth={synth}
          />
        </Route>
        <Route path="/Create">
          <Create />
        </Route>
        <Route path="/">
          <Noteboard />
        </Route>
      </Switch>
    </Router>
  );
}

function sendHttpRequest(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = "json";
    if (data) {
      xhr.setRequestHeader("Content-Type", "application/json");
    }
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.send(JSON.stringify(data));
  });
}

async function getNotes() {
  let response = await sendHttpRequest(
    "GET",
    "http://localhost:8080/noteboard"
  );
  return response;
}

// ========================================

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
