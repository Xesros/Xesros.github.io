// Bring in the DB Connection and Schema
const Mongoose = require('./db');
const Animal = require('./animals');

//Read seed data from a JSON file
var fs = require('fs');
var animals = JSON.parse(fs.readFileSync('./data/aac_shelter_outcomes.json', 'utf-8'));

//Clear DB, then re-seed
const seedDB = async () => {
    await Animal.deleteMany({});
    await Animal.insertMany(animals);
};

//Close Connnection w/Database
seedDB().then(async () => {
    await Mongoose.connection.close();
    process.exit(0);
});