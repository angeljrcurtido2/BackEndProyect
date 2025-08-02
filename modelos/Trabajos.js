import mongoose from "mongoose";

const trabajosSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    descripcion: {
      type: String,
    },
    horario: {
      type: String,
    },
    remuneracion: {
      type: Number,
    },
    modalidad:{type:String}
  },
  { timestamps: true } 
);

export default mongoose.model("Trabajos", trabajosSchema);
