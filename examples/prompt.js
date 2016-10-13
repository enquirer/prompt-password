var Prompt = require('..');
var prompt = new Prompt({
  type: 'password',
  message: 'Enter your password',
  name: 'password'
});

prompt.run()
  .then(function(answers) {
    console.log(answers)
  });
