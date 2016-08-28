'use strict';

var util = require('util');
var BasePrompt = require('enquirer-prompt');
var log = require('log-utils');

/**
 * `password` type prompt
 */

function Prompt() {
  return BasePrompt.apply(this, arguments);
}

/**
 * Inherit `BasePrompt`
 */

util.inherits(Prompt, BasePrompt);

/**
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `Prompt` instance
 */

Prompt.prototype.ask = function(cb) {
  this.callback = cb;
  var self = this;

  this.ui.once('line', function(e) {
    self.onSubmit({value: self.filterInput(e)});
  });

  this.ui.on('keypress', this.render.bind(this, null));
  this.on('error', this.onError.bind(this));

  // Init
  this.render();
  return this;
};

/**
 * Render the prompt to the terminal
 */

Prompt.prototype.render = function(error) {
  var message = this.message;
  var append = error ? ('\n' + log.red('>> ') + error) : '';

  if (this.status === 'answered') {
    message += log.cyan(mask(this.answer));
  } else {
    message += mask(this.rl.line || '');
  }
  this.ui.render(message, append);
};

/**
 * When user presses the `enter` key
 */

Prompt.prototype.filterInput = function(input) {
  return input || this.question.default || '';
};

Prompt.prototype.onSubmit = function(answer) {
  this.status = 'answered';
  this.answer = answer.value;
  this.render();
  this.ui.write();
  this.callback(answer.value);
};

Prompt.prototype.onError = function(answer) {
  this.render(answer.isValid);
  this.rl.output.unmute();
};

/**
 * When a keypress is emitted (user types)
 */

Prompt.prototype.onKeypress = function() {
  this.render();
};

/**
 * Utils
 */

function mask(input) {
  if (!input) return '';
  input = String(input);
  return new Array(input.length + 1).join('*');
}

/**
 * Module exports
 */

module.exports = Prompt;
