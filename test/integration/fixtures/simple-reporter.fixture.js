'use strict';

var Base = require('../../../lib/reporters/base');
var constants = require('../../../lib/runner').constants;
var RUNNER_EVENT_PASS = constants.RUNNER_EVENT_PASS;
var RUNNER_EVENT_FAIL = constants.RUNNER_EVENT_FAIL;
var RUNNER_EVENT_SUITE = constants.RUNNER_EVENT_SUITE;
var RUNNER_EVENT_END = constants.RUNNER_EVENT_END;
var RUNNER_EVENT_TEST_END = constants.RUNNER_EVENT_TEST_END;

module.exports = SimpleReporter;

function SimpleReporter(runner) {
  Base.call(this, runner);

  runner.on(RUNNER_EVENT_SUITE, function(suite) {
    console.log("on('suite') called");
  });

  runner.on(RUNNER_EVENT_FAIL, function(test, err) {
    console.log("on('fail') called");
  });

  runner.on(RUNNER_EVENT_PASS, function(test) {
    console.log("on('pass') called");
  });

  runner.on(RUNNER_EVENT_TEST_END, function(test, err) {
    console.log("on('test end') called");
  });

  runner.on(RUNNER_EVENT_END, function() {
    console.log("on('end') called");
  });
}
