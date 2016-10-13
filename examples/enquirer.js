var Enquirer = require('enquirer');
var enquirer = new Enquirer();

enquirer.register('password', require('..'));

var questions = {
  type: 'password',
  message: 'Enter your password',
  name: 'password'
};

enquirer.ask(questions)
  .then(function(answers) {
    console.log(answers)
  });
