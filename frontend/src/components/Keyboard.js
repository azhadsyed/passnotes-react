import React from "react";
// import { Synth } from "tone";
import { Piano, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import "./Keyboard.css";

const Keyboard = () => {
  const firstNote = MidiNumbers.fromNote("c4");
  const lastNote = MidiNumbers.fromNote("e5");
  const keyboardShortcuts = KeyboardShortcuts.create({
    firstNote: firstNote,
    lastNote: lastNote,
    keyboardConfig: KeyboardShortcuts.HOME_ROW,
  });
  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber) => {
        console.log(midiNumber);
      }}
      stopNote={(midiNumber) => {
        console.log(midiNumber);
      }}
      width={500}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};

export default Keyboard;
