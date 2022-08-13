import express from "express";
import dotenv from "dotenv";
import { hello } from "./src/hello";

dotenv.config();

const PORT = process.env.PORT || 5050;
const app = express();

app.get("/ping", (_req, res) => {
  res.send(hello());
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
