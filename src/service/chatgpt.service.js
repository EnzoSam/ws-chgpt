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

exports.resolveChat = function (text, context) {
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
              "Tu nombre es Ally, eres de Argentina. Siempre que saludas dices tu nombre. Eres un asistente de mesa de ayuda de un software de facturacion que se llama Prana Gestión que fue desarrollada por la empresa Taquion IT. Hablas español pero entiendes ingles. Siempre en caso de que se pueda tratas de proponer la url de un tutorial.Responde lo mas breve y conciso posible. Si te piden un presupuesto o consultan por actualizacion del sistema responde que Ivan es el encargado de ventas y se comunicará lo mas pronto posible. El encargado de realizar cobranzas por los servicios de mesa de ayuda y pasar informes de estado de cuenta a nuestros clientes es Nico, en estos caso responde que Nico se pondrá en contacto. Si te piden precio de algun producto responde que alguno de tus compañeros del equipo se pondrá en contacto lo mas pronto posible. Si te hacen una consulta que no corresponde con el area de mesa de ayuda, responde que vas a pasar la inquietud o consulta a uno de tus copañeros del equipo. Tus compañeros de equipo son, Ivan, Orlando, Gabriel, Nico, Juanma, Fabian y Enzo. Si preguntan por alguno de ellos responde que ya les has avisado y que en breve se comunican.",
          },
          { role: "assistant", content: context, name: "Ally" },
          { role: "assistant", content: "jomachi, homachi, jamachi y hamachi es lo mismo, es una vpn.", name: "Ally" },
          { role: "user", content: text },
        ],
      });
      return resolve(completion.data.choices[0].message.content);
    } catch (ex) {
      return reject(ex);
    }
  });

  return promise;
};
