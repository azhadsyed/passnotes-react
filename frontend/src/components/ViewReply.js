import React, { useState } from "react";
import "./ViewReply.css";
import { sendHttpRequest } from "./utilities/helpers.js";

const ViewReply = (props) => {
  const id = props.location.state.id;
  const title = props.location.state.title;

  const updateNote = async (post_id, reply) => {
    const requestBody = { id: post_id, reply: reply };
    let response = await sendHttpRequest(
      "POST",
      "http://localhost:8080/noteboard/update",
      requestBody
    );
    return response;
  };

  const [replyClicked, setReplyState] = useState(false);
  const [submitted, setSubmitState] = useState(false);
  const [response, setResponse] = useState("");
  const [content, updateContent] = useState(props.location.state.content);
  // let content = props.location.state.content;

  const renderContent = (content) => {
    return content.join("\n \n");
  };

  const handleSubmit = async (evt) => {
    console.log("og content is", content);
    evt.preventDefault();
    setReplyState(false);
    setSubmitState(true);
    const newContent = await updateNote(id, response);
    updateContent(newContent);
    console.log("new content:", newContent);
    setResponse("");
  };

  return (
    <section>
      <div className="title"> {title}</div>
      <div className="threadReplies">{renderContent(content)}</div>
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
