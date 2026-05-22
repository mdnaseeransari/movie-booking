/**
 * MovieList Component
 * Displays a list of movies in a grid layout
 */

import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      // Mock API call - replace with real endpoint
      const dummyMovies = [
        {
          id: 1,
          title: 'Cyberpunk 2099',
          genre: 'Sci-Fi',
          rating: 'PG-13',
          duration: '148 mins',
          image: '/images/cyberpunk.jpg'
        },
        {
          id: 2,
          title: 'Quantum Escape',
          genre: 'Thriller',
          rating: 'R',
          duration: '135 mins',
          image: '/images/quantum.jpg'
        },
        {
          id: 3,
          title: 'Mystic Woods',
          genre: 'Fantasy',
          rating: 'PG',
          duration: '152 mins',
          image: '/images/mystic.jpg'
        }
      ];
      setMovies(dummyMovies);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="react-movie-list">
      <h2>Now Showing</h2>
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            onBook={(id) => console.log(`Booking movie ${id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
