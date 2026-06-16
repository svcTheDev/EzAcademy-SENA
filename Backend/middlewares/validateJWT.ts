import jsonwebtoken from "jsonwebtoken";

export const validateJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      message: "no hay token",
    });
  }

  try {
    const { id, name, email } = jsonwebtoken.verify(
      token,
      process.env.JWT_SECRET,
    );
    req.uid = id;
    req.name = name;
    req.email = email;

    next();
  } catch {
    return res.status(401).json({
      message: "token no válido",
    });
  }
};
