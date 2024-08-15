import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/db.js';
import router from './routes/index.js';
import cors from 'cors';

const app = express();
const allowedOrigins = ['http://userProjectManagement.com', 'http://localhost:4000']; 

app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use(express.json());
app.use('/api', router);

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
});
