import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import { requireSignIn } from "./middleware/authMiddleware.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

//middelwares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

//DB config
connectDB();

//route
app.use("/api/v1/auth", authRoutes);
//get route


app.get("/", (req, res) => {
  res.send({
    meassage: "hello joson",
  });
});

app.listen(port, () => {
  console.log(`server is running at  ${port}`.bgCyan.white);
});
