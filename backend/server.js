import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"
// const path = require("path");
import path from "path";
dotenv.config();

connectDB();

const app = express();

app.use(express.json());

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/review", reviewRoutes);
app.use("/api/v1/chat", chatRoutes);

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to Advertisement app</h1>");
// });

// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running Successfully");
  });
}

// --------------------------deployment------------------------------

const port = process.env.PORT || 4000;

app.listen(port, console.log("server started in port 4000"));
//test git comment
//test
//t