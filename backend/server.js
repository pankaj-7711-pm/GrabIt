import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Advertisement app</h1>");
});

const port = process.env.PORT || 4000;

app.listen(port, console.log("server started in port 4000"));