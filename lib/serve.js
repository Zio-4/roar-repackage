"use strict";

var _index = require("./index");
var _roarFirekit = require("@bdelab/roar-firekit");
var _firebaseConfig = require("./firebaseConfig");
var queryString = new URL(window.location).search;
var urlParams = new URLSearchParams(queryString);
var pid = urlParams.get('participant') || null;
var studyId = urlParams.get('studyId') || null;
var classId = urlParams.get('classId') || null;
var schoolId = urlParams.get('schoolId') || null;
var params = {
  pid: pid,
  studyId: studyId,
  classId: classId,
  schoolId: schoolId
};
var firekit = new _roarFirekit.RoarFirekit({
  config: _firebaseConfig.roarConfig
}
// TODO: Insert Firekit Params
);

// TODO: DB connection instance (firekit)?
var roarApp = new _index.HotDogApp(firekit, params);
roarApp.run();