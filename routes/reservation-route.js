const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const upload=multer({dest:'uploads/'})
const reservationModel = require('../models/Reservation-model.js');

const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
var path = require('path');

const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////
router.get('/', (req, res, next) => {
    reservationModel.find({}, function (error, reservationstadium) {
        console.log(reservationstadium); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
        res.send(reservationstadium);
    });

});
                                



router.post('/add',upload.single('stadiumImage'), (req, res, next) => {
    ////////////////////
    console.log(req.file);
    
    let user_id = req.body.user_id;
    // let stadium_id = req.body.stadium_id;
    let time_id = req.body.time_id;
    let player_number = req.body.player_number;
    let price = req.body.price;
    let pay = req.body.pay;
    // let stadiumImage=req.body.stadiumImage
    // let stadiumMapLocation=req.body.stadiumMapLocation
    
    //////////////////////////////////

    req.checkBody('name', ' name is required').notEmpty();
    req.checkBody('location', 'location is required').notEmpty();
    let newstadium=new StadiumModel({name,location})
    newstadium.save(function (err, data) {
        if (err){ 
            res.send(err)
            return console.error(err);
           
        }
        else
        {
            res.send(data)
           
        }
        console.log("stadium added to the database");
    });


});
/////////////////////////


module.exports = router