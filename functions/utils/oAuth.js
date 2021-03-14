const {google} = require('googleapis');
const got = require("got");


const refreshAccessToken = async (refreshToken) => {
  const response = await got("https://www.googleapis.com/oauth2/v4/token", {
    method: "POST",
    json: {
      client_id:   process.env.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: "refresh_token" 
    },
    responseType: 'json'
    });
    return response.body
};

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URL
);

const getAccessAndRefreshToken = async (authCode) => {

  const {tokens} = await oauth2Client.getToken(authCode)
  return tokens;
}

module.exports={getAccessAndRefreshToken, refreshAccessToken}