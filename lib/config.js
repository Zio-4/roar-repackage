"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.taskInfo = exports.readCSV = exports.initRoarTimeline = exports.initRoarJsPsych = exports.initConfig = void 0;
var _jspsych = require("jspsych");
var _pluginFullscreen = _interopRequireDefault(require("@jspsych/plugin-fullscreen"));
var _pluginSurveyText = _interopRequireDefault(require("@jspsych/plugin-survey-text"));
var _papaparse = _interopRequireDefault(require("papaparse"));
var _roarFirekit = require("@bdelab/roar-firekit");
var _firebaseConfig = require("./firebaseConfig");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // jsPsych imports
// Firebase imports
function configTaskInfo() {
  var taskInfo = {
    taskId: 'my-roar-app',
    taskName: 'My Roar App',
    variantName: 'default',
    taskDescription: 'Minimal working example of a ROAR-mep app',
    variantDescription: 'default',
    // eslint-disable-next-line no-undef
    // srcHash: SRC_HASH,
    srcHash: ''
  };
  return taskInfo;
}
var taskInfo = configTaskInfo();
exports.taskInfo = taskInfo;
var initConfig = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(firekit, params) {
    var pid, studyId, classId, schoolId, urlParams, config, userInfo;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          pid = params.pid, studyId = params.studyId, classId = params.classId, schoolId = params.schoolId, urlParams = params.urlParams; // const queryString = new URL(window.location).search;
          // const urlParams = new URLSearchParams(queryString);
          // const pid = urlParams.get('participant') || null;
          // const studyId = urlParams.get('studyId') || null;
          // const classId = urlParams.get('classId') || null;
          // const schoolId = urlParams.get('schoolId') || null;
          config = {
            pid: pid,
            studyId: studyId,
            classId: classId,
            schoolId: schoolId,
            // TODO (optional): You can add additional user metadata here
            userMetadata: {},
            startTime: new Date(),
            urlParams: urlParams || null,
            firekit: firekit
          }; // If the participant's ID was supplied through the query string, then start the
          // run using their info
          if (!(config.pid !== null)) {
            _context.next = 8;
            break;
          }
          userInfo = {
            id: config.pid,
            studyId: config.studyId || null,
            classId: config.classId || null,
            schoolId: config.schoolId || null,
            userMetadata: config.userMetadata
          };
          config.firekit.userInfo = userInfo;

          // config.firekit.updateUser()

          config.firekit.taskInfo = taskInfo;

          // config.firekit.updateTask()

          // config.firekit = new RoarFirekit({
          //   config: roarConfig,
          //   userInfo: userInfo,
          //   taskInfo,
          // });
          _context.next = 8;
          return config.firekit.startRun();
        case 8:
          return _context.abrupt("return", config);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function initConfig(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.initConfig = initConfig;
var initRoarJsPsych = function initRoarJsPsych(config) {
  // ROAR apps communicate with the participant dashboard by passing parameters
  // through the URL. The dashboard can be made to append a "gameId"
  // parameter, e.g., https://my-roar-app.web.app?gameId=1234.
  // Similarly, at the end of the assessment the ROAR app communicates with the
  // dashboard to let it know that the participant has finished the assessment.
  // The dashboard expects a game token, "g", and a completion
  // status, "c", e.g., https://reading.stanford.edu/?g=1234&c=1. Here we inspect
  // the "gameId" parameter that was passed through the URL query string and
  // construct the appropriate redirect URL.
  var queryString = new URL(window.location).search;
  var urlParams = new URLSearchParams(queryString);
  var gameId = urlParams.get('gameId') || null;
  var redirect = function redirect() {
    if (gameId === null) {
      // If no game token was passed, we refresh the page rather than
      // redirecting back to the dashboard
      window.location.reload();
    } else {
      // Else, redirect back to the dashboard with the game token that
      // was originally provided
      window.location.href = "https://reading.stanford.edu/?g=".concat(gameId, "&c=1");
    }
  };
  var jsPsych = (0, _jspsych.initJsPsych)({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    message_progress_bar: 'Progress Complete',
    on_finish: function on_finish() {
      redirect();
    }
  });

  // Extend jsPsych's on_finish and on_data_update lifecycle functions to mark the
  // run as completed and write data to Firestore, respectively.
  var extend = function extend(fn, code) {
    return function () {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(fn, arguments);
      // eslint-disable-next-line prefer-rest-params
      code.apply(fn, arguments);
    };
  };
  jsPsych.opts.on_finish = extend(jsPsych.opts.on_finish, function () {
    config.firekit.finishRun();
  });
  var timingData = {
    start_time_utc0: config.startTime.toISOString(),
    start_time_unix: config.startTime.getTime(),
    start_time_local: config.startTime.toLocaleString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
  };
  jsPsych.opts.on_data_update = extend(jsPsych.opts.on_data_update, function (data) {
    if (data.save) {
      config.firekit.writeTrial(_objectSpread({
        timingData: timingData,
        userInfo: config.firekit.userInfo
      }, data));
    }
  });

  // Add a special error handler that writes javascript errors to a special trial
  // type in the Firestore database
  window.addEventListener('error', function (e) {
    var _config$firekit;
    var msg = e.msg,
      url = e.url,
      lineNo = e.lineNo,
      columnNo = e.columnNo,
      error = e.error;
    (_config$firekit = config.firekit) === null || _config$firekit === void 0 ? void 0 : _config$firekit.writeTrial({
      task: 'error',
      lastTrial: jsPsych.data.getLastTrialData().trials[0],
      message: String(msg),
      source: url || null,
      lineNo: String(lineNo || null),
      colNo: String(columnNo || null),
      error: JSON.stringify(error || null),
      timeStamp: new Date().toISOString()
    });
  });
  return jsPsych;
};
exports.initRoarJsPsych = initRoarJsPsych;
var initRoarTimeline = function initRoarTimeline(config) {
  // If the participant's ID was **not** supplied through the query string, then
  // ask the user to fill out a form with their ID, class and school.
  var getPid = {
    type: _pluginSurveyText["default"],
    questions: [{
      prompt: 'Participant ID:',
      name: 'pid',
      placeholder: '0000',
      required: true
    }, {
      prompt: 'Class ID:',
      name: 'ClassId',
      placeholder: '0000',
      required: true
    }, {
      prompt: 'School ID',
      name: 'SchoolId',
      placeholder: '0000',
      required: true
    }],
    on_finish: function on_finish(data) {
      // eslint-disable-next-line no-param-reassign
      config.pid = data.response.pid;
      // eslint-disable-next-line no-param-reassign
      config.classId = data.response.ClassId;
      // eslint-disable-next-line no-param-reassign
      config.schoolId = data.response.SchoolId;
    }
  };
  var ifGetPid = {
    timeline: [getPid],
    conditional_function: function conditional_function() {
      return config.pid === null;
    },
    on_timeline_finish: function () {
      var _on_timeline_finish = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var userInfo;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              userInfo = {
                id: [config.schoolId, config.classId, config.pid].join('-'),
                studyId: config.studyId || null,
                classId: config.classId || null,
                schoolId: config.schoolId || null,
                userMetadata: config.userMetadata
              }; // eslint-disable-next-line no-param-reassign
              config.firekit.userInfo = userInfo;
              config.firekit.taskInfo = taskInfo;
              // config.firekit = new RoarFirekit({
              //   config: config.firekit.config,
              //   userInfo: config.firekit.userInfo,
              //   taskInfo,
              // });
              _context2.next = 5;
              return config.firekit.startRun();
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function on_timeline_finish() {
        return _on_timeline_finish.apply(this, arguments);
      }
      return on_timeline_finish;
    }()
  };

  // Enter full screen mode
  var enterFullscreen = {
    type: _pluginFullscreen["default"],
    fullscreen_mode: true,
    message: "<div><h1>The experiment will switch to full screen mode. <br> Click the button to continue. </h1></div>",
    delay_after: 0
  };
  return [ifGetPid, enterFullscreen];
};

/* csv helper function */
exports.initRoarTimeline = initRoarTimeline;
var readCSV = function readCSV(url) {
  return new Promise(function (resolve) {
    _papaparse["default"].parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function complete(results) {
        var csv_stimuli = results.data;
        resolve(csv_stimuli);
      }
    });
  });
};
exports.readCSV = readCSV;