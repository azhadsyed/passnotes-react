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

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />,
    <Square
        value={"hi"}
      />
    );
  }



  render() {
    return (
      <div>
        <div className="board-row">
          {" "}
          {this.renderSquare(0)} {this.renderSquare(1)} {this.renderSquare(2)}{" "}
        </div>{" "}
        <div className="board-row">
          {" "}
          {this.renderSquare(3)} {this.renderSquare(4)} {this.renderSquare(5)}{" "}
        </div>{" "}
        <div className="board-row">
          {" "}
          {this.renderSquare(6)} {this.renderSquare(7)} {this.renderSquare(8)}{" "}
        </div>{" "}
        <div className="note-content">
          {" "}
          {"new element here"}
        </div>{" "}
      </div>
    );
  }
}

class Noteboard extends React.Component {
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice(); 
    // copy the array squares. this array determines values squares display.
    //basically, the array squares should get replaced with an array of note content
    squares[i] = this.state.xIsNext ? "hi" : "bye";
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }
// lets test a function here to return a simple squares array counting backwards from 11
testValues(){
  const valueArray = [11,10,9,8,7,6]
  return valueArray
}


sendHttpRequest(method, url, data) {
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

async getNotes() {
  let response = await this.sendHttpRequest("GET", "http://localhost:8080/noteboard")
  return response
}

async displayNotes() {
  const notes = await this.getNotes() // returns an array of note content
  return notes
}

//lets try rewriting square to render note
renderNote(i) {
  return (
    <Square
      value={this.displayNotes()}
      onClick={() => this.props.onClick(i)}
    />,
  <Square
      value={"hi"}
    />
  );
}


  //this shows default state
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
         squares: this.testValues(), //make this a function instead that's returned note content
          //squares: this.displayNotes(),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  render() {

    
    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}> {desc} </button>{" "}
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />{" "}
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

//talking to server

// function sendHttpRequest(method, url, data) {
//   return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest()
//       xhr.open(method, url)
//       xhr.responseType = 'json'
//       if (data) {
//           xhr.setRequestHeader('Content-Type', 'application/json')
//       }
//       xhr.onload = () => {
//           resolve(xhr.response)
//       }
//       xhr.send(JSON.stringify(data))
//   })
// }

// async function getNotes() {
//   let response = await sendHttpRequest("GET", "http://localhost:8080/noteboard")
//   return response
// }


// async function displayNotes() {
//   const notes = await getNotes() // returns an array of note content
// console.log(notes)
// }

// displayNotes();


// ========================================

// ReactDOM.render(<App/>, document.getElementById("root"));

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
