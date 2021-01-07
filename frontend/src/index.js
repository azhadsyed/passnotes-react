import React from "react";
import Create from "./components/Create";
import ReactDOM from "react-dom";
import "./index.css";

//router boiler plate 
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Noteboard extends React.Component {
    //this shows default state
    constructor(props) {
      super(props);
      this.state = {
          squares: [] 
      };
    }

  async componentDidMount() {
      const noteContent = await getNotes();
      this.setState({squares: noteContent.map(x => x["title"])})
    }    

  handleClick(i) {
    const squares = this.squares.slice(); 
    squares[i] = "hi";
    this.setState({squares: squares})
  }

  render() {
    const notes = this.state.squares.map(x => {
      return <div className = "note">
        {x}
      </div>
    }) 

    return (
      <div className="game">
        <div className="game-board">
          {notes}
        </div>{" "}
      </div>
      
    );
  }
}

export default function App(){
  return (
<Router>
<li><Link to="/Create">Create</Link>
</li>
<li><Link to="/">Noteboard</Link></li>
<Switch>
          <Route path="/Create">
            <Create />
          </Route>
          <Route path="/">
            <Noteboard />
          </Route>
        </Switch>
</Router>

  )
}

function sendHttpRequest(method, url, data) {
  return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)
      xhr.responseType = 'json'
      if (data) {
          xhr.setRequestHeader('Content-Type', 'application/json')
      }
      xhr.onload = () => {
          resolve(xhr.response)
      }
      xhr.send(JSON.stringify(data))
  })
}

async function getNotes() {
  let response = await sendHttpRequest("GET", "http://localhost:8080/noteboard")
  return response
} 

// ========================================

// ReactDOM.render(<App/>, document.getElementById("root"));

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
