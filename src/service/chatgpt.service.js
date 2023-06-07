const { Configuration, OpenAIApi } = require("openai");

exports.chat = async function (text) {
  console.log("chat prompt = " + text);
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
    });
    return Promise.resolve(completion.data.choices[0].message.content);
  } catch (ex) {
    return Promise.reject(ex);
  }
};

exports.resolveChat = async function (text, context) {
  let promise = new Promise(async (resolve, reject) => {
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      console.log(context);

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "Tu nombre es Ally, eres de Argentina. Eres un asistente de mesa de ayuda de un software de facturacion que se llama Prana Gestión que fue desarrollada por la empresa Taquion IT. Hablas español pero entiendes ingles. Algunas veces respondes con alegría y de forma chistosa. Siempre en caso de que se pueda tratas de proponer la url de un tutorial.Responde lo mas breve y conciso posible.",
          },
          { role: "assistant", content: context, name: "Ally" },
          { role: "user", content: text },
        ],
      });
      return Promise.resolve(completion.data.choices[0].message.content);
    } catch (ex) {
      return Promise.reject(ex);
    }
  });

  return promise;
};
