const API_BASE = 'http://localhost:3000/api/anime';

// Fetch popular anime (type 1 = weekly most viewed, type 2 = all-time most viewed)
async function fetchPopularAnime(type = 1) {
  try {
    const res = await fetch(`${API_BASE}/popular/${type}`);
    const text = await res.text();
    console.log('RAW:', text); // Debug raw response
    const data = JSON.parse(text);
    renderAnimeList(data);
  } catch (err) {
    console.error('🔥 Anime Popular Error:', err);
  }
}

function renderAnimeList(animeList) {
  const container = document.getElementById('anime-list');
  container.innerHTML = '';

  animeList.forEach(anime => {
    const card = document.createElement('div');
    card.classList.add('anime-card');
    card.innerHTML = `
      <h3>${anime.animeTitle}</h3>
      <img src="${anime.animeImg}" alt="${anime.animeTitle}" />
      <p><strong>Views:</strong> ${anime.views.toLocaleString()}</p>
      <p><strong>Score:</strong> ${anime.score}</p>
      <button onclick="alert('Anime MAL ID: ${anime.mal_id}')">Details</button>
    `;
    container.appendChild(card);
  });
}

// Load popular anime on page load
window.addEventListener('DOMContentLoaded', () => {
  fetchPopularAnime(1); // Weekly popular
});
