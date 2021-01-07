import React from "react";
import ReactDOM from "react-dom";
import { Synth } from "tone";
import "./index.css";

import Create from "./components/Create";
import Authenticate from "./components/Authenticate";

//router boiler plate
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Noteboard = (props) => {
    const notes = props.noteTitles.map(x => {
      return (
      <Link to = "/Authenticate">
      <button className = "note"> {x} </button>
      </Link>
    )
    }) 
    return (
      <div>
<Link to = "/Create">
  <button className = "plusNewNote">New Note</button>
</Link>
          {notes}
      </div>
    );
  }

class App extends React.Component {
constructor(props){
  super(props);
  this.state = {
    noteTitles: [],
    noteClicked: {}
  }
}

async componentDidMount() {
  const noteContent = await getNotes();
  this.setState({noteTitles: noteContent.map(x => x["title"])})
}   

  render(){
    console.log(this.state.noteTitles)
    const hue = `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`;
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
            <Noteboard noteTitles = {this.state.noteTitles}/>
          </Route>
        </Switch>
      </Router>
    );
  }}

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
