import { NextResponse } from "next/server";
import pool from "../../../server/database/iencli"; // Assurez-vous que votre pool MySQL est bien configuré

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email ou mot de passe manquant." }, { status: 400 });
    }

    // Vérifier si l'email existe déjà
    const [existing] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if ((existing as any[]).length > 0) {
      return NextResponse.json({ message: "Un compte existe déjà avec cet e-mail." }, { status: 409 });
    }

    // 👉 Enregistrer directement le mot de passe en clair
    await pool.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, password]
    );

    return NextResponse.json({ message: "Inscription réussie." }, { status: 201 });
  } catch (err) {
    console.error("Erreur inscription:", err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
