require('dotenv').config()
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash-message').default;

const app = express();
const port = process.env.PORT || 3000;

// Database connection
const postgres = require('postgres');
const { getFlashMessages } = require('express-flash-message');
let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const sql = postgres({
    host: PGHOST,
    database: PGDATABASE,
    username: PGUSER,
    password: PGPASSWORD,
    port: 5432,
    ssl: 'require',
    connection: {
        options: `project=${ENDPOINT_ID}`,
    },
});


// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        },
    })
);
app.use(flash({ sessionKeyName: 'express-flash-message' }));

// Routes
app.get('/', async (req, res) => {
    const messages = await sql`select * from messages order by timestamp desc`;
    const flashMessages = getFlashMessages(req, 'express-flash-message', 'success');
    res.render('index', { messages, flashMessages });
});

app.post('/', async (req, res) => {
    const { name, message } = req.body;
    await sql`insert into messages (name, message, timestamp) values (${name}, ${message}, now())`;
    res.flash('success', 'Your message has been posted!');
    res.redirect('/');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
