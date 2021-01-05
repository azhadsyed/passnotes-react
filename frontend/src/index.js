import React from "react";
import Create from "./components/Create";
import ReactDOM from "react-dom";
import "./index.css";

//router boiler plate ?
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

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
      </div>
    );
  }
}

class Noteboard extends React.Component {
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    squares[i] = this.state.xIsNext ? "X" : "O";
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

  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
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

    let status = "like my status";

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />{" "}
        </div>{" "}
        <div className="game-info">
          <div> {status} </div> <ol> {moves} </ol>{" "}
        </div>{" "}
      </div>
    );
  }
}

export default function App() {
  return (
    <Router>
      {/* <div>
  <Noteboard/>
</div> */}
      <li>
        <Link to="/Create">Create</Link>
      </li>
      <li>
        <Link to="/">Noteboard</Link>
      </li>
      <Switch>
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

// ========================================

// ReactDOM.render(<App/>, document.getElementById("root"));

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
