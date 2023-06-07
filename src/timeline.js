// jsPsych imports
import jsPsychFullScreen from '@jspsych/plugin-fullscreen';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';
import jsPsychVideoButtonResponse from '@jspsych/plugin-video-button-response'
import jsPsychHtmlButtonResponse from '@jspsych/plugin-html-button-response'
import jsPsychAudioKeyboardResponse from '@jspsych/plugin-audio-keyboard-response'
import carVid from './assets/test_video.mp4'
import correctAudio from './assets/feedbackCorrect.mp3'
import incorrectAudio from './assets/feedbackIncorrect.mp3'

// Local modules
import { initRoarJsPsych, initRoarTimeline } from './config';

import { allTargets, preloadImages, autoPreload } from './loadAssets';

export const buildTimeline = (config) => {
    // ---------Initialize the jsPsych object and the timeline---------
    const jsPsych = initRoarJsPsych(config);
    const timeline = initRoarTimeline(config);

    // ---------Preload Media Here---------
    timeline.push(preloadImages);

    // ---------Create trials---------

    timeline.push(autoPreload)

    const videoTrial = {
    type: jsPsychVideoButtonResponse,
    stimulus: [
        carVid
    ],
    choices: ["A", "B", "C"],
    trial_ends_after_video: false,
    response_allowed_while_playing: false,
    response_ends_trial: true,
    controls: true,
    autoplay: true,
    width: 300,
    height: 300,
    }

    timeline.push(videoTrial);

    const hotDogTrials = {
    timeline: [
        {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '<div style="font-size:60px;">+</div>',
        choices: 'NO_KEYS',
        trial_duration: 500,
        },
        {
        type: jsPsychHtmlButtonResponse,
        stimulus: jsPsych.timelineVariable('target'),
        choices: ['Yes', 'No'],
        prompt: `
            <p>Is this a hot dog?</p>
            <p>If yes, click yes button.</p>
            <p>If no, click the no button.</p>
        `,
        on_load: () => {
            const button1 = document.getElementById("jspsych-html-button-response-button-0")
            button1.addEventListener('click', () => {
            const testAudio = new Audio(correctAudio)
            testAudio.play()
            setTimeout(() => {
                console.log({jsPsych})
                jsPsych.finishTrial()
            }, 400)
            })
        },
        response_ends_trial: true,
        trial_duration: null
        // data: {
        //   // Here is where we specify that we should save the trial to Firestore
        //   save_trial: true,
        //   // Here we can also specify additional information that we would like stored
        //   // in this trial in ROAR's Firestore database.
        // },
        },
    ],
    timeline_variables: allTargets,
    sample: {
        type: 'without-replacement',
        size: 3,
    },
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


    const exit_fullscreen = {
    type: jsPsychFullScreen,
    fullscreen_mode: false,
    delay_after: 0,
    };

    timeline.push(exit_fullscreen);

    return timeline;
}