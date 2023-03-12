var axios = require('axios');

exports.chat = function (text) {
  return axios
    .post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: text,
        max_tokens: 5,
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
};
