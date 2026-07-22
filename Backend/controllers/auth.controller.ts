import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt.js";
import express, { NextFunction } from "express";
import { CustomError } from "../middlewares/customError.js";
import user from "../models/user.js";

export const createUser = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      throw new CustomError("El correo ya está registrado", 400);
    }

    const newUser = new user({ name, email, password, role: "student" });

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);

    const savedUser = await newUser.save();

    const token = await generateToken(newUser);

    const userJson = savedUser.toJSON();
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user: userJson, token });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      throw new CustomError("Credenciales incorrectas (Email)", 400);
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      throw new CustomError("Credenciales incorrectas (Password)", 400);
    }

    const token = await generateToken(existingUser);

    res.json({
      message: "Inicio de sesión exitoso",
      user: existingUser,
      token,
    });
  } catch (error) {
    next(error);
  }
};

export const validateToken = async (req, res) => {
  const { uid, name, email, role } = req; // O la forma en que guardes los datos en la request tras el validateJWT

  // Opcional: Generar un nuevo JWT si quieres renovarlo
  // const token = await generateJWT(uid, name, role);

  return res.status(200).json({
    ok: true,
    token: req.token || req.header("x-token"), // O el nuevo token generado
    user: {
      uid,
      name,
      email,
      role,
    },
  });
};
