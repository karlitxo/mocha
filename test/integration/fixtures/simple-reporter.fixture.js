'use strict';

const Mocha = require('../../..');
const {
  RUNNER_EVENT_BEGIN,
  RUNNER_EVENT_END,
  RUNNER_EVENT_FAIL,
  RUNNER_EVENT_PASS,
  RUNNER_EVENT_SUITE_BEGIN,
  RUNNER_EVENT_SUITE_END
} = Mocha.Runner.constants;
const Base = Mocha.reporters.Base;

// this reporter outputs test results, indenting two spaces per suite
class MyReporter extends Base {
  constructor(runner) {
    super(runner);

    this._indents = 0;

    runner
      .once(RUNNER_EVENT_BEGIN, () => {
        console.log('start');
      })
      .on(RUNNER_EVENT_SUITE_BEGIN, () => {
        this.increaseIndent();
      })
      .on(RUNNER_EVENT_SUITE_END, () => {
        this.decreaseIndent();
      })
      .on(RUNNER_EVENT_PASS, test => {
        // Test#fullTitle() returns the suite name(s)
        // prepended to the test title
        console.log(`${this.indent()}pass: ${test.fullTitle()}`);
      })
      .on(RUNNER_EVENT_FAIL, (test, err) => {
        console.log(
          `${this.indent()}fail: ${test.fullTitle()} - error: ${err.message}`
        );
      })
      .once(RUNNER_EVENT_END, () => {
        // Base reporter has a `stats` property
        console.log(
          `end: ${this.stats.passes}/${this.stats.passes +
            this.stats.failures} ok`
        );
      });
  }

  indent() {
    return Array(this._indents)
      .fill('  ')
      .join('');
  }

  increaseIndent() {
    this._indents++;
  }

  decreaseIndent() {
    this._indents--;
  }
}

module.exports = MyReporter;
