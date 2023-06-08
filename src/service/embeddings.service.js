const { Configuration, OpenAIApi } = require("openai");
const Paragraph = require("../model/paragraph.model");
const IAModelService = require("../service/iamodel.service");
const ParagraphService = require("../service/paragraph.service");
const fs = require("fs");
const iamodelModel = require("../model/iamodel.model");

exports.getMostSimilarParagraph = getMostSimilarParagraph;

exports.processEmbeddings = async function () {
  let prommise = new Promise(async (resolve, reject) => {
    try {
      let filePath =
        "D:\\Desarrollo\\Proyectos\\ChatGPT\\ws-chgpt\\src\\public\\data.txt";

      fs.readFile(filePath, "utf-8", async (err, fileText) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          IAModelService.getByVersion(process.env.IA_VERSION)
            .then(async (iamodel) => {
              // const paragraphs = fileText.split('\n');
              const paragraphs = fileText.split(/\n\s*\n/);

              for (const text of paragraphs) {
                const configuration = new Configuration({
                  apiKey: process.env.OPENAI_API_KEY,
                });
                const openai = new OpenAIApi(configuration);

                const response = await openai.createEmbedding({
                  model: "text-embedding-ada-002",
                  input: text,
                });

                const paragraph = new Paragraph({
                  text: text,
                  embedding: response.data.data[0].embedding,
                  model: iamodel,
                });

                // Guardar el párrafo en la base de datos
                await paragraph.save();
              }
              resolve();
            })
            .catch((ex) => {
              reject(ex);
            });
        }
      });
    } catch (ex) {
      reject(ex);
    }
  });
  return prommise;
};

exports.getMostSimilarText = function getMostSimilarText(text) {
  let prom = new Promise(async (resolve, reject) => {
    try {
      let paragraphs = await getMostSimilarParagraph(text);
      if (!paragraphs || paragraphs.length == 0) {
        resolve("");
      } else {
        let textSimilar = "";
        for (let p of paragraphs) {
          textSimilar += p.text;
        }

        resolve(textSimilar);
      }
    } catch (exc) {
      reject(exc);
    }
  });

  return prom;
};

async function getMostSimilarParagraph(text) {
  let mostSimilarParagraph = null;

  try {
    const iaModel = await IAModelService.getByVersion(process.env.IA_VERSION);
    console.log(iamodelModel);
    const paragraphs = await ParagraphService.getByModel(iaModel);
    console.log("cantidad parrafos = " + paragraphs.length);

    let greatestDistance = undefined;

    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const openai = new OpenAIApi(configuration);
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text,
    });
    for (const paragraph of paragraphs) {
      const similarity = await cosineSimilarity(
        response.data.data[0].embedding,
        paragraph.embedding
      );

      if (greatestDistance === undefined) {
        mostSimilarParagraph = paragraph;
        greatestDistance = similarity;
        continue;
      }

      if (similarity > greatestDistance) {
        mostSimilarParagraph = paragraph;
        greatestDistance = similarity;
      }
    }
  } catch (exc) {
    console.log(exc);
  }

  console.log(
    "getMostSimilarParagraph openai createEmbedding response mostSimilarParagraph"
  );

  console.log("getMostSimilarParagraph openai response similarity fin");

  let arr = [];
  if (
    mostSimilarParagraph &&
    mostSimilarParagraph !== null &&
    mostSimilarParagraph !== undefined
  ) {
    arr.push(mostSimilarParagraph);
    console.log(mostSimilarParagraph);
  }

  return arr;
}

function cosineSimilarity(a, b) {
  if (a.length !== b.length) {
    return NaN;
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] ** 2;
    normB += b[i] ** 2;
  }

  const normProduct = Math.sqrt(normA) * Math.sqrt(normB);
  return dotProduct / normProduct;
}
