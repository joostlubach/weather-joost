var Twitter = require('twitter');
var Request = require('request');
var Readline = require('readline');
var Weather = require('./weather');
var client = require('./client');
var parseTweet = require('./parseTweet');

function loadWeather(request, callback) {
  var url = 'http://api.openweathermap.org/data/2.5/weather';
  var query = [];

  if (request.city) {
    query.push('q=' + encodeURIComponent(request.city));
  }
  query.push('APPID=95b242938899ce02545f491fbdcc5642');

  url += '?' + query.join('&');

  console.log(url);

  Request(url, function (error, response, body) {
    if (error) {
      console.error(error);
    } else {
      // The request library doesn't parse the JSON for us, like the twitter client does.
      var data = JSON.parse(body);
      var weather = new Weather(data);
      callback(weather);
    }
  });
}

function processTweet(tweet) {
  if (tweet.user.screen_name == 'weather_joost') {
    return;
  }

  var text = tweet.text.replace(/^.*?@weather_joost/, '');
  var request = parseTweet(text);

  console.log('Incoming: ' + text + ' => ' + JSON.stringify(request));

  if (!request) {
    respond("I don't understand your question", tweet);
  } else {
    loadWeather(request, function (weather) {
      respond(weather.buildResponse(), tweet);
    });
  }
}

function respond(text, tweet) {
  var reply = {
    status: '@' + tweet.user.screen_name + ' ' + text,
    in_reply_to_status_id: tweet.id_str
  };

  client.post('statuses/update', reply, function (error, tweet, response) {
    if (error) {
      console.error(error);
    } else {
      console.log('↳ Response sent: ' + text);
    }
  });
}

client.stream('statuses/filter', {track: '@weather_joost'}, function (stream) {

  stream.on('data', processTweet);

  stream.on('error', function(error) {
    console.log(error);
  });

});

// TESTING:

var rl = Readline.createInterface({input: process.stdin, output: process.stdout});
rl.on('line', function (input) {
  var request = parseTweet(input);
  console.log(request);

  loadWeather(request, function (weather) {
    console.log('↳ ' + weather.buildResponse());
    rl.prompt();
  });
});

rl.prompt();