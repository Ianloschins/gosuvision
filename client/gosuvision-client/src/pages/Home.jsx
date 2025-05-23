import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import '../styles/Home.css';

const endpoint = 'https://graphql.anilist.co';

const TRENDING_QUERY = gql`
  query {
    Page(perPage: 20) {
      media(sort: TRENDING_DESC, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

const SEARCH_QUERY = gql`
  query ($search: String) {
    Page(perPage: 8) {
      media(search: $search, type: ANIME) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`;

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [title, setTitle] = useState('🔥 Trending Anime');
  const [visibleStart, setVisibleStart] = useState(1);

  const fetchTrending = async () => {
    const data = await request(endpoint, TRENDING_QUERY);
    setResults(data.Page.media);
  };

  const handleSearch = async () => {
    if (searchTerm.trim() === '') return fetchTrending();

    const data = await request(endpoint, SEARCH_QUERY, { search: searchTerm });
    setResults(data.Page.media);
    setTitle(`🔍 Results for "${searchTerm}"`);
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStart((prev) => (prev + 4 >= results.length ? 1 : prev + 4));
    }, 5000);
    return () => clearInterval(interval);
  }, [results]);

  const featured = results[0];
  const rotating = results.slice(visibleStart, visibleStart + 4);

  return (
    <div className="home-container">
      <div className="home-header">
        <div className="logo-wrapper">
          <img className="gosuvision-logo" src="../src/img/251d4e2d-6c48-4b90-8eb5-87c105aa16e7.png" alt="gosuvision-logo" />
        </div>
        <h1>GosuVision</h1>
        <p>Track, search, and explore anime your way.</p>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search anime..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h2>{title}</h2>

      {searchTerm.trim() === '' && results.length > 0 ? (
        <div className="trending-layout">
          <div className="featured-card">
            <img src={featured.coverImage.large} alt={featured.title.romaji} />
            <p className="title">{featured.title.romaji}</p>
          </div>

          <div className="grid-2x2">
            {rotating.map((anime) => (
              <div key={anime.id} className="card">
                <img src={anime.coverImage.large} alt={anime.title.romaji} />
                <p>{anime.title.romaji}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid">
          {results.map((anime) => (
            <div key={anime.id} className="card">
              <img src={anime.coverImage.large} alt={anime.title.romaji} />
              <p>{anime.title.romaji}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
