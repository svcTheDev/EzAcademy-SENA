import jsonwebtoken from "jsonwebtoken";
import { ENV } from "../config/env.js";

export interface UserToken {
  uid?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string
}


export const generateToken = (user: UserToken | any) => {
  return new Promise((resolve, reject) => {

    const payload = {
      uid: user.uid || user.id || user._id?.toString(),
      name: user.name,
      email: user.email ?? "",
      role: user.role
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
