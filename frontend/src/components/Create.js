import React, { useState, useMemo, useEffect, useRef } from "react";
import { Synth } from "tone";

import Keyboard from "./Keyboard";
import { keyToNote } from "./constants.js";
import {
  play,
  processPerformance,
  sendHttpRequest,
} from "./utilities/helpers.js";
import "./Create.css";

// code outside of the component runs on boot but not on re-render

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
  // initial declarations
  // rename this variable
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
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const buffer = useRef([]);

  // button onClick functions
  // code review: bug: unable to actually change state using this...and state not behaving as intended?
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
    setCurrentStep(currentStep - 1);
    setTitle("");
    setContent("");
  };

  const clickNext = () => {
    if (currentStep === 0) {
      setPromptArray(buffer.current);
      buffer.current.length = 0;
    } else if (currentStep === 1) {
      setPasswordArray(buffer.current);
      buffer.current.length = 0;
    }
    setPlayEnabled(false);
    setCurrentStep(currentStep + 1);
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
    ).then((response) => console.log(response));
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
      </section>
    );
  } else {
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
