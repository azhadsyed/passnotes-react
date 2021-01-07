import React, { useState, useEffect } from "react";
import Keyboard from "./Keyboard";
import { keyToNote } from "./Constants";
import "./Authenticate.css";

//

const Authenticate = (props) => {
  const [buffer, setBuffer] = useState([]);

  const hue = props.hue;
  const synth = props.synth;

  const writeToBuffer = (e) => {
    const newBuffer = buffer.slice();
    const note = keyToNote[e.key]; // code review: this is repeated code both here and in Keyboard
    newBuffer.push([Date.now(), note]);
    setBuffer(newBuffer);
  };

  const clearBuffer = () => {
    console.log(buffer);
    setBuffer([]);
  };

  useEffect(() => {
    //on component mount...
    document.addEventListener("keydown", writeToBuffer);

    //on unmount...
    return function cleanup() {
      document.removeEventListener("keydown", writeToBuffer);
    };
  });

  return (
    <section className="authenticate">
      <div>{props.title}</div>
      <div className="instructions">
        Listen to the musical prompt left by the author, and perform the
        response on your QWERTY keyboard
      </div>
      <Keyboard hue={hue} synth={synth} />
      <div>
        <button onClick={clearBuffer}>Play Again</button>
        <button>Continue</button>
      </div>
    </section>
  );
};

export default Authenticate;
