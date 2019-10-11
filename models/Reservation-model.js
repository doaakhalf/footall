const mongoose = require('mongoose');

const ReservaionSchema = new mongoose.Schema({
    user_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stadium', required: true }],
    stadium_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stadium', required: true }],
    time_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'stadium', required: true }],
    player_number:Number,
    price:Number,
    pay:Boolean

    
    
});

const reservationModel = mongoose.model('reservation', ReservaionSchema);

module.exports = reservationModel;