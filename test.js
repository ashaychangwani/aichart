require('dotenv').config();

const { openaiApiCall } = require('./openai');

(async () => {
    try {
        const data = 'On June 1, 2023, the candlestick opened at 100, reached a high of 110, dropped to a low of 95, and closed at 105. The next day, June 2, saw an opening price of 108, a high of 115, a low of 100, and a closing price of 112. On June 3, the market opened higher at 112, hit a high of 118, experienced a low of 105, and closed at 107. The following day, June 4, started at 105, reached a high of 112, dipped to a low of 95, and closed at 99. June 5 saw an opening price of 98, a high of 105, a low of 92, and a closing price of 100. On June 6, the market opened at 102, hit a high of 108, had a low of 100, and closed at 105. June 7 started at 106, reached a high of 115, dipped to a low of 102, and closed at 113. The candlestick on June 8 opened at 112, had a high of 118, a low of 105, and closed at 107. On June 9, the market opened at 105, reached a high of 112, dropped to a low of 95, and closed at 99. Finally, June 10 saw an opening price of 98, a high of 105, a low of 92, and a closing price of 100.'

        const response = await openaiApiCall(data);
        console.log(response.data.choices[0].message.function_call.arguments)
    }
    catch (error) {
        console.error(`Error: ${error}`)
    }
})();