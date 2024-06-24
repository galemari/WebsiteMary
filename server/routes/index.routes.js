//Las dos primeras lineas son la importacion de express router y
/* y la ultima linea debe corresponder a export default router */
import express from "express";
import rutasRegistro from "./registro.routes.js";
import rutasLogin from "./login.routes.js";
import rutasAdmin from "./userAdmin.routes.js";
import rutasTudent from "./userStudent.routes.js";

const router = express.Router();
//rutas siempre llevan dos parametros
router.use("/registro",rutasRegistro);
router.use("/login",rutasLogin);
router.use("/admin",rutasAdmin);
router.use("/student",rutasTudent);

export default router;