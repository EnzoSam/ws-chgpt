const { Configuration, OpenAIApi } = require("openai");
const Paragraph = require('../model/paragraph.model');
const fs = require('fs');

exports.processEmbeddings = async function () {
  let prommise = new Promise(async(resolve, reject) => {
    try {

      console.log("archivo= ");

      let filePath = 'D:\\Desarrollo\\Proyectos\\ChatGPT\\ws-chgpt\\src\\public\\data.txt';

      fs.readFile(filePath, 'utf-8', async (err, fileText) => {
        if(err) {
          console.log(err);
         reject(err);
        } else {

          console.log('fileText');
          console.log(fileText);
    
          const paragraphs = fileText.split('\n');
    
          for (const text of paragraphs) {
    
            console.log('inicio parrafo');            
            console.log(text);
            console.log('fin parrafo');            


            const configuration = new Configuration({
              apiKey: process.env.OPENAI_API_KEY,
            });
            const openai = new OpenAIApi(configuration);

            const response = await openai.createEmbedding({
              model: "text-embedding-ada-002",
              input: text,
            });

            console.log(response.data.data[0]);

            const paragraph = new Paragraph({
              text: text,
              embedding: response.data.data[0].embedding,
            });
      
            // Guardar el párrafo en la base de datos
            await paragraph.save();
            console.log('paragraph guardado');
          }
    
          console.log('archivo procesado ok');
    
          resolve();

        }
      });

    } catch (ex) {
        reject(ex);
    }
  });
  return prommise;
};

exports.getMostSimilarParagraph = async function getMostSimilarParagraph(text) {
  
  console.log('getMostSimilarParagraph inicio');
  
  const paragraphs = await Paragraph.find().exec();

  console.log('getMostSimilarParagraph');
  let mostSimilarParagraph = null;

  console.log('getMostSimilarParagraph paragraphs');
  try{
  let greatestDistance = undefined;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  console.log('getMostSimilarParagraph openai');
  const openai = new OpenAIApi(configuration);
  console.log('getMostSimilarParagraph openai createEmbedding');
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });
  console.log('getMostSimilarParagraph openai createEmbedding response');
  for (const paragraph of paragraphs) {

    const similarity = await cosineSimilarity
    (response.data.data[0].embedding, paragraph.embedding);

    console.log('getMostSimilarParagraph openai response similarity');

    if(greatestDistance === undefined)
    {
      mostSimilarParagraph = paragraph;
      greatestDistance = similarity;
      continue;
    }

    if (similarity > greatestDistance) {
      mostSimilarParagraph = paragraph;
      greatestDistance = similarity;
    }
  }
}
catch(exc)
{
  console.log(exc);
}

  console.log('getMostSimilarParagraph openai createEmbedding response mostSimilarParagraph');

console.log('getMostSimilarParagraph openai response similarity fin');
  return mostSimilarParagraph;
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

