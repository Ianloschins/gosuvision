const API_BASE = "http://localhost:3000/api";

// Fetch movies by title
async function fetchMovies(query) {
  try {
    const res = await fetch(`${API_BASE}/search?title=${query}`);
    const data = await res.json();
    console.log("Search Results:", data);
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
}

// Fetch full movie details by TMDb ID
async function fetchMovieDetails(id) {
  try {
    const res = await fetch(`${API_BASE}/movie/${id}`);
    const data = await res.json();
    console.log("Movie Details:", data);
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
}

// Render list of movies
function renderMovieList(movies) {
  const movieList = document.getElementById("movie-list");
  const movieDetails = document.getElementById("movie-details");
  movieList.innerHTML = "";
  movieDetails.innerHTML = "";

  movies.forEach((movie) => {
    const li = document.createElement("li");
    li.textContent = `${movie.title} (${movie.year})`;
    li.style.cursor = "pointer";
    li.style.padding = "0.5rem";
    li.style.marginBottom = "0.5rem";
    li.style.borderRadius = "6px";
    li.style.background = "rgba(255,255,255,0.08)";
    li.addEventListener("click", () => {
      fetchMovieDetails(movie.tmdb_id).then((details) => {
        if (details) {
          renderMovieDetails(details);
        }
      });
    });
    movieList.appendChild(li);
  });
}

// Render detailed movie view including iframe player
function renderMovieDetails(details) {
  const movieDetails = document.getElementById("movie-details");
  const imageBase = "https://image.tmdb.org/t/p/w500";

  movieDetails.innerHTML = `
    <h2>${details.title}</h2>
    <p>${details.overview || "No description available."}</p>
    <p><strong>Release Date:</strong> ${details.release_date}</p>
    <p><strong>Rating:</strong> ${details.vote_average}</p>
    <img src="${imageBase + details.poster_path}" alt="${details.title}" 
         style="max-width: 100%; margin-top: 1rem; border-radius: 10px;">
    
    <div class="video-wrapper">
      <iframe
        src="https://vidsrc.xyz/embed/movie?tmdb=${details.tmdb_id}"
        frameborder="0"
        allowfullscreen
        width="100%"
        height="400"
        allow="autoplay; encrypted-media; picture-in-picture"
        style="border-radius: 10px; margin-top: 1rem;">
      </iframe>
    </div>
  `;
}

// Handle search button click
function handleSearch() {
  const query = document.getElementById("searchInput").value.trim();
  if (query) {
    fetchMovies(query).then(renderMovieList);
  }
}

// Show default movie list on page load
window.addEventListener("DOMContentLoaded", () => {
  fetchMovies("avengers").then(renderMovieList);
});
