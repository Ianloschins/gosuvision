const express = require('express');
const cors = require('cors');
const anigo = require('anigo-anime-api');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('public'));

// ✅ Get all anime
app.get('/api/anime/all', async (req, res) => {
  try {
    const data = await anigo.getAllAnime();
    res.json(data);
  } catch (err) {
    console.error('❌ Error fetching all anime:', err);
    res.status(500).json({ error: 'Failed to fetch all anime' });
  }
});

// ✅ Get popular anime (type 1 = weekly, type 2 = all time)
app.get('/api/anime/popular/:type', async (req, res) => {
  const type = parseInt(req.params.type);
  try {
    const data = await anigo.getPopular(type);
    res.json(data);
  } catch (err) {
    console.error('❌ Error fetching popular anime:', err);
    res.status(500).json({ error: 'Failed to fetch popular anime' });
  }
});

// ✅ Search by genre
app.get('/api/anime/genre/:genre', async (req, res) => {
  const genre = req.params.genre;
  try {
    const data = await anigo.searchAnimeByGenre(genre);
    res.json(data);
  } catch (err) {
    console.error('❌ Genre search error:', err);
    res.status(500).json({ error: 'Failed to fetch anime by genre' });
  }
});

// ✅ Get anime info from Gogoanime by ID
app.get('/api/anime/gogo/:animeId', async (req, res) => {
  const animeId = req.params.animeId;
  try {
    const data = await anigo.getGogoAnimeInfo(animeId);
    res.json(data);
  } catch (err) {
    console.error('❌ Gogo info error:', err);
    res.status(500).json({ error: 'Failed to fetch Gogoanime info' });
  }
});

// ✅ Get anime info from Animix by MAL ID
app.get('/api/anime/animix/:malId', async (req, res) => {
  const malId = parseInt(req.params.malId);
  try {
    const data = await anigo.getAnimeInfoFromAnimix(malId);
    res.json(data);
  } catch (err) {
    console.error('❌ Animix info error:', err);
    res.status(500).json({ error: 'Failed to fetch Animix info' });
  }
});

// ✅ Get episode info from Animix
app.get('/api/anime/episodes/:animeId', async (req, res) => {
  const animeId = req.params.animeId;
  try {
    const data = await anigo.getEpisodeInfoFromAnimix(animeId);
    res.json(data);
  } catch (err) {
    console.error('❌ Episode info error:', err);
    res.status(500).json({ error: 'Failed to fetch episodes' });
  }
});

// ✅ Get stream from Gogoanime
app.get('/api/anime/watch/gogo/:episodeId', async (req, res) => {
  const episodeId = req.params.episodeId;
  try {
    const data = await anigo.getGogoanimeEpisodeSource(episodeId);
    res.json(data);
  } catch (err) {
    console.error('❌ Gogo stream error:', err);
    res.status(500).json({ error: 'Failed to fetch Gogoanime stream' });
  }
});

// ✅ Get stream from Animixplay
app.get('/api/anime/watch/animix/:name/:epNum', async (req, res) => {
  const { name, epNum } = req.params;
  try {
    const data = await anigo.getEpisodeSourceFromAnimix(name, epNum);
    res.json(data);
  } catch (err) {
    console.error('❌ Animix stream error:', err);
    res.status(500).json({ error: 'Failed to fetch Animix stream' });
  }
});

app.listen(PORT, () => {
  console.log(`✨ Anime API Server running at http://localhost:${PORT}`);
});

// Get popular anime (1 = weekly, 2 = all-time)
app.get('/api/anime/popular/:type', async (req, res) => {
  const type = parseInt(req.params.type);
  try {
    const data = await anigo.getPopular(type);
    res.json(data);
  } catch (err) {
    console.error("❌ Failed to get popular anime:", err.message);
    res.status(500).json({ error: 'Failed to fetch popular anime' });
  }
});
