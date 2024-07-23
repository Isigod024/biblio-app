const path = require('path');
const fs = require('fs');
 
function getData(chemin){
    // Recuperation des questions
    const dataPath = path.resolve(__dirname, `../public/json/${chemin}.json`);
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    return data;
}
 
module.exports = {
    getData,
};