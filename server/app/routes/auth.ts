import { Router, Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService";

const router = Router();

// Inscription
router.post("/register", async (req: Request, res: Response) => {
  const { email, password, displayName } = req.body;
  try {
    await registerUser(email, password, displayName);
    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'inscription" });
  }
});

// Connexion
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await loginUser(email, password);
    if (!result.success) {
      return res.status(401).json(result);
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

export default router;
