import databaseClient, { Rows } from "../../../database/client.js";

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
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, email, display_name, avatar_url, is_active, created_at, updated_at FROM users"
    );
    return rows as User[];
  }

  async read(id: number): Promise<User | null> {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT id, email, display_name, avatar_url, is_active, created_at, updated_at FROM users WHERE id = ?",
      [id]
    );
    return rows.length ? (rows[0] as User) : null;
  }
}

export default new UserRepository();
