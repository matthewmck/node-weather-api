require('dotenv').config();
const location = require('../utils/location');
const forecast = require('../utils/forecast');

exports.handler = async function (event, context, callback) {
  const statusCode = 200;
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  if (event.httpMethod !== "POST") {
    return {
      statusCode,
      headers
    };
  };

  const { address } = JSON.parse(event.body);
  if (event.httpMethod === 'POST' && address) {
    try {
      const geoCode = await location(address);
      const { data } = await forecast(geoCode);

      return callback(null, {
        statusCode,
        headers,
        body: JSON.stringify({
          ...data,
          location: geoCode.name
        })
      });

    } catch (error) {
      return callback(new Error('Failed to get weather information'))
    }
  }
}
