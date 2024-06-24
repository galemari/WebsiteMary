import express from "express";
import rutas from "./routes/index.routes.js";
const app = express();
const PORT = process.env.PORT || 3000;
//recibir datos de la base de datos
app.use(express.urlencoded({
    extended:true
}));
//traduce json a formato objeto 
app.use(express.json());
//realización de CRUD
//creacion de ruta
app.use("/api",rutas)












app.listen(PORT,()=>{
    console.log(`Servidor levantado en el puerto ${PORT}`);
});

