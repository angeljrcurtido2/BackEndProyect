import express from "express";
import {registrarUsuario, loginUsuario, listarUsuarios} from "../controladores/usuarioController.js";

const router = express.Router();

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/",  listarUsuarios);


export default router;
