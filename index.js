import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import usuarioRoutes from "./rutas/usuarioRoutes.js";
import trabajoRoutes from "./rutas/trabajoRoutes.js";

dotenv.config(); // Carga las variables de .env

const app = express();
const PORT = process.env.PORT;

// 🔹 Habilitar JSON
app.use(express.json());

// 🔹 Habilitar CORS para todos
app.use(cors({
  origin: "*",        // Permite todos los orígenes
  methods: ["GET","POST","PUT","DELETE"], // Métodos permitidos
}));

// 🔹 Conectar a MongoDB
connectDB();

// 🔹 Rutas
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/trabajos", trabajoRoutes);

// 🔹 Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
