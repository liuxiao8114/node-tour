var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
  // connected;
});

var kittySchema = mongoose.Schema({
  name : String,
  friends : [String],
  age : Number
});

kittySchema.methods.speak = function(){
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name!";
    console.log(greeting);
}

var Kitten = mongoose.model('Kitten',kittySchema);

var fluffy = new Kitten({
  name: 'fluffy',
  friends : ['tom','jerry']
});

fluffy.age = 3;
fluffy.speak(); // "Meow name is fluffy"

fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

Kitten.find(function (err, Kittens) {
  if (err) return console.error(err);
  console.log(Kittens);
});

Kitten.find({ name: /^Fluff/ }, function(){
  console.log('find!');
});
