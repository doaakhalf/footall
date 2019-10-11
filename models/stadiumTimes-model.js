const mongoose = require('mongoose');

const stadiumTimesSchema = new mongoose.Schema({
    Start: Time,
    End:Time,
    Day:Date,
    price:Number,
    stadium_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stadium', required: true }]

    
    
});

const stadiumTimeModel = mongoose.model('stadiumTimes', stadiumTimesSchema);

module.exports = stadiumTimeModel;