'use strict';

var util = require('util');
var Prompt = require('prompt-base');
var log = require('log-utils');

/**
 * `password` type prompt
 */

function Password() {
  return Prompt.apply(this, arguments);
}

/**
 * Inherit `Prompt`
 */

util.inherits(Password, Prompt);

/**
 * Start the prompt session
 * @param  {Function} `cb` Callback when prompt is finished
 * @return {Object} Returns the `Password` instance
 */

Password.prototype.ask = function(cb) {
  this.callback = cb;
  this.ui.once('line', this.onSubmit.bind(this));
  this.ui.on('keypress', this.onKeypress.bind(this));
  this.once('error', this.onError.bind(this));
  this.render();
  return this;
};

/**
 * Render the prompt to the terminal
 */

Password.prototype.render = function(error) {
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

Password.prototype.onSubmit = function(input) {
  this.answer = this.getAnswer(input);
  this.status = 'answered';
  this.submitAnswer();
};

Password.prototype.onError = function(answer) {
  this.render(answer.isValid);
  this.rl.output.unmute();
};

/**
 * When a keypress is emitted (user types)
 */

Password.prototype.onKeypress = function() {
  this.render();
};

/**
 * When a keypress is emitted (user types)
 */

Password.prototype.getAnswer = function(input) {
  return input || this.question.default || '';
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

module.exports = Password;
