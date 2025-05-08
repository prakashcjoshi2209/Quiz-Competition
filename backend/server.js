import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

// Middlewares
// app.use(cors());

const allowedOrigins = [
  'http://localhost:5173',
  'https://quiz-competition-five.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));


app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);


// Connect Database and Run Server
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// In your Express app (e.g., index.js or app.js)
app.get('/ping', (req, res) => {
  res.send('Server is awake!');
});



app.get('/', (req, res) => {
  res.send('Backend server is running');
});

