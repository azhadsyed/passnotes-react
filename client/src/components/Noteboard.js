import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { sendHttpRequest } from "./utilities/helpers";
import "./Noteboard.css";

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
  const [noteResources, setNoteResources] = useState([]);

  useEffect(async () => {
    const getNotes = async () => {
      let response = await sendHttpRequest("GET", "/api/notes");
      return response;
    };

    const response = await getNotes();
    setNoteResources(response);
  }, []);

  const notes = noteResources.map((note) => {
    const { _id, title, prompt } = note;
    return <Note key={_id} id={_id} title={title} prompt={prompt} />;
  });

  return (
    <div>
      <Link to="/Create">
        <button className="plusNewNote">Create New Note</button>
      </Link>
      {notes}
    </div>
  );
};

export default Noteboard;
