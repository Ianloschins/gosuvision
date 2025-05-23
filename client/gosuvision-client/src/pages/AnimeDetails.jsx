import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { request, gql } from "graphql-request";
import { useState } from "react";
import "../styles/Home.css";
import "../styles/AnimeDetails.css";

const endpoint = "https://graphql.anilist.co";

const DETAILS_QUERY = gql`
  query ($id: Int) {
    Media(id: $id, type: ANIME) {
      id
      title {
        romaji
        english
      }
      coverImage {
        large
      }
      description
      episodes
      genres
      averageScore
      popularity
    }
  }
`;

function AnimeDetails() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      const data = await request(endpoint, DETAILS_QUERY, { id: parseInt(id) });
      setAnime(data.Media);
    };
    fetchAnimeDetails();
  }, [id]);

  if (!anime) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-4">{anime.title.romaji}</h2>
      <img src={anime.coverImage.large} alt={anime.title.romaji} className="mb-4" />
      <p>{anime.description}</p>
      <p><strong>Episodes:</strong> {anime.episodes}</p>
      <p><strong>Genres:</strong> {anime.genres.join(", ")}</p>
      <p><strong>Average Score:</strong> {anime.averageScore}</p>
      <p><strong>Popularity:</strong> {anime.popularity}</p>
    </div>
  );
}

export default AnimeDetails;