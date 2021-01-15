import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import Create from "./components/Create";
import Noteboard from "./components/Noteboard.js";
import ViewReply from "./components/ViewReply.js";
import { sendHttpRequest } from "./components/utilities/helpers.js";
import "./index.css";

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
    const getNotes = async () => {
      let response = await sendHttpRequest(
        "GET",
        "http://localhost:8080/noteboard"
      );
      return response;
    };

    const noteContent = await getNotes();
    this.setState({
      noteTitles: noteContent.map((x) => x["title"]),
      noteObjects: noteContent,
    });
  }

  render() {
    return (
      <Router>
        <Link to="/">
          <button className="passnotesHome">Passnotes</button>
        </Link>
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

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
