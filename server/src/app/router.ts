import { NextResponse } from "next/server";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST ?? "127.0.0.1",
  user: process.env.DB_USER ?? "root",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "taskflow",
  waitForConnections: true,
  connectionLimit: 10,
});

export async function POST(req: Request) {
  console.log("[API] /api/auth/register hit"); // trace
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Email ou mot de passe manquant." }, { status: 400 });
    }

    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if ((rows as any[]).length > 0) {
      return NextResponse.json({ message: "Un compte existe déjà avec cet e-mail." }, { status: 409 });
    }

    await pool.query("INSERT INTO users (email, password_hash) VALUES (?, ?)", [email, password]);
    return NextResponse.json({ message: "Inscription réussie." }, { status: 201 });
  } catch (e) {
    console.error("[API] register error:", e);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
