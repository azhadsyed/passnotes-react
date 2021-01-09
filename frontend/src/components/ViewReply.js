import React, { useState } from "react";

const ViewReply = (props) => {
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
  console.log(title);
  // set up a variable to indicate if reply has been clicked
  const [replyClicked, setReplyState] = useState(0);

  return (
    <section className="ViewReply">
      <div className="instructions">
        View or reply to secret message: {title}
      </div>
      <div>{content}</div>
      {/* <div>replyClicked has state = {replyClicked}</div> */}
      <button onClick={() => setReplyState(1)}> Reply</button>
      {replyClicked === 1 ? (
        <input type="text">Type your response here...</input>
      ) : (
        <div></div>
      )}
    </section>
  );
};

export default ViewReply;

// function Example() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>Click me</button>
//     </div>
//   );
// }

// export default Example;
