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

  handleSubmit(event) {
    //alert("You entered message: " + this.state.value);
    this.updateNote(this.props.id, this.state.value);
    event.preventDefault();
  }

  updateNote(thisNoteID, thisNoteContent) {
    console.log("updated note ", thisNoteID, " with content ", thisNoteContent);
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
