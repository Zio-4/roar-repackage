// @ts-check
import { HotDogApp } from "./index";
import { RoarAppkit, initializeProject } from '@bdelab/roar-firekit';
import { roarConfig } from "./firebaseConfig";
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { faker } from '@faker-js/faker'

//@ts-ignore
const queryString = new URL(window.location).search;
const urlParams = new URLSearchParams(queryString);
const pid = urlParams.get('participant') || null;
const studyId = urlParams.get('studyId') || null;
const classId = urlParams.get('classId') || null;
const schoolId = urlParams.get('schoolId') || null;

const appKit = await initializeProject(roarConfig.firebaseConfig, 'assessmentApp');

const email = faker.internet.email();
const pw = faker.internet.password();

try {
    const tempUser = await createUserWithEmailAndPassword(appKit.auth, email, pw)
} catch (error) {
    console.error(error)
}

if (appKit.auth.currentUser) {
    const userInfo = {
      assessmentPid: pid || "test-pid",
      assessmentUid: appKit.auth.currentUser?.uid,
      db: appKit.db,
      userMetadata: {
        classId,
        schoolId,
        districtId: '',
        studyId
      },
    };

    const params = { pid, studyId, classId, schoolId };
    const taskInfo = {
      db: appKit.db,
      taskId: 'roar-repackage',
      variantParams: params,
    }

    const firekit = new RoarAppkit({ 
      auth: appKit.auth,
      taskInfo,
      userInfo,
    })

    const roarApp = new HotDogApp(firekit, params);

    roarApp.run();
} else {
    console.log('No user authed or created')
}