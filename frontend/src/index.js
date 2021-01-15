import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import Create from "./components/Create";
import Noteboard from "./components/Noteboard.js";
import ViewReply from "./components/ViewReply.js";
import { sendHttpRequest } from "./components/utilities/helpers.js";
import "./index.css";
import { ReactComponent as Logo } from "./img/logo.svg";

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="navBar">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <p></p>
        <Switch>
          <Route component={Authenticate} path="/Authenticate" />
          <Route component={Create} path="/Create" />
          <Route component={ViewReply} path="/ViewReply" />
          <Route component={Noteboard} path="/"></Route>
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
