const pool = require('./pool')

async function getMessages() {
    try {
        const messages = await pool.query('SELECT * FROM messages;')

        return messages.rows
    } catch (err) {
        throw err
    }
}

async function getUser(username) {
    try {
        const user = await pool.query('SELECT * FROM users WHERE username = $1;', [username])

        return user.rows[0]
    } catch (err) {
        throw err
    }
}

async function addUser(username, password, first_name, last_name) {
    await pool.query('INSERT INTO users (username, password, first_name, last_name, membership_active) VALUES ($1, $2, $3, $4, $5);', [username, password, first_name, last_name, false])
}

module.exports = {
    getUser,
    addUser,
    getMessages
}