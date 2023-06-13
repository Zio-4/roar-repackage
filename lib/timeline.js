"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildTimeline = void 0;
var _pluginFullscreen = _interopRequireDefault(require("@jspsych/plugin-fullscreen"));
var _pluginHtmlKeyboardResponse = _interopRequireDefault(require("@jspsych/plugin-html-keyboard-response"));
var _pluginVideoButtonResponse = _interopRequireDefault(require("@jspsych/plugin-video-button-response"));
var _pluginHtmlButtonResponse = _interopRequireDefault(require("@jspsych/plugin-html-button-response"));
var _pluginAudioKeyboardResponse = _interopRequireDefault(require("@jspsych/plugin-audio-keyboard-response"));
var _test_video = _interopRequireDefault(require("./assets/test_video.mp4"));
var _feedbackCorrect = _interopRequireDefault(require("./assets/feedbackCorrect.mp3"));
var _feedbackIncorrect = _interopRequireDefault(require("./assets/feedbackIncorrect.mp3"));
var _config = require("./config");
var _loadAssets = require("./loadAssets");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// jsPsych imports

// Local modules

var buildTimeline = function buildTimeline(config) {
  // ---------Initialize the jsPsych object and the timeline---------
  var jsPsych = (0, _config.initRoarJsPsych)(config);
  var timeline = (0, _config.initRoarTimeline)(config);

  // ---------Preload Media Here---------
  timeline.push(_loadAssets.preloadImages);

  // ---------Create trials---------

  timeline.push(_loadAssets.autoPreload);
  var videoTrial = {
    type: _pluginVideoButtonResponse["default"],
    stimulus: [_test_video["default"]],
    choices: ["A", "B", "C"],
    trial_ends_after_video: false,
    response_allowed_while_playing: false,
    response_ends_trial: true,
    controls: true,
    autoplay: true,
    width: 300,
    height: 300
  };
  timeline.push(videoTrial);
  var hotDogTrials = {
    timeline: [{
      type: _pluginHtmlKeyboardResponse["default"],
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: 'NO_KEYS',
      trial_duration: 500
    }, {
      type: _pluginHtmlButtonResponse["default"],
      stimulus: jsPsych.timelineVariable('target'),
      choices: ['Yes', 'No'],
      prompt: "\n            <p>Is this a hot dog?</p>\n            <p>If yes, click yes button.</p>\n            <p>If no, click the no button.</p>\n        ",
      on_load: function on_load() {
        var button1 = document.getElementById("jspsych-html-button-response-button-0");
        button1.addEventListener('click', function () {
          var testAudio = new Audio(_feedbackCorrect["default"]);
          testAudio.play();
          setTimeout(function () {
            console.log({
              jsPsych: jsPsych
            });
            jsPsych.finishTrial();
          }, 400);
        });
      },
      response_ends_trial: true,
      trial_duration: null
      // data: {
      //   // Here is where we specify that we should save the trial to Firestore
      //   save_trial: true,
      //   // Here we can also specify additional information that we would like stored
      //   // in this trial in ROAR's Firestore database.
      // },
    }],

    timeline_variables: _loadAssets.allTargets,
    sample: {
      type: 'without-replacement',
      size: 3
    }
  };
  timeline.push(hotDogTrials);

  // const feedbackTrial = {
  //   type: jsPsychAudioKeyboardResponse,
  //   stimulus: function () {
  //     const last_trial_correct = jsPsych.data.get().last(1).values()[0].correct;
  //     if (last_trial_correct) {
  //       return correctAudio
  //     }

  //     return incorrectAudio
  //   },
  //   choices: "NO_KEYS",
  //   trial_ends_after_audio: true,
  // }

  // timeline.push(feedbackTrial)

  timeline.push(videoTrial);
  var exit_fullscreen = {
    type: _pluginFullscreen["default"],
    fullscreen_mode: false,
    delay_after: 0
  };
  timeline.push(exit_fullscreen);
  return {
    jsPsych: jsPsych,
    timeline: timeline
  };
};
exports.buildTimeline = buildTimeline;