const axios = require('axios');

module.exports = async address => {
  try {
    const { MAPBOX_API_KEY } = process.env;
    const { data } = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${MAPBOX_API_KEY}`);

    return {
      latitude: data.features[0].center[1],
      longitude: data.features[0].center[0],
      name: `${data.features[0].text}, ${data.features[0].context[0].text}`
    };
  } catch (error) {
    console.error(error);
  }
};