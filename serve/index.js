import { HotDogApp } from "../src";
import { RoarFirekit } from '@bdelab/roar-firekit';
import { roarConfig } from "./firebaseConfig";

const queryString = new URL(window.location).search;
const urlParams = new URLSearchParams(queryString);
const pid = urlParams.get('participant') || null;
const studyId = urlParams.get('studyId') || null;
const classId = urlParams.get('classId') || null;
const schoolId = urlParams.get('schoolId') || null;

const params = { pid, studyId, classId, schoolId };
const firekit = new RoarFirekit(
    { config: roarConfig }
    // TODO: Insert Firekit Params
)

// TODO: DB connection instance (firekit)?
const roarApp = new HotDogApp(firekit, params);

roarApp.run();