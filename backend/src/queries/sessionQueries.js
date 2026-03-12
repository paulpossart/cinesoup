import pool from '../config/db.js';

export const logoutAll = async (userId) => {
    await pool.query(
        `DELETE FROM cinesoup.session
         WHERE sess->'passport'->>'user' = $1`,
        [userId]
    );
};
