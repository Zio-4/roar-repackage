"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.roarConfig = void 0;
var _logger = require("./logger");
// eslint-disable-next-line no-self-compare
var prodDoc = 'yeatmanlab' === 'yeatmanlab' ? ['prod', 'roar-prod'] : ['external', 'yeatmanlab'];
// eslint-disable-next-line no-undef
// const rootDoc = ROAR_DB_DOC === 'production' ? prodDoc : ['dev', 'my-roar-app'];
var rootDoc = prodDoc;

/* eslint-disable import/prefer-default-export */

// TODO: Handle environment variables - use DotEnv

var roarConfig = {
  firebaseConfig: {
    apiKey: 'AIzaSyCX9WR-j9yv1giYeFsMpbjj2G3p7jNHxIU',
    authDomain: 'gse-yeatmanlab.firebaseapp.com',
    projectId: 'gse-yeatmanlab',
    storageBucket: 'gse-yeatmanlab.appspot.com',
    messagingSenderId: '292331000426',
    appId: '1:292331000426:web:91a04220991e3405737013',
    measurementId: 'G-0TBTMDS993'
  },
  rootDoc: rootDoc
};

// eslint-disable-next-line operator-linebreak
exports.roarConfig = roarConfig;
var logMessage = "This ROAR app will write data to the ".concat(roarConfig.firebaseConfig.projectId, " ") + "Firestore database under the document ".concat(rootDoc.join(' > '), ".");
_logger.log.info(logMessage);