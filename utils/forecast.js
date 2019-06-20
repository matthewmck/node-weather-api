const axios = require('axios');

module.exports = async ({ latitude, longitude}) => {
  try {
    const { DARKSKY_API_KEY } = process.env;
    const result = await axios.get(`https://api.darksky.net/forecast/${DARKSKY_API_KEY}/${latitude},${longitude}`);

    return result;
  } catch (error) {
    console.error(error);
  }
};