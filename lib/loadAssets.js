"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preloadImages = exports.autoPreload = exports.allTargets = void 0;
var _pluginPreload = _interopRequireDefault(require("@jspsych/plugin-preload"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// Create arrays of hot dog / not hot dog images
var numFiles = 5;
var hotDogFiles = Array.from(Array(numFiles), function (_, i) {
  return i + 1;
}).map(function (idx) {
  return "https://storage.googleapis.com/roar-hot-dog-images/hotdog/".concat(idx, ".jpg");
});
var notHotDogFiles = Array.from(Array(numFiles), function (_, i) {
  return i + 1;
}).map(function (idx) {
  return "https://storage.googleapis.com/roar-hot-dog-images/nothotdog/".concat(idx, ".jpg");
});
var allFiles = hotDogFiles.concat(notHotDogFiles);
var allTargets = allFiles.map(function (url) {
  return {
    target: "<img src=\"".concat(url, "\" width=250 height=250>"),
    isHotDog: !url.includes('nothotdog')
  };
});

/* preload images */
exports.allTargets = allTargets;
var preloadImages = {
  type: _pluginPreload["default"],
  images: allFiles
};
exports.preloadImages = preloadImages;
var autoPreload = {
  type: _pluginPreload["default"],
  auto_preload: true
};
exports.autoPreload = autoPreload;