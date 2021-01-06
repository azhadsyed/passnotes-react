import React from "react";
import Keyboard from "./Keyboard";
import "./Authenticate.css";

const Authenticate = (props) => {
  const hue = `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`;

  return (
    <section className="authenticate">
      <div>{props.title}</div>
      <div className="instructions">
        Listen to the musical prompt left by the author, and perform the
        response on your QWERTY keyboard
      </div>
      <Keyboard hue={hue} />
      <div>
        <button>Play Again</button>
        <button>Continue</button>
      </div>
    </section>
  );
};

export default Authenticate;
