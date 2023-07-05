import { log } from './logger';

/* eslint-disable import/prefer-default-export */

export const roarConfig = {
  firebaseConfig: {
    apiKey: "AIzaSyDw0TnTXbvRyoVo5_oa_muhXk9q7783k_g",
    authDomain: "gse-roar-assessment.firebaseapp.com",
    projectId: "gse-roar-assessment",
    storageBucket: "gse-roar-assessment.appspot.com",
    messagingSenderId: "757277423033",
    appId: "1:757277423033:web:d6e204ee2dd1047cb77268"
  },
};

// eslint-disable-next-line operator-linebreak
const logMessage =
  `This ROAR app will write to the ${roarConfig.firebaseConfig.projectId} Firestore database.`;
log.info(logMessage);
