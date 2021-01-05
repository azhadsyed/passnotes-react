import React, { Component } from "react";

// let recordingPrompt = new Step("recordingPrompt", "Perform your musical prompt.", "Use the keyboard to practice. \n Press record when you're ready. \n When you're done, press stop.")
// let recordingPassword = new Step("recordingPassword", "Perform your musical response.", "Press record again to save a response to your prompt. Press stop when you're done.")
// let confirmingPassword = new Step("confirmingPassword", "Confirm your musical response.")

/*
Roadmap:
0. Implement spacing
1. Implement react-piano
2. Implement control buttons
3. Implement navigation buttons
4. Implement form nature of UI
*/

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      prompt: [],
      passwordSet: [],
      passwordVerify: [],
      title: "",
      content: "",
    };
    this.carousel = ["foo", "bar", "baz"];
  }

  prevStep = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep < 2 ? 1 : currentStep - 1;
    this.setState({ currentStep: currentStep });
  };

  nextStep = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep > 2 ? 3 : currentStep + 1;
    this.setState({ currentStep: currentStep });
  };

  render() {
    return (
      <div>
        {this.carousel[this.state.currentStep - 1]}
        <p></p>
        <button onClick={this.prevStep}>Back</button>
        <button onClick={this.nextStep}>Next</button>
      </div>
    );
  }
}

export default Create;
