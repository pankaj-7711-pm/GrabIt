import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import reviewRoutes from "./routes/reviewRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"

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

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Advertisement app</h1>");
});

const port = process.env.PORT || 4000;

app.listen(port, console.log("server started in port 4000"));
//test git comment
//test
//t