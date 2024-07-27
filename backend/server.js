require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const io = require('./socket/socket.js');

const app = express();
const server = http.createServer(app);

connectDB();

app.use(express.json());
app.use(cors());

app.use('/', authRoutes);

io.attach(server);

server.listen(5001, () => {
    console.log('Server running on port 5001');
});
