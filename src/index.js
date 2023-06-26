import { initConfig } from './config';
import { buildTimeline } from './timeline';

// CSS imports
import './css/roar.css';

export class HotDogApp {
  constructor (firekit, params, displayElement) {
    // TODO: Add validation of params so that if any are missing, we throw an error
    this.params = params
    this.firekit = firekit
    this.displayElement = displayElement
  }

  async init() {
    const config = await initConfig(this.firekit, this.params, this.displayElement);
    return buildTimeline(config);
  }

  async run() {
    const { jsPsych, timeline } = await this.init()
    jsPsych.run(timeline);
  }
} 

// generateAssetObject(jsonFile, bucketURI, lng, device)

// const preloadTrials = generatePreloadTrials(jsonFile, bucketURI, lng, device)

// const timeline = []

// timeline.push(preloadTrials.group1)

// timeline.push(someTrials)

// timeline.push(preloadTrials.group2)
// timeline.push(preloadTrials.group3)


// const params =  {
//   id,
//   studentId,
//   ...etc,
//   firekit,
//   timeline
// }

// const app = new HotDogApp(firekit, params)

// app.run()