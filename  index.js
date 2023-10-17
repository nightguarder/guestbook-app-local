const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change to your MySQL username
    password: '', // Change to your MySQL password
    database: 'guestbook'
});

connection.connect(error => {
    if (error) throw error;
    console.log('Database connected!');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    connection.query('SELECT * FROM messages ORDER BY timestamp DESC', (error, results) => {
        if (error) throw error;

        let messages = results.map(result => {
            return {
                name: result.name,
                message: result.message,
                timestamp: result.timestamp
            };
        });

        let html = '<form method="post" action="/"><input type="text" name="name" placeholder="Your Name" required/><br/><textarea name="message" placeholder="Your Message" required></textarea><br/><input type="submit" value="Post Message"/></form>';
        html += '<ul>';

        messages.forEach(message => {
            html += `<li><strong>${message.name}</strong>: ${message.message} <em>at ${message.timestamp}</em></li>`;
        });

        html += '</ul>';

        res.send(html);
    });
});

app.post('/', (req, res) => {
    const { name, message } = req.body;
    const query = 'INSERT INTO messages (name, message) VALUES (?, ?)';
    connection.query(query, [name, message], (error, result) => {
        if (error) throw error;
        res.redirect('/');
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
