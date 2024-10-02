import express from "express";
import "dotenv/config";
import user from "./routes/userRoutes.js";
import post from "./routes/postRoutes.js";
import comment from "./routes/commentRoutes.js";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/v1", user);
app.use("/api/v1", post);
app.use("/api/v1", comment);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("*", (req, res) => {
  res.send("404 page not found");
});
