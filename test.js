require('dotenv').config();

const { openaiApiCall } = require('./openai');

(async () => {
    try {
        const data = 'Point 1 is located at x = 2 and y = 4, with a size of 10. Point 2 is located at x = 5 and y = 9, with a size of 20. Point 3 is located at x = 7 and y = 3, with a size of 15. Point 4 is located at x = 10 and y = 8, with a size of 25. Point 5 is located at x = 3 and y = 6, with a size of 12. Point 6 is located at x = 8 and y = 2, with a size of 18. Point 7 is located at x = 6 and y = 7, with a size of 14. Point 8 is located at x = 9 and y = 4, with a size of 22. Point 9 is located at x = 4 and y = 5, with a size of 16. Lastly, Point 10 is located at x = 1 and y = 10, with a size of 30.'

        const response = await openaiApiCall(data);
        console.log(response.data.choices[0].message.function_call.arguments)
    }
    catch (error) {
        console.error(`Error: ${error}`)
    }
})();