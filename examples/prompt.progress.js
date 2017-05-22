var Prompt = require('..');
var prompt = new Prompt({
  type: 'password',
  message: 'Enter your password',
  name: 'password',
  mask: require('prompt-password-strength')
});

prompt.run()
  .then(function(answer) {
    console.log(answer)
  });
