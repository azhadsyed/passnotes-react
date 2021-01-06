import React, { useEffect } from "react";
import { notesInOrder, keyToNote } from "./Constants";
import "./Keyboard.css";

const Keyboard = () => {
  let iWhite = 0;
  const keys = notesInOrder.map((note) => {
    let keyType = note.length > 2 ? "black key" : "white key";
    let left;
    if (keyType === "white key") {
      left = iWhite * 40 + "px";
      iWhite++;
    } else {
      left = iWhite * 40 - 15 + "px";
    }
    return (
      <div
        key={note}
        className={keyType}
        id={note}
        style={{ left: left }}
      ></div>
    );
  });

  const hue = `hsl(${Math.floor(Math.random() * 255)}, 100%, 80%)`;

  const playKeyboard = (e) => {
    const note = keyToNote[e.key];
    const type = e.type;
    if (note) {
      if (type === "keydown") {
        console.log(note);
        console.log(keys.note);
      } else if (type === "keyup") {
        console.log("bar");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", playKeyboard);
    document.addEventListener("keyup", playKeyboard);

    return function cleanup() {
      document.removeEventListener("keydown", playKeyboard);
      document.removeEventListener("keyup", playKeyboard);
    };
  });

  return <div className="keyboard">{keys}</div>;
};

export default Keyboard;

/*
[ ] Visible:
  [x] map through notesInOrder and create keys
  [x] style the keys
  [x] layout the keys absolutely in a relative div 
  (note - all the onKeyDown/window event listener examples I found were stateful,
     
  [ ] lightUp the keys on KeyDown
[ ] Playable:
  [ ] ONE SYNTH that triggers attacks and releases
[ ] Recordable
  [ ] push to buffer on keyDown
[ ] Verifiable
  [ ] fetch api requests
[ ] Pretty
  [ ] Design w/Amara
*/
