import { pool } from "../config/database";

interface Member {
  full_name: string;
  email: string;
  phone?: string;
  company_name?: string;
  business_area?: string;
}

export class MembersRepository {
  async create(data: Member) {
    const { full_name, email, phone, company_name, business_area } = data;
    const result = await pool.query(
      `INSERT INTO members (full_name, email, phone, company_name, business_area)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [full_name, email, phone, company_name, business_area]
    );
    return result.rows[0];
  }

  async list() {
    const result = await pool.query(
      `SELECT * FROM members ORDER BY joined_at DESC`
    );
    return result.rows;
  }

  async findByEmail(email: string) {
    const result = await pool.query(`SELECT * FROM members WHERE email = $1`, [
      email,
    ]);
    return result.rows[0];
  }
}
