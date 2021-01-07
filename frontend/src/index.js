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

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {" "}
      {props.value}{" "}
    </button>
  );
}

class Noteboard extends React.Component {
    //this shows default state
    constructor(props) {
      super(props);
      this.state = {
        // history: [
          squares: [] //make this a function instead that's returned note content
        // ],
      };
    }

  async componentDidMount() {
      console.log("component did mount");
      const noteContent = await getNotes();
      for (let i = 0; i<noteContent.length; i++)
      {
      console.log("notecontent i title:", noteContent[i]["title"])
      console.log("notecontent i title is type", typeof(noteContent[i]["title"]))}
      //this.setState({squares: noteContent})
      this.setState({squares: [1,3,5,7]})
      this.setState({squares: noteContent.map(x => x["title"])})
    }    

  handleClick(i) {
    // const history = this.state.history.slice(0, this.state.stepNumber + 1);
    // const current = history[history.length - 1];
    const squares = this.squares.slice(); 
    // copy the array squares. this array determines values squares display.
    //basically, the array squares should get replaced with an array of note content
    squares[i] = "hi";
    this.setState({squares: squares})
  }

  // jumpTo(step) {
  //   this.setState({
  //     stepNumber: step,
  //     xIsNext: step % 2 === 0,
  //   });
  // }

// lets test a function here to return a simple squares array counting backwards from 11
testValues(){
  const valueArray = [11,10,9,8,7,6]
  return valueArray
}

  render() {
  console.log(this.state.squares)
    const notes = this.state.squares.map(x => {
      return <div>
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
{/* <div>
  <Noteboard/>
</div> */}
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
