import express from "express";
const router = express.Router();
import { crearUsuario } from "../controllers/registro.controller.js";
import {getUsers} from "../controllers/registro.controller.js";
import {updateUser} from "../controllers/registro.controller.js";
import { removeUser } from "../controllers/registro.controller.js";
//CRUD

// Create
router.post('/',crearUsuario.register);

// Read
router.get('/', getUsers );

// Update

router.put('/', updateUser);

// Delete

router.delete('/',removeUser);






export default router;