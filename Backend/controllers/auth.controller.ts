import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../helpers/jwt.js";
import express from "express";

export const createUser = async (req : express.Request, res : express.Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const newUser = new User(req.body);

    const token = await generateToken(newUser);

    const salt = bcrypt.genSaltSync(10);
    newUser.password = bcrypt.hashSync(password, salt);

    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "Usuario creado exitosamente", user: savedUser, token });
  } catch (error: string | any) {
    res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

export const loginUser = async (req : express.Request, res : express.Response) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "El email no está registrado" });
    }

    const token = await generateToken(existingUser);

    console.log(existingUser);
    console.log(token);
    await bcrypt.compare(password, existingUser.password, (err, isMatch) => {
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      } else {
        res.json({
          message: "Inicio de sesión exitoso",
          user: existingUser,
          token,
        });
      }
    });
  } catch (error : string | any) {
    res.status(500).json({
      message: "Error al iniciar sesión",
      error: error.message,
    });
  }
};

export const validateToken = async (req : express.Request, res : express.Response) => {
  const { uid, name } = req;

  const token = await generateToken({ uid, name });
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
