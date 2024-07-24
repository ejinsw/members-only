require('dotenv').config();
const { Pool } = require('pg')

module.exports = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: 5432
})