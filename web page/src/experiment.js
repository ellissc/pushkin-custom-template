import jsPsych from "pushkin-jspsych";
const stimArray = require("./stim.js").default;
const consent = require("./consent.js").default;

// console.log(stimArray);
// console.log(stimArray[0]);

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
          <p>In the first task, you will view a word and provide the first three words that come to mind.</p>
          <p>Please separate each word by a [space/enter/comma...]</p>
          <p>At the end of the experiment we will guess your age based on your answers!</p>
        `,
  choices: ["Continue"],
};
timeline.push(instructions);

// var trial = {
//   timeline: [
//     {
//       type: "survey-text",
//       preamble: () => jsPsych.timelineVariable("word1"),
//       questions: [{ prompt: "" }, { prompt: "" }, { prompt: "" }],
//     },
//   ],
//   timeline_variables: stimArray,
// };

// timeline.push(trial);

for (var i = 0; i < stimArray.length; i++) {
  var trial = {
    type: "survey-text",
    preamble: stimArray[i]["word1"],
    questions: [{ prompt: "" }, { prompt: "" }, { prompt: "" }],
    on_finish: function (data) {
      console.log(data);
    },
  };

  timeline.push(trial);
}

// Placeholder for model

var participant_info = {
  type: "survey-text",
  preamble: "What is your correct age?",
  questions: [{ prompt: "" }],
};

timeline.push(participant_info);

// jsPsych.data.displayData("csv");

export default timeline;
