import React, { useState } from "react";

const ViewReply = (props) => {
  const { id, title, prompt } = props.location.state;
  // set up a variable to indicate if reply has been clicked
  const [replyClicked, setReplyState] = useState(0);

  return (
    <section className="ViewReply">
      <div className="instructions">
        View or reply to secret message {title}
      </div>
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
