'use strict';

/**
 * Provides a factory function for a {@link StatsCollector} object.
 * @private
 * @module
 */

var constants = require('./runner').constants;
var RUNNER_EVENT_PASS = constants.RUNNER_EVENT_PASS;
var RUNNER_EVENT_FAIL = constants.RUNNER_EVENT_FAIL;
var RUNNER_EVENT_SUITE = constants.RUNNER_EVENT_SUITE;
var RUNNER_EVENT_BEGIN = constants.RUNNER_EVENT_BEGIN;
var RUNNER_EVENT_PENDING = constants.RUNNER_EVENT_PENDING;
var RUNNER_EVENT_END = constants.RUNNER_EVENT_END;
var RUNNER_EVENT_TEST_END = constants.RUNNER_EVENT_TEST_END;

/**
 * Test statistics collector.
 *
 * @private
 * @typedef {Object} StatsCollector
 * @property {number} suites - integer count of suites run.
 * @property {number} tests - integer count of tests run.
 * @property {number} passes - integer count of passing tests.
 * @property {number} pending - integer count of pending tests.
 * @property {number} failures - integer count of failed tests.
 * @property {Date} start - time when testing began.
 * @property {Date} end - time when testing concluded.
 * @property {number} duration - number of msecs that testing took.
 */

var Date = global.Date;

/**
 * Provides stats such as test duration, number of tests passed / failed etc., by listening for events emitted by `runner`.
 *
 * @private
 * @param {Runner} runner - Runner instance
 * @throws {TypeError} If falsy `runner`
 */
function createStatsCollector(runner) {
  /**
   * @type StatsCollector
   */
  var stats = {
    suites: 0,
    tests: 0,
    passes: 0,
    pending: 0,
    failures: 0
  };

  if (!runner) {
    throw new TypeError('Missing runner argument');
  }

  runner.stats = stats;

  runner
    .once(RUNNER_EVENT_BEGIN, function() {
      stats.start = new Date();
    })
    .on(RUNNER_EVENT_SUITE, function(suite) {
      suite.root || stats.suites++;
    })
    .on(RUNNER_EVENT_PASS, function() {
      stats.passes++;
    })
    .on(RUNNER_EVENT_FAIL, function() {
      stats.failures++;
    })
    .on(RUNNER_EVENT_PENDING, function() {
      stats.pending++;
    })
    .on(RUNNER_EVENT_TEST_END, function() {
      stats.tests++;
    })
    .once(RUNNER_EVENT_END, function() {
      stats.end = new Date();
      stats.duration = stats.end - stats.start;
    });
}

module.exports = createStatsCollector;
