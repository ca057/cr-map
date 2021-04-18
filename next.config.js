require("dotenv").config();

module.exports = {
  env: {
    mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
    tileServerBaseUrl: process.env.TILE_SERVER_BASE_URL,
  },
};
