const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'your_password', // Update with your MySQL password
    database: 'your_database_name', // Update with your database name
    connectionLimit: 10
});
app.post('/checkout', (req, res) => {
    const { name, phone, address, card_number, expiry_month, expiry_year, cvv } = req.body;

    // Insert data into MySQL database
    pool.query('INSERT INTO payments (name, phone, address, card_number, expiry_month, expiry_year, cvv) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, phone, address, card_number, expiry_month, expiry_year, cvv],
        (error, results, fields) => {
            if (error) {
                console.error('Error inserting data into MySQL:', error);
                res.status(500).json({ message: 'An error occurred while processing your payment.' });
            } else {
                res.status(200).json({ message: 'Payment successful!' });
            }
        });
});
