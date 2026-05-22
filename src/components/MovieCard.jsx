/**
 * MovieCard Component
 * Displays a single movie with title, genre, rating, and action button
 */

import React from 'react';

const MovieCard = ({ movie, onBook }) => {
  return (
    <div className="react-movie-card">
      <div className="movie-poster">
        <img src={movie.image} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p className="genre">{movie.genre}</p>
        <p className="rating">Rating: {movie.rating}</p>
        <p className="duration">Duration: {movie.duration}</p>
        <button onClick={() => onBook(movie.id)} className="book-btn">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
