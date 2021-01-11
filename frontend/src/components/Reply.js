import React, { useState } from "react";
import { sendHttpRequest } from "../components/helpers";

class Reply extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    //alert("You entered message: " + this.state.value);
    this.saveNote(this.state.value);
    event.preventDefault();
  }

  saveNote() {
    // hard coded for now...
    const requestBody = {
      title: "pass this on",
      content: "I wasn't really looking for somebody",
      prompt: [[0, "E4"]],
      password: [[0, "F4"]],
    };
    sendHttpRequest(
      "POST",
      "http://localhost:8080/noteboard",
      requestBody
    ).then((response) => console.log(response));
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
