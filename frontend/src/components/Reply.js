import React, { useState } from "react";
import View from "./View";
import { sendHttpRequest } from "./utilities/helpers.js";

class Reply extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      replySubmitted: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateNote = async (post_id, new_content) => {
    const requestBody = { id: post_id, content: new_content };
    let response = await sendHttpRequest(
      "POST",
      "http://localhost:8080/noteboard/update",
      requestBody
    );
    return response;
  };

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ replySubmitted: true });
    this.props.content.push(this.state.value);
    this.updateNote(this.props.id, this.props.content);
    event.preventDefault();
    return (
      <div>
        <div>{this.state.value}</div>
        <Reply />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.state.replySubmitted === true ? (
          <div>{this.state.value}</div>
        ) : null}
        <form onSubmit={this.handleSubmit}>
          {this.state.replySubmitted === false ? (
            <label>
              Message:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
              <input id="myInput" type="submit" value="Submit" />
            </label>
          ) : null}
        </form>
      </div>
    );
  }
}

export default Reply;
