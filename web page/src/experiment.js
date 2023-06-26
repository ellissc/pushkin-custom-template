import jsPsych from "pushkin-jspsych";
const stimArray = require("./stim").default;
const consent = require("./consent.js").default;

const timeline = [];

// Read in the data.
// Placeholder.

// Preamble / Consent

var welcome = {
  type: "html-button-response",
  stimulus: consent + "<br/><p>Press the button to continue.</p>",
  choices: ["Continue"],
};

timeline.push(welcome);

// Instructions

var instructions = {
  type: "html-button-response",
  stimulus: `
          <h1>Instructions</h1>
          <p>In this study, you will be asked to complete a variety of tasks.</p>
          <p>In the first... In the second... In the third...</p>
        `,
  choices: ["Continue"],
};
timeline.push(instructions);

var trial = {
  timeline: [
    {
      type: "html-keyboard-response",
      stimulus:
        "<div>Press spacebar when you are ready to read some text.</div>",
    },
    {
      type: "survey-text",
      preamble:
        "Please provide the first three words that come to mind: " +
        jsPsych.timelineVariable("word1"),
      questions: [
        { prompt: "", placeholder: "First word" },
        { prompt: "", placeholder: "Second word" },
        { prompt: "", placeholder: "Third word" },
      ],
    },
  ],
  timeline_variables: stimArray,
};

timeline.push(trial);

export default timeline;
