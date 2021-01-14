import React, { useEffect, useState } from "react";
import Reply from "./Reply.js";
import "./ViewReply.css";

const View = (props) => {
  // useState(0);
  // useEffect(props.location.state, []);
  let state;
  if (props.location.state) {
    state = props.location.state;
  } else {
    // test case for development, MUST get rid of this for production
    state = {
      id: "5fdac78eca70f62f4c35994e",
      title: "test title",
      content: ["green", "blue", "red"],
    };
  }
  const { id, title, content } = state;
  // set up a variable to indicate if reply has been clicked
  const [replyClicked, setReplyState] = useState(false);
  const renderContent = content.join("\n");

  const NewlineText = (props) => {
    const text = props.text;
    return <div>{text}</div>;
  };

  return (
    <section className="View">
      <div className="instructions">
        View or reply to secret message: {title}
      </div>
      <div className="viewNoteContent">
        <NewlineText text={renderContent} />
      </div>
      {replyClicked ? (
        <Reply id={id} content={content} />
      ) : (
        <button onClick={() => setReplyState(true)}> Reply</button>
      )}
    </section>
  );
};

export default View;
