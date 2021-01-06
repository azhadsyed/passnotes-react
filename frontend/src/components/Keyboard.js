import React, { useEffect, useState } from "react";
import { notesInOrder, keyToNote } from "./Constants";
import "./Keyboard.css";

const Keyboard = (props) => {
  let n = notesInOrder.length;
  const [keyboardState, setKeyboardState] = useState(Array(n).fill(0));

  //playKeyboard modifies the "state" of the Keyboard, where 1 means a key is pressed down
  const playKeyboard = (e) => {
    const note = keyToNote[e.key];
    const noteIndex = notesInOrder.indexOf(note);
    let newKeyboardState = keyboardState.slice();
    if (e.type === "keydown") {
      newKeyboardState[noteIndex] = 1;
    } else {
      newKeyboardState[noteIndex] = 0;
    }
    setKeyboardState(newKeyboardState);
  };

  useEffect(() => {
    document.addEventListener("keydown", playKeyboard);
    document.addEventListener("keyup", playKeyboard);
    return function cleanup() {
      document.removeEventListener("keydown", playKeyboard);
      document.removeEventListener("keyup", playKeyboard);
    };
  });

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

// the key's color is dependent on its class and its keyState
const Key = (props) => {
  const style = {
    backgroundColor: props.color,
    left: props.left,
  };
  return <div className={props.className} id={props.id} style={style}></div>;
};

export default Keyboard;
