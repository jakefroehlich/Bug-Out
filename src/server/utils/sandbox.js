const SandCastle = require('sandcastle');

const sandcastle = new SandCastle.SandCastle();

const script = sandcastle.createScript(`
  exports.main = function() {
    exit('Hey ' + name + ' Hello World!');
  }`
);

script.on('exit', function(err, output) {
  console.log(output); // Hello World!
});

script.run({name: 'Ben'});// we can pass variables into run.

module.exports=sandcastle;