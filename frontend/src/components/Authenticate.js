import React from "react";
import Keyboard from "./Keyboard";
import "./Authenticate.css";

const Authenticate = (props) => {
  return (
    <section className="authenticate">
      <div>{props.title}</div>
      <div>
        Listen to the musical prompt left by the author, and perform the
        response on your QWERTY keyboard
      </div>
      <Keyboard />
      <button>Play Again</button>
      <button>Continue</button>
    </section>
  );
};

export default Authenticate;
