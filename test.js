require('dotenv').config();

const { openaiApiCall } = require('./openai');

(async () => {
    try {
        const data = 'Category A constitutes 35% of the total, Category B accounts for 20%, Category C represents 15%, Category D represents 10%, and Category E accounts for the remaining 20%.'

        const response = await openaiApiCall(data);
        console.log(response.data.choices[0].message.function_call.arguments)
    }
    catch (error) {
        console.error(`Error: ${error}`)
    }
})();