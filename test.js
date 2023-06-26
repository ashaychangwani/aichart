require('dotenv').config();

const { openaiApiCall } = require('./openai');

(async () => {
    try {
        const data = "For Team A, the chart shows a column chart with the corresponding values: 23, 11, 22, 27, 13, 22, 37, 21, 44, 22, and 30. Team B's data is represented as an area chart, and the values are 44, 55, 41, 67, 22, 43, 21, 41, 56, 27, and 43. Lastly, Team C's data is presented as a line chart, with the values 30, 25, 36, 30, 45, 35, 64, 52, 59, 36, and 39."

        const response = await openaiApiCall(data);
        console.log(response.data.choices[0].message.function_call.arguments)
    }
    catch (error) {
        console.error(`Error: ${error}`)
    }
})();