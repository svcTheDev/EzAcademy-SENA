import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt.js";
import express from "express";
import { CustomError } from "../middlewares/customError.js";

export const createUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { name, email, password, role} = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new CustomError("El correo ya está registrado", 400);
    }

    const newUser = new User({ name, email, password, role});

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);

    const savedUser = await newUser.save();

    const token = await generateToken(newUser);

    const userJson = savedUser.toJSON();
    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user: userJson, token });
  } catch (error: string | any) {
    res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

export const loginUser = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

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
  } catch (error: string | any) {
    res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

export const validateToken = async (
  req: express.Request,
  res: express.Response,
) => {
  const { uid, name, email } = req;

  const token = await generateToken({ uid, name, email });
  try {
    res.json({
      token,
      message: "Token válido",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al validar el token",
    });
  }
};

