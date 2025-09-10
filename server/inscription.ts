// server/inscription.js
import express from "express";
import  pool  from "../server/database/iencli"; // vérifiez bien l’extension .js si vous êtes en ES modules

const router = express.Router();

router.post("/inscription", async (req, res) => {
  const { email, password } = req.body;

  // Validation simplifiée
  if (!email || !password) {
    return res.status(400).json({ message: "Email ou mot de passe manquant." });
  }

  try {
    // Vérifier si l’e-mail existe déjà
   const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);

if ((rows as any[]).length > 0) {
  return res.status(409).json({ message: "Un compte existe déjà avec cet e-mail." });
}

    // 👉 Ici, insertion sans hashage
    await pool.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, password]
    );

    return res.status(201).json({ message: "Inscription réussie." });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
});

export default router;
