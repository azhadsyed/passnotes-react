import React from "react";
import "./Noteboard.css";
import { Link } from "react-router-dom";

const Note = (props) => {
  const { id, prompt, title } = props;
  const state = {
    id,
    title,
    prompt,
  };

  return (
    <Link
      to={{
        pathname: "/Authenticate",
        state,
      }}
    >
      <button className="note">{title}</button>
    </Link>
  );
};

const Noteboard = (props) => {
  const notes = props.noteObjects.map((note) => {
    const { _id, title, prompt } = note;
    return <Note key={_id} id={_id} title={title} prompt={prompt} />;
  });

  return (
    <div>
      <Link to="/Create">
        <button className="plusNewNote">New Note</button>
      </Link>
      {notes}
    </div>
  );
};

export default Noteboard;
