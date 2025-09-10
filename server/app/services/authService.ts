import argon2 from "argon2";
import databaseClient from "../../database/client";

export async function registerUser(email: string, password: string, displayName: string) {
  try {
    // 🔑 Hash du mot de passe avec Argon2
    const passwordHash = await argon2.hash(password);

    // Insertion dans la base
    const [result] = await databaseClient.query(
      "INSERT INTO users (email, password_hash, display_name, is_active, email_verified_at) VALUES (?, ?, ?, 1, NOW())",
      [email, passwordHash, displayName]
    );

    return result;
  } catch (error) {
    console.error("Erreur registerUser:", error);
    throw error;
  }
}

export async function loginUser(email: string, password: string) {
  try {
    // Chercher l’utilisateur par email
    const [rows] = await databaseClient.query(
      "SELECT id, email, password_hash FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    const users = rows as any[];
    if (users.length === 0) {
      return { success: false, message: "Utilisateur introuvable" };
    }

    const user = users[0];

    // Vérification du mot de passe
    const valid = await argon2.verify(user.password_hash, password);

    if (!valid) {
      return { success: false, message: "Mot de passe incorrect" };
    }

    return { success: true, message: "Connexion réussie", user };
  } catch (error) {
    console.error("Erreur loginUser:", error);
    throw error;
  }
}
