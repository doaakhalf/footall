const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const upload=multer({dest:'uploads/'})
const StadiumModel = require('../models/stadium-model.js');

const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
var path = require('path');

const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////
router.get('/', (req, res, next) => {
    StadiumModel.find({}, function (error, stadium) {
        console.log(stadium); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
        res.send(stadium);
    });

});
                                




router.post('/add',upload.single('stadiumImage'), (req, res, next) => {
    ////////////////////
    console.log(req.file);
    
    let name = req.body.name;
    let location = req.body.location;
    // let stadiumImage=req.body.stadiumImage
    // let stadiumMapLocation=req.body.stadiumMapLocation
    
    //////////////////////////////////

    req.checkBody('name', ' name is required').notEmpty();
    req.checkBody('location', 'location is required').notEmpty();
    let newstadium=new StadiumModel({name,location})
    // newstadium.save(function (err, data) {
    //     if (err){ 
    //         res.send(err)
    //         return console.error(err);
           
    //     }
    //     else
    //     {
    //         res.send(data)
           
    //     }
    //     console.log("stadium added to the database");
    // });


});
/////////////////////////


module.exports = router