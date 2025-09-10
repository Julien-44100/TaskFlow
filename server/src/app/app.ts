import express from "express";
import cors from "cors";
import router from "../app/router.js";

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:3000", credentials: true }));
app.use(express.json());

app.use(router);

export default app;
