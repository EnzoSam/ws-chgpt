var axios = require('axios');

exports.chat = function (text) {

  console.log('chat prompt = ' + text);
  try{
  return axios
    .post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: text,
        max_tokens: 50,
        n: 1,
        stop: "\n",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
  }
    catch(ex)
    {
      return Promise.reject(ex);
    }
};
