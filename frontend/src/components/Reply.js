import React, { useState } from "react";
import { updateNote } from "../components/helpers";

class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    const thisNoteID = this.props.id;
    const thisNoteContent = this.state.value;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  //for appending to work, make sure you go through noteboard every time!
  // otherwise it doesn't re-grab updated notes from database.
  // this isn't actually a problem since it's how we want website to eventually flow

  handleSubmit(event) {
    console.log(
      "current note content is",
      this.props.content + this.state.value
    );
    updateNote(this.props.id, this.props.content + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Message:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default Reply;
