

 //"mongodb+srv://root:root@ahmedelshall-cqaq5.mongodb.net/goodreads?retryWrites=true";const mongoose = require('mongoose');
//URL_mongo = process.env.MONGO_URL || 'mongodb://localhost:27017/portal';
const mongoose = require('mongoose');
// URL_mongo = process.env.MONGO_URL || 'mongodb://localhost:27017/PlayGroundFootball';
URL_mongo =
    process.env.MONGO_URL || "mongodb+srv://doaa:doaa@cluster0-qqvv3.mongodb.net/PlayGroundFootball?retryWrites=true"
////////////////////////////////////////////////////
mongoose.connect(URL_mongo, {
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    useNewUrlParser: true,
}, (err) => {
    if (!err) console.log(`started connection...`)
    else console.log(`error connection...`)
})
/////////////////////////////////////////////////////
