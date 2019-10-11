const mongoose = require('mongoose');

const stadiumSchema = new mongoose.Schema({
    name: String,
    location:String,
    stadiumImage:String,
    stadiumMapLocation:String

    
});

const stadiumModel = mongoose.model('stadium', stadiumSchema);

module.exports = stadiumModel;