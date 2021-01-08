import React, { useState, useEffect, useMemo } from "react";
import { Synth } from "tone";

import Keyboard from "./Keyboard";
import { keyToNote } from "./Constants";
import "./Authenticate.css";

import { Link } from "react-router-dom";

//

const Authenticate = (props) => {
  const { id, title, prompt } = props.location.state;

  const hue = useMemo(
    () => `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`,
    []
  );
  const synth = useMemo(() => new Synth().toDestination(), []);

  const [buffer, setBuffer] = useState([]);

  const writeToBuffer = (e) => {
    const newBuffer = buffer.slice();
    const note = keyToNote[e.key];
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
  }, []);

  return (
    <section className="authenticate">
      <div>{title}</div>
      <div className="instructions">
        Listen to the musical prompt left by the author, and perform the
        response on your QWERTY keyboard
      </div>
      <Keyboard hue={hue} synth={synth} />
      <div>
        <button onClick={clearBuffer}>Play Again</button>
        <button>Continue</button>
      </div>
      {/* <Link to="/ViewReply">
        <button>Take me to View / Reply</button>
      </Link> */}

      <Link
        to={{
          pathname: "/ViewReply",
          state: props.location.state,
        }}
      >
        <button>Take me to View / Reply</button>
      </Link>
    </section>
  );
};

export default Authenticate;
