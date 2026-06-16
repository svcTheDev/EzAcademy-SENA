import jsonwebtoken from "jsonwebtoken";
import { ENV } from "../config/env.js";

export interface UserToken {
  uid?: string;
  name?: string;
  email?: string;
  password?: string;
}


export const generateToken = (user: UserToken) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid: user.uid,
      name: user.name,
      email: user.email,
    };

    const token = jsonwebtoken.sign(
      payload,
      ENV.JWT_SECRET,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("Error al generar el token");
        } else {
          resolve(token);
        }
      },
    );
  });
};
