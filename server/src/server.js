const http = require('http');
const { parse } = require('url');
const bcrypt = require('bcrypt');
const db = require("./db/database");
require('dotenv').config();

const PORT = process.env.PORT || 8000;

// Parse JSON body of incoming requests
const parseBody = (req, callback) => {
  let body = '';
  req.on('data', (chunk) => (body += chunk.toString()));
  req.on('end', () => {
    try {
      callback(JSON.parse(body));
    } catch (error) {
      callback(null);
    }
  });
};

// Routes
const routes = {
  '/register': (req, res) => {
    if (req.method !== 'POST') {
      res.writeHead(405);
      res.end('Method Not Allowed');
      return;
    }

    parseBody(req, (data) => {
      if (!data || !data.username || !data.password || !data.usertype) {
        res.writeHead(400);
        res.end('Username, password, and usertype are required.');
        return;
      }

      const { username, password, usertype } = data;

      if (usertype !== 'owner' && usertype !== 'investor') {
        res.writeHead(400);
        res.end('Usertype must be either "owner" or "investor".');
        return;
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          res.writeHead(500);
          res.end('Error hashing password.');
          return;
        }

        db.run(
          `INSERT INTO users (username, password, usertype) VALUES (?, ?, ?)`,
          [username, hashedPassword, usertype],
          (err) => {
            if (err) {
              res.writeHead(400);
              res.end('Username already exists.');
              return;
            }
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'User registered successfully.' }));
          }
        );
      });
    });
  },

  '/login': (req, res) => {
    if (req.method !== 'POST') {
      res.writeHead(405);
      res.end('Method Not Allowed');
      return;
    }

    parseBody(req, (data) => {
      if (!data || !data.username || !data.password) {
        res.writeHead(400);
        res.end('Username and password are required.');
        return;
      }

      const { username, password } = data;

      db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err || !user) {
          res.writeHead(401);
          res.end('Invalid username or password.');
          return;
        }

        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            res.writeHead(500);
            res.end('Error logging in.');
            return;
          }

          if (isValid) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(
              JSON.stringify({
                message: 'Login successful!',
                usertype: user.usertype,
              })
            );
          } else {
            res.writeHead(401);
            res.end('Invalid username or password.');
          }
        });
      });
    });
  },

  '/': (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to the User Management System');
  },
};

// HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = parse(req.url, true);
  const route = routes[parsedUrl.pathname];

  if (route) {
    route(req, res);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
