import { initConfig } from './config';
import { buildTimeline } from './timeline';

// CSS imports
import './css/roar.css';

export class HotDogApp {
  constructor (firekit, params) {
    const { pid, classId, schoolId } = params;
    // TODO: Add validation of params so that if any are missing, we throw an error
    this.pid = pid
    this.studyId = studyId
    this.classId = classId
    this.schoolId = schoolId
    this.config = initConfig(firekit, params);
    this.timeline = buildTimeline(this.config);
  }

  run() {
    jsPsych.run(this.timeline);
  }
} 

