const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3006;


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'shoes',
    connectionLimit: 10
});


app.post('/checkout', (req, res) => {
   
    const sql = 'INSERT INTO payments (name, phone, address, card_number, expiry_month, expiry_year, cvv) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const { name, phone, address, card_number, expiry_month, expiry_year, cvv } = req.body;

    pool.query(sql, [name, phone, address, card_number, expiry_month, expiry_year, cvv], (err, result) => {
        if (err) {
            console.error('Error executing SQL:', err);
            return res.status(500).json({ error: 'An error occurred while processing your payment.' });
        }
        
        return res.status(200).json({ message: 'Payment successful!' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
