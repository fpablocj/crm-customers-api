const mongoose = require("mongoose")

const config = require("../config");

const DBConection = async()=>{
    try {
        await mongoose.connect(config.mongoUri)
        console.log('DB is conected');
    } catch (error) {
        console.log(error);
        throw new Error('Failed to initialize database');
    }
}
module.exports = DBConection;