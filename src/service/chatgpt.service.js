const { Configuration, OpenAIApi } = require("openai");

exports.chat = async function (text) {

  console.log('chat prompt = ' + text);
  try{

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: text}],
    });
    return Promise.resolve(completion.data.choices[0].message.content);
  }
    catch(ex)
    {
      return Promise.reject(ex);
    }
};
