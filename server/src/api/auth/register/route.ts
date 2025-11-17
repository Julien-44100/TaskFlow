import { NextResponse } from "next/server";
import pool from "../../../database/client";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Email ou mot de passe manquant." }, { status: 400 });
    }

    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if ((rows as any[]).length > 0) {
      return NextResponse.json({ message: "Un compte existe déjà avec cet e-mail." }, { status: 409 });
    }

    // ⚠️ mot de passe en clair stocké dans password_hash (pour vos tests)
    await pool.query(
      "INSERT INTO users (email, password_hash) VALUES (?, ?)",
      [email, password]
    );

    return NextResponse.json({ message: "Inscription réussie." }, { status: 201 });
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
