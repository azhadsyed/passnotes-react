import React, { useState } from "react";
import Reply from "./Reply.js";

const View = (props) => {
  let state;
  if (props.location.state) {
    state = props.location.state;
  } else {
    // test case for development, MUST get rid of this for production
    state = {
      id: "4snxb",
      title: "test title",
      content: "test content",
    };
  }
  const { id, title, content } = state;
  // set up a variable to indicate if reply has been clicked
  const [replyClicked, setReplyState] = useState(0);

  return (
    <section className="View">
      <div className="instructions">
        View or reply to secret message: {title}
      </div>
      <div>{content}</div>
      {/* <div>replyClicked has state = {replyClicked}</div> */}
      <button onClick={() => setReplyState(1)}> Reply</button>
      {replyClicked === 1 ? <Reply /> : <div></div>}
    </section>
  );
};

export default View;
