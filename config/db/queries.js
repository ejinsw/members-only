const pool = require('./pool')

async function getMessages() {
    try {
        const messages = await pool.query(`
                                        SELECT 
                                            messages.id AS messageid,
                                            messages.content,
                                            users.id AS userid,
                                            users.username,
                                            users.first_name,
                                            users.last_name
                                        FROM 
                                            messages
                                        JOIN 
                                            users 
                                        ON 
                                            messages.user_id = users.id`
        )

        return messages.rows
    } catch (err) {
        throw err
    }
}

async function addMessage(user, message) {
    await pool.query('INSERT INTO messages (user_id, content) VALUES ($1, $2);', [user, message])
}

async function removeMessage(id) {
    await pool.query('DELETE FROM messages WHERE id = $1;', [id])
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

async function validateMembership(id) {
    await pool.query('UPDATE users SET membership_active = true WHERE id = $1', [id])
}

module.exports = {
    getUser,
    addUser,
    getMessages,
    validateMembership,
    addMessage,
    removeMessage
}