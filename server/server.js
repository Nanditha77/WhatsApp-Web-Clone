const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

dotenv.config();

const app = express();
app.use(express.json());


app.use(cors({
  origin: 'https://whatsapp-web-clone-wheat.vercel.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.get("/ping", (requ, resp) => {
  resp.status(200).send("OK");
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'https://whatsapp-web-clone-wheat.vercel.app', 
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
});

module.exports = io;

const messageRoutes = require('./routes/messageRoutes');
app.use('/api/messages', messageRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const URI = process.env.MONGO_URI;

mongoose.connect(URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4
})
.then(() => {
  console.log("MongoDB connected");
})
.catch(error => {
  console.log(error);
});

