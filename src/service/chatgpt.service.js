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
    console.log(completion.data.choices[0].message);

    return Promise.resolve(completion.data.choices[0].message);
  }
    catch(ex)
    {
      return Promise.reject(ex);
    }
};
