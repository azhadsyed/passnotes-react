import React, { useState } from "react";
import "./ViewReply.css";
import { sendHttpRequest } from "./utilities/helpers.js";

const ViewReply = (props) => {
  let state;
  if (props.location.state) {
    state = props.location.state;
  } else {
    // test case for development, MUST get rid of this for production
    state = {
      id: "5fdac78eca70f62f4c35994e",
      title: "My Note Title",
      content: ["banana", "mango", "raspberry"],
    };
  }
  const { id, title, content } = state;
  // set up a variable to indicate if reply has been clicked
  const [replyClicked, setReplyState] = useState(false);
  const renderContent = (content) => {
    return content.join("\n \n");
  };

  const NewlineText = (props) => {
    const text = props.text;
    return text;
  };

  const handleReply = () => {
    return <div>You pressed reply!</div>;
  };

  const handleSubmit = () => {
    updateNote(id, content);
  };

  const updateNote = async (post_id, new_content) => {
    const requestBody = { id: post_id, content: new_content };
    let response = await sendHttpRequest(
      "POST",
      "http://localhost:8080/noteboard/update",
      requestBody
    );
    return response;
  };

  return (
    <section>
      <div className="title"> {title}</div>
      <div className="threadReplies">{renderContent(content)}</div>
      <button className="replyButton" onClick={() => handleReply()}>
        Reply
      </button>
    </section>
  );
};

export default ViewReply;
