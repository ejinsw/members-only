const pool = require('./pool')

function initializeDB() {
    pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255),
        last_name VARCHAR(255),
        membership_active BOOLEAN
    );

    CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        user_id INT,
        content TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    `)
}

initializeDB()