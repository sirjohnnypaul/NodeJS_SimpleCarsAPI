

var express = require('express');
var fs = require('fs');
var app = express();

var loadCars = fs.readFileSync('availableCars.json');
var availableCars = JSON.parse(loadCars);

console.log(availableCars);

app.use(express.static('public'));

//routes

app.get('/cars', sendCars);

function sendCars(req, res) {

    res.send("We like cars too");
}

app.get('/cars/:car', sendCar);

function sendCar(req,res) {
    var data = req.params;
    res.send("We like "+data.car+" too!");
}

app.get('/cars/:car/:model', sendCar);

function sendCar(req,res) {
    var data = req.params;
    var model = data.model;
    res.send("We like "+data.car+" "+model+" too!");
}

app.get('/all', sendAllCars);

function sendAllCars(req, res) {
    res.send(availableCars);
}

app.get('/add/:model/:price?', addCar);

function addCar(req, res) {
    var data = req.params;
    var model = data.model;
    var price = Number(data.price);

    if(!price) {
        var replay = {
            msg: "We can not add the car if you did not provide the price!"
        }
        res.send(replay);
    } else {
        availableCars[model] = price;
        var availableCarsUpdates = JSON.stringify(availableCars);
        fs.writeFile('availableCars.json',availableCarsUpdates,finished);

        function finished(err) {
            console.log('Done');

            var replay = {
                msg: "Thanks for adding the car!",
                model: model,
                price: price
            }

            res.send(replay);
        }
    }
}

app.get('/search/:model/',searchCar);

function searchCar(req,res) {
    var model = req.params.model;
    var replay;

    if(availableCars[model]) {
        replay = {
            status: "The car was found on the models list",
            model: model,
            price: availableCars[model]
        }
    } else {
        replay = {
            status: "The car "+model+" was found on the models list",
        }
    }
    
    res.send(replay);
}

var server = app.listen(5000, listening);

function listening() {
    console.log('Listening on port 5000');
}
