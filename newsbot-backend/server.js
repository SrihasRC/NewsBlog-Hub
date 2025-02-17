import express from 'express';
import rateLimit from 'express-rate-limit';
import axios from 'axios';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

// Apply rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1-minute window
  max: 10, // Limit each IP to 10 requests per minute
  message: { error: 'Too many requests, please try again later.' },
  headers: true, // Send RateLimit headers
});

app.use(express.json());
app.use(limiter); // Apply rate limiting to all requests

// API route
app.post('/generate-text', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: req.body.messages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error generating text' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
