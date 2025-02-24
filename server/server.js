require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const pool = require('./db'); // Ensure this is your database connection file
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true, // Allow cookies to be sent/received
}));
app.use(express.json());

// Signup Route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (email, hashed_password) VALUES ($1, $2) RETURNING *',
      [email, hashedPassword]
    );

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('AuthToken', token, {
      httpOnly: true,
      secure: false, // Set to true in production with HTTPS
      sameSite: 'Lax',
    });

    res.status(201).json({ email: newUser.rows[0].email });
  } catch (err) {
    console.error(err);

    if (err.code === '23505') { // Unique constraint violation
      res.status(400).json({ detail: 'Email already registered' });
    } else {
      res.status(500).json({ detail: 'Registration failed' });
    }
  }
});
// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rows.length === 0) {
      return res.status(401).json({ detail: 'Invalid email or password' });
    }

    const validPassword = bcrypt.compareSync(password, user.rows[0].hashed_password);

    if (!validPassword) {
      return res.status(401).json({ detail: 'Invalid email or password' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('AuthToken', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'Lax',
    });

    res.json({ email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ detail: 'Login failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));