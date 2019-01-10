'use strict';
/**
 * @module Min
 */
/**
 * Module dependencies.
 */

var Base = require('./base');
var inherits = require('../utils').inherits;
var constants = require('../runner').constants;
var RUNNER_EVENT_END = constants.RUNNER_EVENT_END;
var RUNNER_EVENT_BEGIN = constants.RUNNER_EVENT_BEGIN;

/**
 * Expose `Min`.
 */

exports = module.exports = Min;

/**
 * Initialize a new `Min` minimal test reporter (best used with --watch).
 *
 * @public
 * @class
 * @memberof Mocha.reporters
 * @extends Mocha.reporters.Base
 * @param {Runner} runner
 */
function Min(runner) {
  Base.call(this, runner);

  runner.on(RUNNER_EVENT_BEGIN, function() {
    // clear screen
    process.stdout.write('\u001b[2J');
    // set cursor position
    process.stdout.write('\u001b[1;3H');
  });

  runner.once(RUNNER_EVENT_END, this.epilogue.bind(this));
}

/**
 * Inherit from `Base.prototype`.
 */
inherits(Min, Base);

Min.description = 'essentially just a summary';
