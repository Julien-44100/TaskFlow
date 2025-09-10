import express from "express";
import cors from "cors";
import router from "./router"; // ⬅️ import par DÉFAUT (plus { router })

export default function createApp() {
  const app = express();

  app.use(cors({ origin: process.env.CLIENT_URL ?? "http://localhost:3000", credentials: true }));
  app.use(express.json());

  // Healthcheck
  app.get("/health", (_req, res) => res.json({ ok: true }));

  // Routes API
  app.use(router);

  return app;
}
