require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const jsonSchema = require('jsonschema');
function loadJSONFromFile(filename) {
    const rawData = fs.readFileSync(filename);
    const jsonData = JSON.parse(rawData);
    return jsonData;
  }
const referenceSchema = loadJSONFromFile('mixedchart.json');
const openaiApiCall = async (data) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `Plot a chart using plot_chart strictly from this data: {${data}}\
  Do not hallucinate data, stick to what is provided.\
  If it is not possible to plot a chart, say "Not possible".`
  const functions = [ loadJSONFromFile('mixedchart.json') ]
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-0613',
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        functions: functions
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + apiKey
        },
      }
    );

    const charts = [];

    response.data.choices.forEach(choice => {
      if (choice.message.function_call != null) {
        const argumentsJson = choice.message.function_call.arguments;
        
        try {
          const parsedJson = JSON.parse(argumentsJson);
          
          if (jsonSchema.validate(parsedJson, referenceSchema)) {
            charts.push(parsedJson);
          } else {
            console.log("Invalid JSON: ", validate.errors)
            throw new Error('Invalid JSON');          
          }
        } catch (error) {
          console.log('Failed to parse JSON:', error);
          throw error;
        }
      }
    });

    return charts;

  } catch (error) {
    throw error;
  }
};

module.exports = {
  openaiApiCall,
};