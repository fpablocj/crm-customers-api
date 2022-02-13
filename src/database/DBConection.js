const mongoose = require("mongoose")

const uri = "mongodb://127.0.0.1:27017/crm-clientes";

const DBConection = async()=>{
    try {
        await mongoose.connect(uri)
        console.log('DB is conected');
    } catch (error) {
        console.log(error);
        throw new Error('Failed to initialize database');
    }
}
module.exports = DBConection;