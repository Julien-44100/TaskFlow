import express from "express";
import cors from "cors";
import router from "../src/app/router.js";

export function createApp() {
  const app = express();

  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json());

  app.get("/health", (_, res) => res.json({ ok: true }));

  app.use("/api", router);

  return app;
}
