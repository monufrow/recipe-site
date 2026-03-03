const express = require('express');
const router = express.Router();
const db = require('../database');   // adjust if your db path differs

router.get('/', (req, res) => {

    const sql = `
        SELECT protein_type, COUNT(*) AS count
        FROM recipes
        GROUP BY protein_type
        ORDER BY protein_type
    `;

    db.query(sql, (err, results) => {
        if (err) throw err;

        res.render('pages/home', {
            proteinSummary: results
        });
    });
});

module.exports = router;