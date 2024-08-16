require("dotenv").config();
const contentful = require("contentful");

const client = contentful.createClient({
   space: process.env.CONTENTFUL_SPACE_ID,
   environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
   accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

module.exports = client;