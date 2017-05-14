'use strict';

var util = require('util');
var debug = require('debug')('prompt-password');
var Prompt = require('prompt-base');
var cyan = require('ansi-cyan');
var red = require('ansi-red');

/**
 * `password` type prompt
 */

function Password() {
  Prompt.apply(this, arguments);
  debug('initializing from <%s>', __filename);
}

/**
 * Inherit `Prompt`
 */

Prompt.extend(Password);

/**
 * Render the prompt to the terminal
 */

Password.prototype.render = function(error) {
  var append = error ? ('\n' + red('>> ') + error) : '';
  var message = this.message;
  if (this.status === 'answered') {
    message += cyan(mask(this.answer));
  } else {
    message += mask(this.rl.line || '');
  }
  this.ui.render(message, append);
};

/**
 * Mask password
 */

function mask(input) {
  if (!input) return '';
  return new Array(String(input).length + 1).join('*');
}

/**
 * Module exports
 */

module.exports = Password;
