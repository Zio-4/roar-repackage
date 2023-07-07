// @ts-check
import { HotDogApp } from "./index";
import { RoarAppkit, initializeFirebaseProject } from '@bdelab/roar-firekit';
import { roarConfig } from "./firebaseConfig";
import { onAuthStateChanged, signInAnonymously } from 'firebase/auth'

//@ts-ignore
const queryString = new URL(window.location).search;
const urlParams = new URLSearchParams(queryString);
const pid = urlParams.get('participant') || null;
const studyId = urlParams.get('studyId') || null;
const classId = urlParams.get('classId') || null;
const schoolId = urlParams.get('schoolId') || null;

// @ts-ignore
const appKit = await initializeFirebaseProject(roarConfig.firebaseConfig, 'assessmentApp', 'none');

onAuthStateChanged(appKit.auth, (user) => {
    if (user) {
        const userInfo = {
            assessmentPid: pid || "test-pid",
            assessmentUid: user.uid,
            userMetadata: {
                classId,
                schoolId,
                districtId: '',
                studyId
            },
        };

        const params = { pid, studyId, classId, schoolId, randomField: 42 };
        const taskInfo = {
            taskId: 'roar-repackage',
            variantParams: params,
        }

        const firekit = new RoarAppkit({
            firebaseProject: appKit,
            taskInfo,
            userInfo,
        })

        const roarApp = new HotDogApp(firekit, params);

        roarApp.run();
    }
});

await signInAnonymously(appKit.auth);