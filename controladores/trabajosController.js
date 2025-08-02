import Trabajos from "../modelos/Trabajos.js";

// 📌 Registro de trabajos
export const registrarTrabajo = async (req, res) => {
  try {
    const { nombre, descripcion, horario, remuneracion, modalidad } = req.body;


    const nuevoTrabajo = new Trabajos({ nombre, descripcion, horario, horario, remuneracion, modalidad });
    await nuevoTrabajo.save();

    res.status(201).json({ msg: "Trabajo registrado exitosamente" });
  } catch (error) {
    console.error("❌ Error al registrar trabajo:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// 📌 Listar todos los trabajos
export const listarTrabajos = async (req, res) => {
  try {
    const trabajos = await Trabajos.find(); // Trae todos los registros
    res.status(200).json(trabajos);
  } catch (error) {
    console.error("❌ Error al listar trabajos:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const actualizarTrabajo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, horario, remuneracion, modalidad } = req.body;

    const trabajoActualizado = await Trabajos.findByIdAndUpdate(
      id,
      { nombre, descripcion, horario, remuneracion, modalidad },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!trabajoActualizado) {
      return res.status(404).json({ msg: "Trabajo no encontrado" });
    }

    res
      .status(200)
      .json({ msg: "Trabajo actualizado correctamente", trabajoActualizado });
  } catch (error) {
    console.error("❌ Error al actualizar trabajo:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const anularTrabajo = async (req, res) => {
  try {
    const { id } = req.params;

    const trabajoEliminado = await Trabajos.findByIdAndDelete(id);

    if (!trabajoEliminado) {
      return res.status(404).json({ msg: "Trabajo no encontrado" });
    }

    res.status(200).json({ msg: "Trabajo anulado correctamente" });
  } catch (error) {
    console.error("❌ Error al anular trabajo:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

