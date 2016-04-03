var Twitter = require('twitter');
var client = require('./client');

// client.post('statuses/update', {status: 'Hello 2!!'}, function (error, tweet, response) {
//   if(error) {
//     console.error(error);
//   } else {
//     console.log(tweet);  // Tweet body.
//     console.log(response);  // Raw response object.
//   }
// });

function processTweet(tweet) {
  if (tweet.user.screen_name == 'weather_joost') {
    return;
  }
}

client.stream('statuses/filter', {track: '@weather_joost'}, function (stream) {

  stream.on('data', processTweet);

  stream.on('error', function(error) {
    console.log(error);
  });

});