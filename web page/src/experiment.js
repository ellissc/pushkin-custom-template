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

var welcome2 = {
  type: "html-button-response",
  stimulus:
    "<p>Welcome to the language age quiz! You'll provide some word associations.</p>",
  choices: ["Continue"],
};

timeline.push(welcome2);

// Instructions

var instructions = {
  type: "html-button-response",
  stimulus: `
         <h1>Instructions</h1>
          <p>In this quiz, you will be asked to provide the first three words that come to mind for a cue!</p>
          <p>Try to respond as quickly as you can. You do not need to fill all three boxes.</p>
          </br>
          <p>At the end of the quiz, we will use <b>advanced space-age artificial intelligence</b> guess your age based on your answers!</p>
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

var example_trial = {
  type: "survey-text",
  preamble:
    "\n\n\nHere is an example: 'potato'. \nPlease enter the first three words that come to mind.",
  questions: [{ prompt: "" }, { prompt: "" }, { prompt: "" }],
};

timeline.push(example_trial);

var feedback = {
  type: "html-button-response",
  stimulus:
    "<p>Great job! Those were some good answers. Now for the real quiz!</p>",
  choices: ["Continue"],
};
timeline.push(feedback);

for (var i = 0; i < stimArray.length; i++) {
  var trial = {
    type: "survey-text",
    preamble: "\n\n\n\n\n" + stimArray[i]["word1"],
    questions: [
      {
        prompt: "",
        name: "first-assoc_" + stimArray[i]["word1"],
        placeholder: "Word",
      },
      {
        prompt: "",
        name: "second-assoc_" + stimArray[i]["word1"],
        placeholder: "Word",
      },
      {
        prompt: "",
        name: "third-assoc_" + stimArray[i]["word1"],
        placeholder: "Word",
      },
    ],
    on_finish: function (data) {
      console.log(data);
    },
  };

  timeline.push(trial);

  if (i / stimArray.length > 0.8) {
    console.log("API call here");
  }
}

var predicted_age = {
  type: "html-button-response",
  stimulus:
    "<p>The AI guessed that you are <b>497</b> years old. Was this correct?</p>",
  choices: ["Yes!!!", "No..."],
};

timeline.push(predicted_age);

var participant_info = {
  type: "survey-text",
  questions: [{ prompt: "What is your actual age?", name: "real_age" }],
};

timeline.push(participant_info);

// jsPsych.data.displayData("csv");

export default timeline;
