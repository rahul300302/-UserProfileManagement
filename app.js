import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/db.js';
import router from './routes/index.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';
import { saveUserLoginDetails } from './controller/Login_detiles/lastLogin.js'
import {logFieldChanges} from './controller/Login_detiles/fieldChange.js'

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});
app.use(express.json());
app.use(cors());
app.use('/api', router);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));


io.on('connection', (socket) => {
  console.log('a user connected');

  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

  socket.on('userLogin', (userId) => {
    saveUserLoginDetails({ userId, socket });
  });

  socket.on('fieldUpdate', ({ userId, username, fieldOldValue, fieldNewValue }) => {
    logFieldChanges({ userId, username, fieldOldValue, fieldNewValue,socket });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});





// import mqtt from 'mqtt';
// const client = mqtt.connect('mqtt://broker.hivemq.com');
// client.on('connect', () => {
//   client.subscribe('test/topic', (err) => {
//       if (!err) {
//           client.publish('test/topic', 'Hello MQTT');
//       }
//   });
// });

// client.on('message', (topic, message) => {
//   console.log(message.toString());
//   client.end();
// });
