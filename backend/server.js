import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables - fix the path
dotenv.config({ path: path.join(__dirname, '.env') });

// Verify environment variables are loaded
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'NOT LOADED');
console.log('NODE_ENV:', process.env.NODE_ENV);

const app = express();

// Only connect to MongoDB if we have a connection string
if (process.env.MONGO_URI) {
  connectDB();
} else {
  console.error('MONGO_URI not found. Please check your .env file');
}

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Catch-all handler for SPA
app.get("*", (req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});