const express = require('express');
const router = express.Router();
const { db } = require('../DB/database');

// GET /summary
router.get('/', (req, res) => {
    const summary = {
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
    };

    db.all('SELECT * FROM transactions', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        
        rows.forEach(row => {
            if (row.type === 'income') {
                summary.totalIncome += row.amount;
            } else if (row.type === 'expense') {
                summary.totalExpenses += row.amount;
            }
        });
        
        summary.balance = summary.totalIncome - summary.totalExpenses;
        res.json(summary);
    });
});

module.exports = router;
