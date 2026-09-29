import express from "express";
import { errorHandler } from "./middlewares/errorHandler.js";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
const app = express();

// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN,
//     //credentials: true,
//   }),
// );


app.use(
  cors({
    origin:process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); //use for store files in server
app.use("/api/tasks", taskRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(errorHandler);

export { app };
