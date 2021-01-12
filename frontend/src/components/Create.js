import React, { useState, useMemo, useEffect, useRef } from "react";
import { Synth } from "tone";

import Keyboard from "./Keyboard";
import { keyToNote } from "./constants.js";
import { play, processPerformance } from "./helpers.js";
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
  const hue = useMemo(
    () => `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`,
    []
  );
  const synth = useMemo(() => new Synth().toDestination(), []);

  const [currentStep, setCurrentStep] = useState(1);

  // maintaining the "recording" state requires a "double hook" so that the
  // native event listeners can access the current state. see:
  // https://codesandbox.io/s/event-handler-use-ref-4hvxt?from-embed
  const [recording, _setRecording] = useState(false);
  const recordingRef = useRef(recording);
  const setRecording = (bool) => {
    recordingRef.current = bool;
    _setRecording(bool);
  };

  const [playEnabled, setPlayEnabled] = useState(false);

  const buffer = useRef([]);

  // button onClick functions
  // code review: bug: unable to actually change state using this...and state not behaving as intended?
  const clickRecord = () => {
    console.log("firing");
    setRecording(true);
  };

  const clickStop = () => {
    setPlayEnabled(true);
    buffer.current = processPerformance(buffer.current);
  };

  const clickPlay = () => {
    play(buffer.current, synth);
  };

  // recording: event listener setup from here until function return
  const writeToBuffer = (e) => {
    const note = keyToNote[e.key];
    console.log(note, recordingRef.current);
    if (note && recordingRef) {
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

  return (
    <section className="create">
      <div>
        Step {currentStep}: {instructions[currentStep + 1].instructions}
      </div>
      <div style={{ textAlign: "center" }}>{instructions[0].tip}</div>
      <Keyboard hue={hue} synth={synth} />
      <div className="transport">
        <TransportButton type={"record"} enabled={true} onClick={clickRecord} />
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
          onClick={() => setCurrentStep(currentStep - 1)}
        />
        <NavigationButton
          enabled={playEnabled}
          label="Next"
          onClick={() => setCurrentStep(currentStep + 1)}
        />
      </div>
    </section>
  );
};

export default Create;
