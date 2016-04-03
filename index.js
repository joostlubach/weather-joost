var Twitter = require('twitter');
var client = require('./client');

client.post('statuses/update', {status: 'Hello 2!!'}, function (error, tweet, response) {
  if(error) {
    console.error(error);
  } else {
    console.log(tweet);  // Tweet body.
    console.log(response);  // Raw response object.
  }
});