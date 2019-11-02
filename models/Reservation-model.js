const mongoose = require('mongoose');

const ReservaionSchema = new mongoose.Schema({
    users: [{ user:{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }}],
    stadium_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stadium', required: true }],
    time_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stadiumTimes', required: true }],
    player_number:Number,
    price:Number,
    pay:Boolean

    
    
});

const reservationModel = mongoose.model('reservation', ReservaionSchema);

module.exports = reservationModel;

comments: [{
    text: String,
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}]