import { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import '../styles/Home.css';

const endpoint = 'https://graphql.anilist.co';

const TRENDING_QUERY = gql`
  query {
    Page(perPage: 8) {
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
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term
  const [results, setResults] = useState([]); // State to hold the search results
  const [title, setTitle] = useState('🔥 Trending Anime');


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

  return (
    <div className="home-container">
      <div className="home-header">
        <div className='logo-wrapper'><img className="gosuvision-logo" src='../src/img/251d4e2d-6c48-4b90-8eb5-87c105aa16e7.png' alt='gosuvision-logo'/></div>
        <h1> GosuVision</h1>
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

      <div className="grid">
        {results.map((anime) => (
          <div key={anime.id} className="card">
            <img src={anime.coverImage.large} alt={anime.title.romaji} />
            <p>{anime.title.romaji}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
