import React, { useEffect, useState } from "react";
import { notesInOrder, keyToNote } from "./utilities/constants";
import "./Keyboard.css";

/* code review - an instance of tone.Synth() is being created in both authenticate 
and create. Is it worthwhile to use one instance for both components ? Should 
we refactor using React.Context ? */

const Key = (props) => {
  const style = {
    backgroundColor: props.color,
    left: props.left,
  };
  return <div className={props.className} id={props.id} style={style}></div>;
};

const Keyboard = (props) => {
  let n = notesInOrder.length;
  const [keyboardState, setKeyboardState] = useState(Array(n).fill(0));

  const playKeyboard = (e) => {
    const note = keyToNote[e.key];
    const noteIndex = notesInOrder.indexOf(note);
    let newKeyboardState = keyboardState.slice();
    if (e.type === "keydown") {
      newKeyboardState[noteIndex] = 1;
      props.synth.triggerAttackRelease(note, 0.1); //code review: how to make this polyphonic
    } else if (e.type === "keyup") {
      newKeyboardState[noteIndex] = 0;
    }
    setKeyboardState(newKeyboardState);
  };

  useEffect(() => {
    //once this component mounts...
    document.addEventListener("keydown", playKeyboard);
    document.addEventListener("keyup", playKeyboard);
    // eslint-disable-next-line react-hooks/exhaustive-deps

    //when this component unmounts...
    return function cleanup() {
      document.removeEventListener("keydown", playKeyboard);
      document.removeEventListener("keyup", playKeyboard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let iWhite = 0;
  const keys = notesInOrder.map((note, index) => {
    const keyState = keyboardState[index];
    const className = note.length > 2 ? "black key" : "white key";
    const defaultColor = note.length > 2 ? "black" : "white";
    const statefulColor = keyState ? props.hue : defaultColor;
    let left;
    if (defaultColor === "white") {
      left = 40 * iWhite + "px";
      iWhite++;
    } else {
      left = 40 * iWhite - 15 + "px";
    }
    return (
      <Key
        key={note}
        color={statefulColor}
        id={note}
        className={className}
        keyState={keyState}
        left={left}
      />
    );
  });

  return <div className="keyboard">{keys}</div>;
};

export default Keyboard;
