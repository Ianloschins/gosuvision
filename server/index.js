const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

// API route to proxy search
app.get('/api/search', async (req, res) => {
  const { title } = req.query;
  try {
    const response = await fetch(`https://vidsrc.me/api/search/movie?title=${title}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch from vidsrc.me' });
  }
});

// API route to proxy movie details
app.get('/api/movie/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const response = await fetch(`https://vidsrc.me/api/movie/${id}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
