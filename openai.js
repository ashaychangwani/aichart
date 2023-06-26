require('dotenv').config();
const axios = require('axios');

const openaiApiCall = async (data) => {
  const apiKey = process.env.OPENAI_API_KEY;
  const prompt = `Parse the following unstructured data: ${data}`;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/engines/davinci-codex/completions',
      {
        prompt,
        max_tokens: 50,
        n: 1,
        stop: null,
        temperature: 1,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(`Error: ${error}`);
    throw new Error('Failed to fetch data from OpenAI API');
  }
};

module.exports = {
  openaiApiCall,
};