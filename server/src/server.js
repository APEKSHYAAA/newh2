const http = require('http');
const { parse } = require('url');
const bcrypt = require('bcrypt');
const db = require("./db/database");

const PORT = 8000;

// CORS middleware
const setCorsHeaders = (res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
};

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

// Helper function to send JSON response
const sendJsonResponse = (res, statusCode, data) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};

// Routes
const routes = {
  '/register': (req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      sendJsonResponse(res, 405, { error: 'Method Not Allowed' });
      return;
    }

    parseBody(req, (data) => {
      if (!data || !data.username || !data.password || !data.usertype) {
        sendJsonResponse(res, 400, { error: 'Username, password, and usertype are required.' });
        return;
      }

      const { username, password, usertype } = data;

      if (usertype !== 'owner' && usertype !== 'investor') {
        sendJsonResponse(res, 400, { error: 'Usertype must be either "owner" or "investor".' });
        return;
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          sendJsonResponse(res, 500, { error: 'Error hashing password.' });
          return;
        }

        db.run(
          `INSERT INTO users (username, password, usertype) VALUES (?, ?, ?)`,
          [username, hashedPassword, usertype],
          (err) => {
            if (err) {
              sendJsonResponse(res, 400, { error: 'Username already exists.' });
              return;
            }

            console.log("User registered successfully.");
            sendJsonResponse(res, 200, { message: 'User registered successfully', usertype });
          }
        );
      });
    });
  },

  '/login': (req, res) => {
    if (req.method === 'OPTIONS') {
      res.writeHead(200);
      res.end();
      return;
    }

    if (req.method !== 'POST') {
      sendJsonResponse(res, 405, { error: 'Method Not Allowed' });
      return;
    }

    parseBody(req, (data) => {
      if (!data || !data.username || !data.password) {
        sendJsonResponse(res, 400, { error: 'Username and password are required.' });
        return;
      }

      const { username, password } = data;

      db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err || !user) {
          sendJsonResponse(res, 401, { error: 'Invalid username or password.' });
          return;
        }

        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            sendJsonResponse(res, 500, { error: 'Error logging in.' });
            return;
          }

          if (isValid) {
            sendJsonResponse(res, 200, {
              message: 'Login successful!',
              usertype: user.usertype,
            });
          } else {
            sendJsonResponse(res, 401, { error: 'Invalid username or password.' });
          }
        });
      });
    });
  },

  '/': (req, res) => {
    sendJsonResponse(res, 200, { message: 'Welcome to the User Management System' });
  },
};

// HTTP server
const server = http.createServer((req, res) => {
  setCorsHeaders(res);

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const parsedUrl = parse(req.url, true);
  const route = routes[parsedUrl.pathname];

  if (route) {
    route(req, res);
  } else {
    sendJsonResponse(res, 404, { error: 'Not Found' });
  }
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});