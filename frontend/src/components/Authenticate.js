import React, { useState, useEffect, useMemo, useRef } from "react";
import { Synth } from "tone";

import Keyboard from "./Keyboard";
import { keyToNote } from "./Constants";
import { verifyPassword, play, processPerformance } from "./helpers";
import "./Authenticate.css";

import { Link } from "react-router-dom";

//

const Authenticate = (props) => {
  const hue = useMemo(
    () => `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`,
    []
  );
  const synth = useMemo(() => new Synth().toDestination(), []);

  const { id, title, prompt } = props.location.state; // bug - on navigating directly to "/Authenticate", this is undefined. Handle with rerouting?

  const buffer = useRef([]);

  const writeToBuffer = (e) => {
    const note = keyToNote[e.key];
    if (note) {
      buffer.current.push([Date.now(), note]);
    }
  };

  const clearBuffer = () => {
    play(prompt, synth);
    buffer.current.length = 0;
  };

  const _verifyPassword = async () => {
    const processedBuffer = processPerformance(buffer.current);
    const response = await verifyPassword(id, processedBuffer);
    console.log(response);
    buffer.current.length = 0;
  };
  useEffect(() => {
    //on component mount...
    play(prompt, synth);
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
        <button onClick={_verifyPassword}>Continue</button>
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
