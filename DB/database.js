const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

// Initialize database
const dbPath = path.resolve(__dirname, 'financial_records.db');
const db = new sqlite3.Database(dbPath);

// Setup database and insert sample data
const setupDatabase = () => {
    db.serialize(() => {
        // Create transactions table
        db.run(`
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                type TEXT NOT NULL, 
                category TEXT NOT NULL,
                amount REAL NOT NULL,
                date TEXT NOT NULL,
                description TEXT
            );
        `);

        // Create categories table
        db.run(`
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                type TEXT NOT NULL
            );
        `);

        // Insert sample data into categories
        db.run(`INSERT INTO categories (name, type) VALUES ('Groceries', 'expense'), ('Salary', 'income'), ('Entertainment', 'expense');`);

        // Insert sample data into transactions
        db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES ('expense', 'Groceries', 50.75, '2024-10-01', 'Weekly groceries');`);
        db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES ('income', 'Salary', 1500.00, '2024-10-05', 'Monthly salary');`);
        db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES ('expense', 'Entertainment', 30.00, '2024-10-10', 'Movie night');`);
    });
};

// Export the database and setup function
module.exports = { db, setupDatabase };
