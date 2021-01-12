import React, { useState, useEffect, useMemo, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Synth } from "tone";

import Keyboard from "./Keyboard";
import { keyToNote } from "./constants";
import { verifyPassword, play, processPerformance } from "./helpers";
import "./Authenticate.css";

const Authenticate = (props) => {
  let history = useHistory();

  const hue = useMemo(
    () => `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`,
    []
  );
  const synth = useMemo(() => new Synth().toDestination(), []);

  const { id, title, prompt } = props.location.state; // bug - on navigating directly to "/Authenticate", this is undefined. Handle conditionally or with rerouting?

  const buffer = useRef([]);

  const [errorMessage, setErrorMessage] = useState("");

  // code review: this exact code needs to exist in Authenticate.js and Create.js. How do I deduplicate??
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

  const validateAttempt = async () => {
    const processedBuffer = processPerformance(buffer.current);
    const response = await verifyPassword(id, processedBuffer);
    buffer.current.length = 0;
    if (response.content) {
      history.push("/View", { id, title, content: response.content });
      setErrorMessage("correct password!");
    } else {
      setErrorMessage("incorrect password, try again.");
    }
  };
  useEffect(() => {
    //on component mount...
    play(prompt, synth);
    document.addEventListener("keydown", writeToBuffer);

    //on unmount...
    return function cleanup() {
      document.removeEventListener("keydown", writeToBuffer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <button onClick={validateAttempt}>Continue</button>
        <div>{errorMessage}</div>
      </div>
    </section>
  );
};

export default Authenticate;

// ghost player to play the prompt (different color than the user)
