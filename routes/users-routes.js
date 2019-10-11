const express = require('express');
const mongoose = require('mongoose');
const usersModel = require('../models/user-model.js');

const {SHA256}=require('crypto-js');
const jwt=require('jsonwebtoken');
var path = require('path');

const router = express.Router();
router.use(express.static(path.join(__dirname, 'public')));

//////////////////////////////////
router.get('/', (req, res, next) => {
    usersModel.find({}, function (error, users) {
        console.log(users); //Display the comments returned by MongoDB, if any were found. Executes after the query is complete.
        res.send(users);
    });

});
                                




router.post('/add', (req, res, next) => {
    ////////////////////
    let first_name = req.body.first_name;
    let last_name = req.body.last_name;
    let mail = req.body.mail;
    let location = req.body.location;
    let password = req.body.password;
    let phone_number = req.body.phone_number;
    phone_number = phone_number.substr(2)
    //////////////////////////////////

    req.checkBody('first_name', 'first name is required').notEmpty();
    req.checkBody('last_name', 'last name is required').notEmpty();
    req.checkBody('email', 'email is required').notEmpty();
    req.checkBody('phone_number', 'phone number is required').notEmpty();
    req.checkBody('phone_number', 'phone number is too short ').isLength({ min: 13 });
    req.checkBody('phone_number', 'phone number is too long').isLength({ max: 14 });
    req.checkBody('phone_number', 'phone number is not a number').isNumeric();
    req.checkBody('country_code', 'country code is required').notEmpty();
    req.checkBody('email', 'email is invalid format').isEmail();
    req.checkBody("phone_number", "invalidphone").matches(/^\+?[1-9]\d{1,14}$/, "i");
    req.checkBody("country_code", "invalid country code").matches(/\w{2,3}/, "i");
    req.checkBody("birthdate", "invalid birthdate format").matches(/^(19|20)\d\d([- /.])(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])/, "i");
    // req.checkBody("password", "...").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/, "i");

    //////////////
    var errors = req.validationErrors();
    let errarr = [];
    /////////////
    usersModel.find({ email: email }, function (err, docs) {
        if (docs.length) {
            errarr.push("email is already  taken")
            console.log(errarr);
        }
        else {
            console.log("testttt");
        }
    }).then(function () {

        if (errors || errarr.length > 0) {
            req.session.errors = errors;
            req.session.success = false;
            console.log(errors);
            if (errarr.length > 0 && !errors) {
                res.send(errarr)
            }
            else {
                // res.redirect('/users/form');
                for (error of errors) {
                    console.log(error.param);
                    errarr.push(error.msg)
                }
            }
            res.send(errarr)
        }

        else {
            req.session.success = true;
            //////////////////
            let user = new usersModel(
                { first_name, last_name,  phone_number, mail, location, password });
            
            // save model to database
            user.save(function (err, data) {
                if (err){ 
                    res.send(err)
                    return console.error(err);
                   
                }
                else
                {
                    res.send(data)
                   
                }
                console.log("user added to the database");
            });
           
            // model.findOne().sort({ field: 'asc', _id: -1 }).limit(1)
           


        }

    })


});
//////////////////////////////

router.post('/login', (req, res, next) => {


    // let body=_.pick(req.body,['phone_number','password']);
    let phone_number = req.body.phone_number;
    let password = req.body.password;
 
    req.checkBody('phone_number', 'phone number is required').notEmpty();
    req.checkBody('phone_number', 'phone number is too short ').isLength({ min: 13 });
    req.checkBody('phone_number', 'phone number is too long').isLength({ max: 14 });
    req.checkBody('phone_number', 'phone number is not a number').isNumeric();
    req.checkBody('password', 'password required').notEmpty();
    var errors = req.validationErrors();
    let errarr = [];
    if(errors)
    {

        req.session.errors = errors;
        req.session.success = false;
        for(error of errors){
            errarr.push(error)
        }

        res.send(errarr)
    }
    else
    {
        req.session.success = true;
        usersModel.find({password:password,phone_number:phone_number}, function (err, docs) {
            if (docs.length) {
                id=docs[0]._id;
                let data={
                    id
                }
                let token = jwt.sign(data,'somesecret')
                console.log(token);
                res.send(token)
                
                
            }
            else {
                console.log("testttt");
                res.send('account is not exist')
            }
        })
    }
    
    // user.save().then((user)=>{res.send(user)}).catch((e)=>{
    //     res.status(400).send(e)
    // })
});







module.exports = router