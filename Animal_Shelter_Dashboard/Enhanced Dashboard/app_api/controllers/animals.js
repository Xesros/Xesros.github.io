const mongoose = require('mongoose');
const Animal = require('../models/animals');
const Model = mongoose.model('animals');

// GET /animals - pulls all records!
// Regardless of outcome, response needs an HTML status code w/JSON response
const animalsList = async(req, res) => {
    const q = await Model
    .find({}) //All records
    .exec();

    //console.log(q);

    if(!q){
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

//Pagination
const animalsListPaged = async(req, res) => {
    let {page, pageSize, direction, animal_type} = req.query;
    console.log(req.query);
    try{
        page = parseInt(page, req.params.page) || 1;
        pageSize = parseInt(pageSize, req.params.amount) || 10;
        direction = parseInt(direction, req.params.direction) || 1;
        const q = await Model
        .aggregate([
            {
                $match: {
                    
                }
            },
            {
            $sort: {
                 'rec_num': direction
                }
            },
            {
                $facet: {
                    metadata: [{$count: 'totalCount' }],
                    data: [{$skip: (page - 1) * pageSize}, { $limit: pageSize }],
                },
            },
        ]);

    //console.log(q);

        if(!q){
            return res
                .status(404)
                .json(err);
        } else {
            return res
                .status(200)
                .json(q);
        }
    }
    catch (error){
        return res.status(500).json({ success: false });
    }
};

/*
const animalsListPaged = async(req, res) => {
    let {page, pageSize, direction} = req.query;
    console.log(req.query);
    try{
        page = parseInt(page, req.params.page) || 1;
        pageSize = parseInt(pageSize, req.params.amount) || 10;
        direction = parseInt(direction, req.params.direction) || 1;

        const q = await Model
        .aggregate([
        {
            $sort: {
                 'rec_num': direction
                }
            }
            $facet: {
                metadata: [{$count: 'totalCount' }],
                data: [{$skip: (page - 1) * pageSize}, { $limit: pageSize }],
            },

        }]);

    //console.log(q);

        if(!q){
            return res
                .status(404)
                .json(err);
        } else {
            return res
                .status(200)
                .json(q);
        }
    }
    catch (error){
        return res.status(500).json({ success: false });
    }
};
*/

// GET animal by type
const animalsByType = async(req, res) => {
    let {page, pageSize, animal_type} = req.query;
    let direction = 1;
    console.log(req.query);
    try{
        page = parseInt(page, req.params.page) || 1;
        pageSize = parseInt(pageSize, req.params.amount) || 10;
        
        const q = await Model
        .aggregate([
            
            {
                $facet: {
                    metadata: [{$count: 'totalCount' }],
                    data: [{$skip: (page - 1) * pageSize}, { $limit: pageSize }],
                },
            },
        ]);
    //console.log(q);

    if(!q){
        return res
            .status(404)
            .json(err);
    } else {
        console.log(res.json(q));
        return res
            .status(200)
            .json(q);
        
    }
    }
    catch (error){
        return res.status(500).json({ success: false });
    }
};

// GET animal by rec_num
const animalsByRecord = async(req, res) => {
    const q = await Model
    .find({'rec_num': req.params.rec_num}) //All records
    .exec();

    //console.log(q);

    if(!q){
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

//Pagination and Range
const animalsByID = async(req, res) => {
    const q = await Model.find({
        'animal_id' : { $gte: req.params.animalID, $lte: req.params.animalID + 9}
    })
    .exec();
     
    if(!q){
        return res
            .status(404)
            .json(err);
    } else {
        return res
            .status(200)
            .json(q);
    }
};

    //Post
    const animalsAddAnimal = async(req, res) => {
        const newAnimal = new Animal({
            rec_num: req.body.rec_num,
            age_upon_outcome: req.body.age_upon_outcome,
            animal_id: req.body.animal_id,
            animal_type: req.body.animal_type,
            breed: req.body.breed,
            color: req.body.color,
            date_of_birth: req.body.date_of_birth,
            datetime: req.body.datetime,
            monthyear: req.body.monthyear,
            name: req.body.name,
            outcome_subtype: req.body.outcome_subtype,
            outcome_type: req.body.outcome_type,
            sex_upon_outcome: req.body.sex_upon_outcome,
            location_lat: req.body.location_lat,
            location_long: req.body.location_long,
            age_upon_outcome_in_weeks: req.body.age_upon_outcome_in_weeks
    });

    const q = await newAnimal.save();

    if(!q){
        return res
            .status(400)
            .json(err);
    } else {
        return res
            .status(201)
            .json(q);
    }
}

//Put: /animals/:rec_num
const animalsUpdateAnimal = async(req, res) => {

    const q = await Model
        .findOneAndUpdate(
        { 'rec_num' : req.params.rec_num },
        {
            rec_num: req.body.rec_num,
            age_upon_outcome: req.body.age_upon_outcome,
            animal_id: req.body.animal_id,
            animal_type: req.body.animal_type,
            breed: req.body.breed,
            color: req.body.color,
            date_of_birth: req.body.date_of_birth,
            datetime: req.body.datetime,
            monthyear: req.body.monthyear,
            name: req.body.name,
            outcome_subtype: req.body.outcome_subtype,
            outcome_type: req.body.outcome_type,
            sex_upon_outcome: req.body.sex_upon_outcome,
            location_lat: req.body.location_lat,
            location_long: req.body.location_long,
            age_upon_outcome_in_weeks: req.body.age_upon_outcome_in_weeks
        }
    )
    .exec();

    if(!q)
    { // Database returned no data
        return res
        .status(400)
        .json(err);
    } else {
        return res
        .status(201)
        .json(q);
    }
}


//DELETE: /animals/:rec_num
const animalsRemoveAnimal = async(req, res) => {

    const q = await Model
        .findOneAndDelete(
        { 'rec_num' : req.params.rec_num }
    )
    .exec();

    if(!q)
    { // Database returned no data
        return res
        .status(400)
        .json(err);
    } else {
        return res
        .status(201)
        .json(q);
    }
}

module.exports = {
    animalsList,
    animalsByType,
    animalsByID,
    animalsByRecord,
    animalsListPaged,
    animalsAddAnimal,
    animalsUpdateAnimal,
    animalsRemoveAnimal
};