import client, { Rows, Result } from "../../../database/client";

export interface User {
  id: number;
  email: string;
  display_name: string | null;
  avatar_url: string | null;
  is_active: 0 | 1;
  created_at: string;
  updated_at: string;
}

class UserRepository {
  async readAll(): Promise<User[]> {
    const [rows] = await client.query<Rows>(
      `SELECT id, email, display_name, avatar_url, is_active, created_at, updated_at
       FROM users ORDER BY created_at DESC`
    );
    return rows as User[];
  }

  async read(id: number): Promise<User | null> {
    const [rows] = await client.query<Rows>(
      `SELECT id, email, display_name, avatar_url, is_active, created_at, updated_at
       FROM users WHERE id = :id LIMIT 1`,
      { id }
    );
    return (rows[0] as User) ?? null;
  }

  async create(email: string, passwordHash: string, displayName?: string | null) {
    const [r] = await client.query<Result>(
      `INSERT INTO users (email, password_hash, display_name, is_active)
       VALUES (:email, :password_hash, :display_name, 1)`,
      { email, password_hash: passwordHash, display_name: displayName ?? null }
    );
    return (r as Result).insertId;
  }

  async update(id: number, displayName?: string | null, avatarUrl?: string | null) {
    await client.query<Result>(
      `UPDATE users
       SET display_name = :display_name, avatar_url = :avatar_url, updated_at = NOW()
       WHERE id = :id`,
      { id, display_name: displayName ?? null, avatar_url: avatarUrl ?? null }
    );
  }

  async delete(id: number) {
    await client.query<Result>(`DELETE FROM users WHERE id = :id`, { id });
  }
}

export default new UserRepository();
