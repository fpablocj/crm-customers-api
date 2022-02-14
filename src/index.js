const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const config = require("./config")

const DBConection = require("./database/DBConection");

const productRoutes = require("./routes/product.routes.js")
const customerRoutes = require("./routes/customer.routes.js")

async function startExpressServer(params){
    const app = express();
    const baseURL = "/api/v1"

    app.use(morgan("dev"));
    app.use(cors());
    app.use(express.json());

    app.use(`${baseURL}/product`, productRoutes);
    app.use(`${baseURL}/customer`, customerRoutes);

    app.get('/', (request, response)=>{
        response.json({message:"Hola desde el server jeje xd"})
    });

    await DBConection();
    const PORT = 4000


    app.listen(config.port, ()=>{
        console.log(`Server listo en http://localhost:${PORT}`);
    });
}
startExpressServer()