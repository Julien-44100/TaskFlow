import { Router } from "express";

const router = Router();

// Exemples de routes API (laissez au moins /api/ping pour tester)
router.get("/api/ping", (_req, res) => res.json({ pong: true }));

export default router; // ⬅️ export PAR DÉFAUT
