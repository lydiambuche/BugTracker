// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRouter from './src/routes/authRoutes.js';
import bugRoutes from './src/routes/bugRoutes.js';

dotenv.config();
connectDB();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter)
app.use('/api/bugs', bugRoutes);

// route to test
app.get('/', (req, res) => {
  res.send('BugTracker API is running...');
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
