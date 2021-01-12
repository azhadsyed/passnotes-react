import React, { useState } from "react";
import { updateNote } from "../components/helpers";
import View from "./View";

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

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ replySubmitted: true });
    this.props.content.push(this.state.value);
    updateNote(this.props.id, this.props.content);
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
        ) : (
          <div></div>
        )}
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
          ) : (
            <div></div>
          )}
        </form>
      </div>
    );
  }
}

export default Reply;
