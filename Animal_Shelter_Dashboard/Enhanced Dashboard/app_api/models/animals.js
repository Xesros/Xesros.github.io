const mongoose = require('mongoose');

//Define a Schema 
const animalSchema = new mongoose.Schema({
    rec_num: {type: Number, required:true, index:true},
    age_upon_outcome: {type: String, required: true},
    animal_id: {type: String, required: true, index: true}, 
    animal_type: {type: String, required: true, index: true},
    breed: {type: String, required: true},
    color:{type: String, required: true},
    date_of_birth: {type: String, required: true},
    datetime: {type: String, required: true},
    monthyear: {type: String, required: true},
    name: {type: String, required: false},
    outcome_subtype: {type: String, required: false},
    outcome_type: {type: String, required: false},
    sex_upon_outcome: {type: String, required: true},
    location_lat: {type: Number, required: true},
    location_long: {type: Number, required: true},
    age_upon_outcome_in_weeks: {type: Number, required: true},
});

const Animal = mongoose.model('animals', animalSchema);
module.exports = Animal;
