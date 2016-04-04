// This is an example of a class. Now we can do simply:

// var weather = new Weather(data);
// console.log(weather.response);

function Weather(data) {
  this.city          = data.name;
  this.temp          = kelvinToCelsius(data.main.temp);
  this.tempMin       = kelvinToCelsius(data.main.temp_min);
  this.tempMax       = kelvinToCelsius(data.main.temp_max);
  this.description   = data.weather[0].description;
  this.windSpeed     = data.wind.speed;
  this.windDirection = windDegToDirection(data.wind.deg);
}

Weather.prototype.buildResponse = function () {
  var text = '{city}: {description}, {temp}° (low: {tempMin}°, high: {tempMax}°), {windDirection} wind @ {windSpeed}Bf.';
  for (var key in this) {
    text = text.replace('{' + key + '}', this[key]);
  }

  return text;
};

module.exports = Weather;

// Utility functions (not exported).

function kelvinToCelsius(kelvin) {
  return Math.round(kelvin - 273.15);
}

function windDegToDirection(deg) {
  if (deg >= 337.5 || deg < 22.5) {
    return 'northern';
  }
  if (deg >= 22.5 && deg < 67.5) {
    return 'north eastern';
  }
  if (deg >= 67.5 && deg < 112.5) {
    return 'eastern';
  }
  if (deg >= 112.5 && deg < 157.5) {
    return 'south eastern';
  }
  if (deg >= 157.5 && deg < 202.5) {
    return 'southern';
  }
  if (deg >= 202.5 && deg < 247.5) {
    return 'south western';
  }
  if (deg >= 247.5 && deg < 292.5) {
    return 'western';
  }
  if (deg >= 292.5 && deg < 337.5) {
    return 'north western';
  }
}