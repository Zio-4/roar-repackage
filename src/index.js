import { initConfig } from './config';
import { buildTimeline } from './timeline';

// CSS imports
import './css/roar.css';

export class HotDogApp {
  constructor (firekit, params) {
    // TODO: Add validation of params so that if any are missing, we throw an error
    this.params = params
    this.firekit = firekit
  }

  async init() {
    const config = await initConfig(this.firekit, this.params);
    return buildTimeline(config);
  }

  async run() {
    const { jsPsych, timeline } = await this.init()
    jsPsych.run(timeline);
  }
} 

