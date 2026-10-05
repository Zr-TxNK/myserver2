import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import userRouter from './UserRoutes';

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend client like Postman at http://localhost:3000/client
app.use('/client', express.static(path.join(__dirname, '../public')));
app.get('/client', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/api", userRouter);

// Only connect and listen when run directly, not when imported by tests
if (require.main === module) {
  const MONGO_URI = process.env.MONGO_URI;
  const PORT = process.env.PORT || 3000;

  if (!MONGO_URI) {
    console.error("Error: MONGO_URI is not set in .env file or environment variable");
    process.exit(1);
  }

  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB");
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}
