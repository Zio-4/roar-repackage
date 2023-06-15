// @ts-check
import { HotDogApp } from "./index";
import { RoarAppkit, RoarAppUser } from '@bdelab/roar-firekit';
import { roarConfig } from "./firebaseConfig";
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc } from 'firebase/firestore'


//@ts-ignore
const queryString = new URL(window.location).search;
const urlParams = new URLSearchParams(queryString);
const pid = urlParams.get('participant') || null;
const studyId = urlParams.get('studyId') || null;
const classId = urlParams.get('classId') || null;
const schoolId = urlParams.get('schoolId') || null;

console.log('roarConfig: ', roarConfig.firebaseConfig)

const app = initializeApp(roarConfig.firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const email = 'somethingfdfs@email.com'
const pw = 'Password'

try {
    const tempUser = await createUserWithEmailAndPassword(auth, email, pw)
} catch (error) {
    console.error(error)
}

if (auth.currentUser) {
    const userInfo = {
        assessmentPid: pid || "test-pid",
        assessmentUid: auth.currentUser?.uid,
        db,
    };

    // console.log('Passes firebase functions')

    const userRef = doc(db, "users", userInfo.assessmentUid)

    console.log({userRef})

    const roarUser = new RoarAppUser(userInfo);

    const params = { pid, studyId, classId, schoolId };
    // const firekit = new RoarAppkit(
    //     { config: roarConfig,
    //       userInfo: {
    //         assessmentUid: pid,
    //         db
    //         // classId,
    //         // schoolId,
    //         // districtId: '',
    //         // studyId
    //       },
    //       taskInfo: {
    //         db,
    //         taskId: 'roar-repackage',
    //         variantParams: params
    //       },
    //       auth
    //      }
    //     // TODO: Insert Firekit Params
    // )

    // // TODO: DB connection instance (firekit)?
    // const roarApp = new HotDogApp(firekit, params);

    // roarApp.run();    
} else {
    console.log('No user authed or created')
}