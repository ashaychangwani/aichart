require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
function loadJSONFromFile(filename) {
    const rawData = fs.readFileSync(filename);
    const jsonData = JSON.parse(rawData);
    return jsonData;
  }
const openaiApiCall = async (data) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `Plot a chart from this data: ${data}`;
  const functions = [ loadJSONFromFile('linechart.json') ]
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

    return response;
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

module.exports = {
  openaiApiCall,
};