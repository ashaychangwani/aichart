require('dotenv').config();

const { openaiApiCall } = require('./openai');

(async () => {
    try {
        const data = 'Here are two sets of scatter points belonging to different categories. In Category A, we have Point 1 with x = 2 and y = 4, Point 2 with x = 5 and y = 9, Point 3 with x = 7 and y = 3, Point 4 with x = 10 and y = 8, and Point 5 with x = 3 and y = 6. In Category B, we have Point 6 with x = 8 and y = 2, Point 7 with x = 6 and y = 7, Point 8 with x = 9 and y = 4, Point 9 with x = 4 and y = 5, and Point 10 with x = 1 and y = 10.'

        const response = await openaiApiCall(data);
        console.log(response.data.choices[0].message.function_call.arguments)
    }
    catch (error) {
        console.error(`Error: ${error}`)
    }
})();