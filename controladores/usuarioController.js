import Usuario from "../modelos/Usuarios.js";
import bcrypt from "bcryptjs";

// 📌 Registro de usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // Verificar si ya existe
    const existeUsuario = await Usuario.findOne({ email });
    if (existeUsuario) {
      return res.status(400).json({ msg: "El usuario ya está registrado" });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();

    res.status(201).json({ msg: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error("❌ Error al registrar usuario:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

// 📌 Login de usuario
export const loginUsuario = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: "Usuario no encontrado" });

    // Validar contraseña
    const esValida = await bcrypt.compare(password, usuario.password);
    if (!esValida) return res.status(400).json({ msg: "Contraseña incorrecta" });

    res.status(200).json({ msg: "Login exitoso", usuario });
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

export const listarUsuarios = async (req, res) => {
  try {

    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 0;  

    const query = {};       
    const skip  = (page - 1) * limit;

    const usuarios = await Usuario
      .find(query)
      .select("-password")   
      .skip(skip)
      .limit(limit);

    const total = await Usuario.countDocuments(query);

    res.status(200).json({
      page,
      limit: limit || total,
      total,
      usuarios,
    });
  } catch (error) {
    console.error("❌ Error al listar usuarios:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};
