import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const {email} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    const newUser = new User(req.body);

    const savedUser = await newUser.save();

    res.status(201).json({ message: "Usuario creado exitosamente", user: savedUser });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  res.json({ email, password });
};

export const validateToken = async (req, res) => {
  try {
    res.json({ message: "Token válido" });
  } catch (error) {
    res.status(500).json({
      message: "Error al validar el token",
    });
  }
};
