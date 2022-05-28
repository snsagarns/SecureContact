const request = require("postman-request");
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoic2FnYXJ6aGVhcnQiLCJhIjoiY2wxbGRwY3lwMDhzZDNkbnV6ejg5ODNnYiJ9.OqO5xq_fDR55W_ITFVnXBA`;

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services");
    } else if (response.body.features.length === 0) {
      callback(
        `Unable to find the given location. Try another search`,
        undefined
      );
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longtitude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};
module.exports = geocode;
