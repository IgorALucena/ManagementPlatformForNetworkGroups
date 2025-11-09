import { QueryResult } from "pg";
import { pool } from "../config/database";

export interface Intention {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  message?: string;
  status?: string;
  created_at?: Date;
}

export class IntentionsRepository {
  async create(data: Intention): Promise<Intention> {
    const { full_name, email, phone, message } = data;
    const result: QueryResult<Intention> = await pool.query(
      `INSERT INTO intentions (full_name, email, phone, message)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [full_name, email, phone, message]
    );
    return result.rows[0];
  }

  async findById(id: string): Promise<Intention | null> {
    const result: QueryResult<Intention> = await pool.query(
      `SELECT * FROM intentions WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async updateStatus(id: string, status: string): Promise<void> {
    await pool.query(`UPDATE intentions SET status = $1 WHERE id = $2`, [
      status,
      id,
    ]);
  }

  async list(): Promise<Intention[]> {
    const result: QueryResult<Intention> = await pool.query(
      `SELECT * FROM intentions ORDER BY created_at DESC`
    );
    return result.rows;
  }
}
