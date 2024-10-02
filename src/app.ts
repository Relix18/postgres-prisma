import express from "express";
import "dotenv/config";
import user from "./routes/userRoutes";

export const app = express();

app.use(express.json());

app.use("/api/v1", user);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("*", (req, res) => {
  res.send("404 page not found");
});
