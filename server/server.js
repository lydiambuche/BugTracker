import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import authRouter from './src/routes/authRoutes.js';
import bugRoutes from './src/routes/bugRoutes.js';
import dashboardRoutes from './src/routes/dashboard.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Security & Dev Middlewares
app.use(helmet()); // Sets security headers
app.use(cors());   // Allows cross-origin requests
app.use(morgan('dev')); // Logs HTTP requests
app.use(express.json()); // Parses incoming JSON

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/bugs', bugRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('BugTracker API is running...');
});

// Serve frontend in production 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
}

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Global Error Handling Middleware 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} on port ${PORT}`);
});
