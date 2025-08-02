import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true } // Agrega createdAt y updatedAt
);

export default mongoose.model("Usuario", usuarioSchema);
