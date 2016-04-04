var HtmlEntities = require('html-entities');

var entities = new HtmlEntities.Html5Entities();

function city(match) {
  return {city: match[1]};
}

var patterns = [
  [/weather in ([-\w\s,\&]*)(?:[^\w].*)?$/, city], // "What is the weather in Amsterdam?" or "Weather in Rotterdam."
  [/^([-\w\s,\&]*?)$/, city]
];

function parseTweet(text) {
  var pattern, extract, match;

  text = text.toLowerCase();

  // Convert &amp; to &, etc.
  text = entities.decode(text);

  for (var i = 0; i < patterns.length; i++) {
    pattern = patterns[i][0];
    extract = patterns[i][1];

    if (match = text.match(pattern)) {
      return extract(match);
    }
  }

  return null;
}

module.exports = parseTweet;