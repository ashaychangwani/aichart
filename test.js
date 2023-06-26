require('dotenv').config();

const { openaiApiCall } = require('./openai');
const fs = require('fs');
function loadJSONFromFile(filename) {
    const rawData = fs.readFileSync(filename);
    const jsonData = JSON.parse(rawData);
    return jsonData;
  }
(async () => {
    try {
        const data = '"Marine Sprite": Sold 44 copies in 2008, 55 copies in 2009, 41 copies in 2010, 37 copies in 2011, 22 copies in 2012, 43 copies in 2013, and 21 copies in 2014.\
        "Striking Calf": Sold 53 copies in 2008, 32 copies in 2009, 33 copies in 2010, 52 copies in 2011, 13 copies in 2012, 43 copies in 2013, and 32 copies in 2014.\
        "Tank Picture": Sold 12 copies in 2008, 17 copies in 2009, 11 copies in 2010, 9 copies in 2011, 15 copies in 2012, 11 copies in 2013, and 20 copies in 2014.\
        "Bucket Slope": Sold 9 copies in 2008, 7 copies in 2009, 5 copies in 2010, 8 copies in 2011, 6 copies in 2012, 9 copies in 2013, and 4 copies in 2014.\
        "Reborn Kid": Sold 25 copies in 2008, 12 copies in 2009, 19 copies in 2010, 32 copies in 2011, 25 copies in 2012, 24 copies in 2013, and 10 copies in 2014.'
        const functions = [ loadJSONFromFile('barchart.json') ]

        const response = await openaiApiCall(data, functions);
        console.log(response.data.choices[0].message.function_call.arguments)
    }
    catch (error) {
        console.error(`Error: ${error}`)
    }
})();