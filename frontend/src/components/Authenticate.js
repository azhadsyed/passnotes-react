import React, { useState, useEffect } from "react";
import { Synth } from "tone";

import Keyboard from "./Keyboard";
import { keyToNote } from "./Constants";
import "./Authenticate.css";

//

const Authenticate = (props) => {
  console.log(props.location.state); // router unpacking here needs to be solved
  const [buffer, setBuffer] = useState([]);

  const hue = `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`;
  const synth = new Synth().toDestination();

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
