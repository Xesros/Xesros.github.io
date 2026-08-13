const express = require("express");
const router = express.Router();

const AnimalsController = require("../controllers/animals");
const authController = require("../controllers/authentication");

const jwt = require('jsonwebtoken'); //Enable JSON Web Tokens

//Default Routes
router.route("/animals")
    .get(AnimalsController.animalsList)
    .post(authenticateJWT, AnimalsController.animalsAddAnimal); //Add animal to the database

router.route("/animals/:rec_num")
    .get(AnimalsController.animalsByRecord)
    .put(authenticateJWT, AnimalsController.animalsUpdateAnimal)
    .delete(authenticateJWT, AnimalsController.animalsRemoveAnimal); //Update an animal in the database

router.route('/animals/type')
    .get(AnimalsController.animalsByType);

router.route('/animals/id/:animalID')
    .get(AnimalsController.animalsByID);

router.route("/animalsPaged")
    .get(AnimalsController.animalsListPaged); //Pagination with the Backend

// JWT and Login Functionality
router.route("/register")
    .post(authController.register);

router.route("/login")
    .post(authController.login);

// Method to authenticate our JWT
function authenticateJWT(req, res, next) {
// console.log('In Middleware');
    const authHeader = req.headers['authorization'];
// console.log('Auth Header: ' + authHeader);
if(authHeader == null)
    {
    console.log('Auth Header Required but NOT PRESENT!');
    return res.sendStatus(401);
    }
    let headers = authHeader.split(' ');
if(headers.length < 1)
    {
    console.log('Not enough tokens in Auth Header: ' +
    headers.length);
    return res.sendStatus(501);
    }
    const token = authHeader.split(' ')[1];
// console.log('Token: ' + token);
if(token == null)
    {
    console.log('Null Bearer Token');
    return res.sendStatus(401);
    }
// console.log(process.env.JWT_SECRET);
// console.log(jwt.decode(token));
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verified) => {
        if(err)
        {
            return res.sendStatus(401).json('Token Validation Error!');
        }
        req.auth = verified; // Set the auth param to the decoded object
    });
    next(); // We need to continue or this will hang forever
}
module.exports = router;