require('dotenv').config();

const { openaiApiCall } = require('./openai');

(async () => {
    try {
        const data = 'Here is the Mauritius population pyramid 2011:\
        Age Ranges: 85+, 80-84, 75-79, 70-74, 65-69, 60-64, 55-59, 50-54, 45-49, 40-44, 35-39, 30-34, 25-29, 20-24, 15-19, 10-14, 5-9, 0-4\
        Males: 0.4, 0.65, 0.76, 0.88, 1.5, 2.1, 2.9, 3.8, 3.9, 4.2, 4, 4.3, 4.1, 4.2, 4.5, 3.9, 3.5, 3\
        Females: -0.8, -1.05, -1.06, -1.18, -1.4, -2.2, -2.85, -3.7, -3.96, -4.22, -4.3, -4.4,-4.1, -4, -4.1, -3.4, -3.1, -2.8'

        const response = await openaiApiCall(data);
        console.log(response.data.choices[0].message.function_call.arguments)
    }
    catch (error) {
        console.error(`Error: ${error}`)
    }
})();