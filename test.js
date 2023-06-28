require('dotenv').config();

const { openaiApiCall } = require('./openai');

(async () => {
    let retryCount = 0;
    const maxRetries = 5;
    const delayInMilliseconds = 2000;

    while(retryCount < maxRetries){
        try {
            const data = 'Category A constitutes 35% of the total, Category B accounts for 20%, Category C represents 15%, Category D represents 10%, and Category E accounts for the remaining 20%.'

            const response = await openaiApiCall(data);
            console.log("Response is", JSON.stringify(response))
            break;
        }
        catch (error) {
            console.error(`Error: ${error}`)
            retryCount++;
            console.log(`Attempt ${retryCount} failed. Retrying...`);
            await new Promise(resolve => setTimeout(resolve, delayInMilliseconds));
        }
    }

    if(retryCount === maxRetries) {
        console.error('Max retries exceeded. Exiting...');
    }
})();