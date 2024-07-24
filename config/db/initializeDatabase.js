// populateDB.js

require('dotenv').config();
const Knex = require('knex');

// Initialize Knex with your database configuration
const knex = Knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
        port: process.env.DATABASE_PORT || 5432,
    },
});

async function setupDatabase() {
    try {
        console.log("Creating tables...");

        const hasUsers = await knex.schema.hasTable('users');

        if (!hasUsers) {
            // Create users table
            await knex.schema.createTableIfNotExists('users', (table) => {
                table.increments('id').primary();
                table.string('username').notNullable();
                table.string('password').notNullable();
                table.string('first_name');
                table.string('last_name');
                table.boolean('membership_active');
            });

            // Insert initial data into users table
            await knex('users').insert([
                { username: 'admin', password: 'password', first_name: 'Admin', last_name: 'User', membership_active: true },
                { username: 'johndoe', password: 'password', first_name: 'John', last_name: 'Doe', membership_active: false }
            ]);
        }

        const hasMessages = await knex.schema.hasTable('messages');

        if (!hasMessages) {
            // Create messages table
            await knex.schema.createTableIfNotExists('messages', (table) => {
                table.increments('id').primary();
                table.integer('user_id').references('id').inTable('users');
                table.text('content');
            });

            // Optionally insert initial data into messages table
            await knex('messages').insert([
                { user_id: 1, content: 'Welcome to the system!' },
                { user_id: 2, content: 'Hello world!' }
            ]);
        }
        
        console.log("Done.");
    } catch (err) {
        console.error("Error setting up database:", err);
    } finally {
        // Close the database connection
        await knex.destroy();
    }
}

// Run the setup function
setupDatabase();