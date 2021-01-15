import React, { useState, useMemo, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Synth } from "tone";

import Keyboard from "./Keyboard";
import { keyToNote } from "./constants.js";
import {
  play,
  processPerformance,
  sendHttpRequest,
} from "./utilities/helpers.js";
import "./Create.css";

const TransportButton = (props) => {
  const visibility = props.enabled ? "visible" : "hidden";
  const innerShape = {
    record: <circle cx="24" cy="24" r="12" fill="#FF0000" />,
    stop: <rect x="12" y="12" width="24" height="24" fill="#E1FC74" />,
    play: (
      <path
        d="M42.928 24.6438L15.2131 40.3672L15.4952 8.52814L42.928 24.6438Z"
        fill="#03FF0D"
      />
    ),
  };

  return (
    <svg
      onClick={props.onClick}
      style={{ visibility: visibility }}
      width="50"
      height="50"
    >
      <circle cx="24" cy="24" r="24" fill="#0A0A0A" />
      {innerShape[props.type]}
    </svg>
  );
};

const NavigationButton = (props) => {
  return (
    <button disabled={!props.enabled} onClick={props.onClick}>
      {props.label}
    </button>
  );
};

const Create = (props) => {
  const instructions = [
    {
      instructions: "Perform your musical prompt",
      tip:
        "Use the keyboard to practice. Press record when you're ready. When you're done, press stop",
    },
    {
      instructions: "Perform your musical response",
      tip:
        "Press record again to save a response to your prompt. Press stop when you're done",
    },
    {
      instructions: "Confirm your musical response",
      tip: "",
    },
    {
      instructions: "Leave a message!",
      tip:
        "your message will be accessible only by those who know your musical password",
    },
  ];

  let history = useHistory();

  const hue = useMemo(
    () => `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`,
    []
  );
  const synth = useMemo(() => new Synth().toDestination(), []);

  // maintaining the "recording" state requires a "double hook" so that the
  // native event listeners can access the current state. see:
  // https://codesandbox.io/s/event-handler-use-ref-4hvxt?from-embed
  const [recording, _setRecording] = useState(false);
  const recordingRef = useRef(recording);
  const setRecording = (bool) => {
    recordingRef.current = bool;
    _setRecording(bool);
  };

  const [currentStep, setCurrentStep] = useState(0);
  const [playEnabled, setPlayEnabled] = useState(false);
  const [promptArray, setPromptArray] = useState([]);
  const [passwordArray, setPasswordArray] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const buffer = useRef([]);

  // button onClick functions
  const clickRecord = () => {
    setRecording(true);
    buffer.current.length = 0;
  };

  const clickStop = () => {
    setPlayEnabled(true);
    setRecording(false);
    buffer.current = processPerformance(buffer.current);
  };

  const clickPlay = () => {
    play(buffer.current, synth);
  };

  const clickPrevious = () => {
    if (currentStep === 0) {
      history.push("/");
    } else if (currentStep === 3) {
      setTitle("");
      setContent("");
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const compareNotes = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i][1] !== b[i][1]) {
        return false;
      }
      return true;
    }
  };

  const compareRhythm = (a, b, threshold) => {
    for (let i = 0; i < a.length; i++) {
      if (Math.abs(a[i][0] - b[i][0]) > threshold) {
        return false;
      }
      return true;
    }
  };

  function comparePerformances(a, b) {
    // we are now coupling the threshold with the function definition to minimize exports
    const backBeatThreshold = 500;
    // first test: are the two arrays the same length:
    if (a.length !== b.length) {
      return false;
    }
    let sameNotes = compareNotes(a, b);
    if (sameNotes === false) {
      return false;
    }
    let sameRhythm = compareRhythm(a, b, backBeatThreshold);
    if (sameRhythm === false) {
      return false;
    }
    return true;
  }

  const clickNext = () => {
    if (currentStep === 0) {
      setPromptArray([...buffer.current]);
      buffer.current.length = 0;
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 1) {
      setPasswordArray([...buffer.current]);
      buffer.current.length = 0;
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 2) {
      if (comparePerformances(passwordArray, buffer.current)) {
        setCurrentStep(currentStep + 1);
      } else {
        setErrorMessage("Passwords do not match, try again");
        buffer.current.length = 0;
      }
    }
    setPlayEnabled(false);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const saveNote = () => {
    const requestBody = {
      title,
      content,
      prompt: promptArray,
      password: passwordArray,
    };
    sendHttpRequest(
      "POST",
      "http://localhost:8080/noteboard",
      requestBody
    ).then(() => history.push("/"));
    /*the default behavior on navigation back to Noteboard is to NOT reload the 
    notes so your new note appears at the bottom*/
  };

  // recording: event listener setup from here until function return
  const writeToBuffer = (e) => {
    const note = keyToNote[e.key];
    if (note && recordingRef.current) {
      buffer.current.push([Date.now(), note]);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", writeToBuffer);

    return function cleanup() {
      document.addEventListener("keydown", writeToBuffer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (currentStep < 3) {
    return (
      <section className="create">
        <div>
          Step {currentStep + 1}: {instructions[currentStep].instructions}
        </div>
        <div style={{ textAlign: "center" }}>
          {instructions[currentStep].tip}
        </div>
        <Keyboard hue={hue} synth={synth} />
        <div className="transport">
          <TransportButton
            type={"record"}
            enabled={true}
            onClick={clickRecord}
          />
          <TransportButton
            type={"stop"}
            enabled={recording}
            onClick={clickStop}
          />
          <TransportButton
            type={"play"}
            enabled={playEnabled}
            onClick={clickPlay}
          />
        </div>
        <div>
          <NavigationButton
            enabled={true}
            label="Back"
            onClick={clickPrevious}
          />
          <NavigationButton
            enabled={playEnabled}
            label="Next"
            onClick={clickNext}
          />
        </div>
        <div>{errorMessage}</div>
      </section>
    );
  } else {
    // in this section, instruction and tooltip are duplicated. potential future refactor?
    return (
      <section className="create">
        <div>
          Step {currentStep + 1}: {instructions[currentStep].instructions}
        </div>
        <div style={{ textAlign: "center" }}>
          {instructions[currentStep].tip}
        </div>
        <textarea
          rows="1"
          placeholder="write your title here"
          onChange={handleTitleChange}
        />
        <textarea
          rows="5"
          placeholder="leave your message here"
          onChange={handleContentChange}
        />
        <div>
          <NavigationButton
            enabled={true}
            label="Back"
            onClick={clickPrevious}
          />
          <NavigationButton
            enabled={title.length > 0 && content.length > 0}
            label="Save"
            onClick={saveNote}
          />
        </div>
      </section>
    );
  }
};

export default Create;
