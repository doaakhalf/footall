const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const upload=multer({dest:'uploads/'})
const stadiumTimeModel = require('../models/stadiumTimes-model.js');

const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
var path = require('path');

const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////
router.get('/', (req, res, next) => {
    stadiumTimeModel.find({}, function (error, data) {
        console.log(data[0].stadium_id[0].id); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
       
        dataobj=[]
        for(let i=0;i<data.length;i++)
        {
            dataobj[i]={
                "stadium_id":data[i].stadium_id[0].id,
                "stadium_name":data[i].stadium_id[0].name,
                "stadium_location":data[i].stadium_id[0].location,
                "start_time":data[i].start,
                "start_time":data[i].end,
                "day":data[i].day,
                "price":data[i].price,
            }
        }
        res.send(dataobj);
    }).populate('stadium_id');

});
                                

router.post('/add', (req, res, next) => {
    ////////////////////
    console.log(req.file);
    
    let start = req.body.start;
    let end = req.body.end;
    let day=req.body.day;
    let price=req.body.price;
    let stadium_id=req.body.stadium_id;
    day=new Date(day)
    // let stadiumMapLocation=req.body.stadiumMapLocation
  
    //////////////////////////////////

    req.checkBody('start', ' start time is required').notEmpty();
    req.checkBody('end', 'end time is required').notEmpty();
    let newstadiumtime=new stadiumTimeModel({start,end,day,price,stadium_id})
    newstadiumtime.save(function (err, data) {
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