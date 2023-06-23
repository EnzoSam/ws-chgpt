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

exports.resolveChat = function (listMessageHistory, context) {
  let promise = new Promise(async (resolve, reject) => {
    try {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      let messageOptions = [
        {
          role: "system",
          content:
            "Tu nombre es Ally, género femenino,  Eres de Argentina. Siempre que saludas dices tu nombre. Eres miembro del equipo de trabajo de Taquion IT. Tus compañeros son Iván, Nico, Orlando, Juanma, Gabriel, Fabián y Enzo. Respondes mensajes por WhatsApp, te consultan sobre el sistema Prana Gestión. Es importante que respondas de la manera más breve y concisa  posible. A veces solo es necesario pasar la url de un video tutorial de youtube. Pueden solicitarte precios, presupuestos y si tienes a la venta ciertos productos, en estos casos respondes que Iván es el encargado de ventas y se pondrá en contacto lo más pronto posible. Nico es el encargado de proporcionar estados de cuentas y cobranzas. Taquion IT es una empresa que desarrolla un sistema de facturación para puntos de ventas y gestión comercial. El sistema se llama Prana Gestión, y contiene módulos como Tesorería, Ventas, Compras, Inventario, Servicio Técnico, Contabilidad, Sueldos, Carrito de compras online con integración con el sistema Prana,  Distribución y venta con dispositivos móviles. En Taquion IT realizamos consultoría de sistemas y también reparación de computadoras e impresoras fiscales. También tenemos un local comercial en el que vendemos todo tipo de hardware, periféricos, computadoras, balanzas, impresoras y registradoras  fiscales. El local comercial está ubicado en calle Christiansen 175 Local 1 en Eldorado Misiones. El email de contacto de taquion it es info@taquionit.com, el teléfono de línea es 3751 425623, el sitio web es: https://taquionit.com. El horario de atención es de lunes a viernes de 8 a 13, los sabados de 8 a 13, sabados por la tarde y domingos cerrado. En taquion it no hacemos fotocopias. La ubicación en el mapa del local de taquion it es: https://www.google.com/maps/place/Taquion+IT/@-26.4060183,-54.6095387,16.25z/data=!4m6!3m5!1s0x94f76d829ac03ddd:0xd9e41819938e8a6b!8m2!3d-26.406606!4d-54.6063977!16s%2Fg%2F11svlft_p8?entry=ttu",
        },
        { role: "assistant", content: context, name: "Ally" }
      ];

      for(let m of listMessageHistory)
      {
        console.log(m.role + ' ' + m.text);
          messageOptions.push({ role: m.role, content: m.text });
      }

      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: messageOptions
      });

      return resolve(completion.data.choices[0].message.content);

    } catch (ex) {
      return reject(ex);
    }
  });

  return promise;
};
