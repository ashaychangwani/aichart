require('dotenv').config();
const axios = require('axios');

const openaiApiCall = async (data, functions) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `Plot a bar chart from this data: ${data}`;

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
    throw new Error('Failed to fetch data from OpenAI API');
  }
};

module.exports = {
  openaiApiCall,
};