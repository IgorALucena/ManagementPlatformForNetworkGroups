import { pool } from "../config/database";

interface Invite {
  intention_id: string;
  token: string;
}

export class InvitesRepository {
  async create({ intention_id, token }: Invite) {
    const result = await pool.query(
      `INSERT INTO invites (intention_id, token) VALUES ($1, $2) RETURNING *`,
      [intention_id, token]
    );
    return result.rows[0];
  }

  async findByToken(token: string) {
    const result = await pool.query(`SELECT * FROM invites WHERE token = $1`, [
      token,
    ]);
    return result.rows[0];
  }

  async markUsed(token: string) {
    await pool.query(`UPDATE invites SET used = true WHERE token = $1`, [
      token,
    ]);
  }
}
