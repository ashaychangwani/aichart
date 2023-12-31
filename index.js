const dotenv = require('dotenv');
dotenv.config();

const axios = require('axios');
const fs = require('fs');
const jsonSchema = require('jsonschema');
const path = require('path');
function loadJSONFromFile(filename) {
  const rawData = fs.readFileSync(filename);
  const jsonData = JSON.parse(rawData);
  return jsonData;
}

const referenceSchema = loadJSONFromFile(path.join(__dirname, 'mixedchart_props.json'));
var function_schema = loadJSONFromFile(path.join(__dirname, 'mixedchart.json'));

function_schema.parameters = referenceSchema;
const functions = [ function_schema ]

const apiKey = import.meta.env.OPENAI_API_KEY;
console.log(`outer apiKey: ${apiKey}`)


const openaiApiCall = async (data, debug) => {
  const prompt = `Plot a chart using plot_chart strictly from this data: {${data}}\
  Do not hallucinate data, stick to what is provided.\
  If it is not possible to plot a chart, say "Not possible".`
  console.log(`Prompt: ${prompt}`)
  console.log(`apiKey: ${apiKey}`)
  try {
    let response = await axios.post(
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

    var chart = {};

    response.data.choices.forEach(choice => {
      if (choice.message.function_call != null) {
        const argumentsJson = choice.message.function_call.arguments;
        
        try {
          const parsedJson = JSON.parse(argumentsJson);
          const validationResult = jsonSchema.validate(parsedJson, referenceSchema);
          if (validationResult.valid) {
            chart = parsedJson;
          } else {
            if(debug){
              console.log(JSON.stringify(parsedJson));
              console.log("Invalid JSON: ", validationResult.errors);
            }
            throw new Error('Invalid JSON');
          }
        } catch (error) {
          throw error;
        }
      }
    });

    return chart;

  } catch (error) {
    throw error;
  }
};

const generateChartOptions = async (props) => {
  console.log(`gen apiKey: ${apiKey}`)
  let retryCount = 0;
  const maxRetries = 5;
  const delayInMilliseconds = 200;

  if (props.debug == null) 
    props.debug = false;
  
  while (retryCount < maxRetries) {
    try {
      var response = {}
      response.options = await openaiApiCall(props.data, props.debug);
      response.type = response.options.chart.type;
      return response;
    }
    catch (error) {
      retryCount++;
      if(props.debug)
        console.log(`Attempt ${retryCount} failed. Retrying...`);
      await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));
    }
  }

  return {};
}
module.exports = {
  generateChartOptions
};
