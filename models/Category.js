const { db } = require('../DB/database');

const Category = {
    create: (name, type, callback) => {
        const query = `
            INSERT INTO categories (name, type) 
            VALUES (?, ?)
        `;
        db.run(query, [name, type], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { id: this.lastID });
        });
    },

    findAll: (callback) => {
        db.all('SELECT * FROM categories', [], (err, rows) => {
            if (err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },

    findById: (id, callback) => {
        const query = 'SELECT * FROM categories WHERE id = ?';
        db.get(query, [id], (err, row) => {
            if (err) {
                return callback(err);
            }
            callback(null, row);
        });
    },

    update: (id, name, type, callback) => {
        const query = `
            UPDATE categories 
            SET name = ?, type = ?
            WHERE id = ?
        `;
        db.run(query, [name, type, id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { updatedID: id });
        });
    },

    delete: (id, callback) => {
        const query = 'DELETE FROM categories WHERE id = ?';
        db.run(query, [id], function (err) {
            if (err) {
                return callback(err);
            }
            callback(null, { deletedID: id });
        });
    }
};

module.exports = Category;
