var Twitter = require('./twitter');
var _ = require('lodash');

function processTweet(tweet) {
  if (tweet.user.screen_name == 'yoazt') {
    return
  }

  console.log('Incoming tweet: ' + tweet);
  if (tweet.text.indexOf('@yoazt') == -1) {
    console.log('=> (not a mention)');
    return;
  }

  postReply(tweet);
}

function postReply(tweet) {
  var replyText = "Hoi en leuk dat je @yoazt mentiont, maar inmiddels heet ik @joostlubach. Groetjes!"
  var reply = {
    status: '@' + tweet.user.screen_name + ' ' + replyText,
    in_reply_to_status_id: tweet.id_str
  };

  Twitter.post('statuses/update', reply, function (error, data) {
    if (error) {
      console.log(error);
    }
  });
}

var stream = Twitter.stream('user', {with: 'user'});
stream.on('tweet', function (tweet) {
  processTweet(tweet);
});
