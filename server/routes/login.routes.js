import express from "express";
const router = express.Router();
import { loginUser } from "../controllers/login.controller";
import { methods as authentication } from "../controllers/authentication.controller.js";


router.post('/', authentication.login);

router.post('/',authentication.register);

















export default router;