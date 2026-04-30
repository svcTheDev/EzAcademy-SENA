import express from "express";
import {connectDB} from "./database.js";
import courseRoutes from "./routes/course.routes.js";
const app = express();

import cors from "cors";

app.use(
  cors({
    origin: "http://localhost:8080",
  })
);

app.use("/courses", courseRoutes)
// app.use("/users", userRoutes)
// app.use("/enrollments", enrollmentRoutes)

function getProducts() {
  app.get("/", (req, res) => {
    res.send(`<div><h1>Productos</h1></div>`);
  });
}

async function startServer() {  
  try {
  await connectDB();
  app.listen(3000);
} catch (error) {
  process.exit();
}}

startServer();