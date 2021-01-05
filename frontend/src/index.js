import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Create from "./components/Create";

class App extends React.Component {
  render() {
    return <Create />;
  }
}

// ========================================

ReactDOM.render(<App />, document.getElementById("root"));
