import pool from '../config/db.js';

export const getMovieByUser = async (userId, movieId) => {
    const result = await pool.query(
        `SELECT movie_id FROM cinesoup.movies
         WHERE movie_id = $1 AND user_id = $2`,
        [movieId, userId]
    );

    return result.rows;
};

export const countMoviesByUser = async (userId) => {
    const result = await pool.query(
        `SELECT COUNT(*) FROM cinesoup.movies
         WHERE user_id = $1`,
        [userId]
    );

    return parseInt(result.rows[0].count);
};

export const insertMovieByUser = async (userId, movieId) => {
    return await pool.query(
        `INSERT INTO cinesoup.movies (user_id, movie_id)
             VALUES ($1, $2)`,
        [userId, movieId]
    );
};

export const getMovieListByUser = async (userId) => {
    return await pool.query(
        `SELECT movie_id FROM cinesoup.movies
         WHERE user_id = $1`,
        [userId]
    );
};

export const deleteMovieById = async (userId, movieId) => {
    const result = await pool.query(
        `DELETE FROM cinesoup.movies
         WHERE user_id = $1 AND movie_id = $2`,
        [userId, movieId]
    );
    return result.rowCount;
};
