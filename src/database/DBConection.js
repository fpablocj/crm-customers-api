const mongoose = require("mongoose")

const uri = "mongodb+srv://pablofc00:pCD7XECO906c1or9@curso-mongodb.hrysd.mongodb.net/crm-clientes";

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