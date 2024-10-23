const { db } = require('../DB/database');

const Transaction = {
    create: (type, category, amount, date, description, callback) => {
        const query = `
            INSERT INTO transactions (type, category, amount, date, description) 
            VALUES (?, ?, ?, ?, ?)
        `;
        db.run(query, [type, category, amount, date, description], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID });
        });
    },

    findAll: (callback) => {
        db.all('SELECT * FROM transactions', [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM transactions WHERE id = ?';
        db.get(query, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    update: (id, type, category, amount, date, description, callback) => {
        const query = `
            UPDATE transactions 
            SET type = ?, category = ?, amount = ?, date = ?, description = ? 
            WHERE id = ?
        `;
        db.run(query, [type, category, amount, date, description, id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { updatedID: id });
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM transactions WHERE id = ?';
        db.run(query, [id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { deletedID: id });
        });
    },

    getSummary: (callback) => {
        db.all('SELECT * FROM transactions', [], (err, rows) => {
            if (err) {
                return callback(err);
            }

            const summary = {
                totalIncome: 0,
                totalExpenses: 0,
                balance: 0
            };

            rows.forEach(row => {
                if (row.type === 'income') {
                    summary.totalIncome += row.amount;
                } else if (row.type === 'expense') {
                    summary.totalExpenses += row.amount;
                }
            });

            summary.balance = summary.totalIncome - summary.totalExpenses;
            callback(null, summary);
        });
    }
};

module.exports = Transaction;
