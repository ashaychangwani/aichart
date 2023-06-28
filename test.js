require('dotenv').config();

const { generateChartOptions } = require('./openai');

const data = 'Category A constitutes 35% of the total, Category B accounts for 20%, Category C represents 15%, Category D represents 10%, and Category E accounts for the remaining 20%.'

generateChartOptions(data, debug=true)
  .then(response => console.log(response))
  .catch(error => console.error(error));