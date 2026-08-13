const animalsEndpoint = "http://localhost:3000/api/animals";
const options = {
    method:"GET",
    headers: {
        Accept: "/application/json",
    },
};

const anishelter = async function (req, res, next) {
    // console.log("TRAVEL CONTROLLER BEGIN");
    await fetch(animalsEndPoint, options)
        .then((res) => res.json())
        .then((json) => {
            let message = null;
            if(!(json instanceof Array)){
                message = "API lookup error";
                json = [];
            } else {
                if(!json.length) {
                    message = "No animals exist in the database.";
                }
            }
            res.render("anishelter", {title: "Animal Shelter", animals: json, message});
        })
        .catch((err) => res.status(500).send(err.message));
};


module.exports = { anishelter };