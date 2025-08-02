import express from 'express';
import { actualizarTrabajo, listarTrabajos, registrarTrabajo, anularTrabajo } from '../controladores/trabajosController.js';

const router = express.Router();

router.get("/listarTrabajos", listarTrabajos);
router.post("/crearTrabajos", registrarTrabajo);
router.put("/editarTrabajo/:id", actualizarTrabajo);
router.delete("/:id", anularTrabajo);

export default router;
