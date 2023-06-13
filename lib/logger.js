"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "log", {
  enumerable: true,
  get: function get() {
    return _roarr.Roarr;
  }
});
var _roarr = require("roarr");
var getLogLevel = function getLogLevel(level) {
  var prettyLevel;
  switch (level) {
    case 10:
      prettyLevel = "TRACE";
      break;
    case 20:
      prettyLevel = "DEBUG";
      break;
    case 30:
      prettyLevel = "INFO";
      break;
    case 40:
      prettyLevel = "WARN";
      break;
    case 50:
      prettyLevel = "ERROR";
      break;
    case 60:
      prettyLevel = "FATAL";
      break;
    default:
      prettyLevel = "LOG";
  }
  return "[ROAR:".concat(prettyLevel, "]");
};
globalThis.ROARR.write = function (message) {
  var payload = JSON.parse(message);
  if (payload.context.logLevel >= 30) {
    var logLevel = getLogLevel(payload.context.logLevel);
    console.log("".concat(logLevel, " ").concat(payload.message));
  }
};

// eslint-disable-next-line import/prefer-default-export