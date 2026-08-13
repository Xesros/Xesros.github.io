/* GET Homepage */
const index = (req, res) => {
    res.render('index', {title: "Animal Shelter Dashboard"});
};

module.exports = {index};