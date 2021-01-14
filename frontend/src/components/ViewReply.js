import React, { useState } from "react";
import "./ViewReply.css";
import { sendHttpRequest } from "./utilities/helpers.js";

const ViewReply = (props) => {
  const id = props.location.state.id;
  const title = props.location.state.title;

  const updateNote = async (post_id, new_content) => {
    const requestBody = { id: post_id, content: new_content };
    let response = await sendHttpRequest(
      "POST",
      "http://localhost:8080/noteboard/update",
      requestBody
    );
    return response;
  };

  // const { id, title, content } = state;
  // set up a variable to indicate if reply has been clicked
  const [replyClicked, setReplyState] = useState(false);
  const [submitted, setSubmitState] = useState(false);
  const [response, setResponse] = useState("");
  const [content, updateContent] = useState(props.location.state.content);

  const renderContent = (content) => {
    return content.join("\n \n");
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setReplyState(false);
    setSubmitState(true);
    content.push(response);
    updateNote(id, content); // talking to the actual database
  };

  return (
    <section>
      <div className="title"> {title}</div>
      <div className="threadReplies">
        {renderContent(content)}
        {submitted === true ? <div>{response}</div> : null}
      </div>
      <button className="replyButton" onClick={() => setReplyState(true)}>
        Reply
      </button>
      <form onSubmit={handleSubmit}>
        <>
          <label>
            Response:
            <input
              type="text"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
          </label>
          <input type="submit" value="Submit" />
        </>
      </form>
      {replyClicked === true ? <div>You clicked reply</div> : null}
    </section>
  );
};

export default ViewReply;
