/**
 * App Component
 * Main React application entry point with routing
 */

import React, { useState } from 'react';
import MovieList from './components/MovieList';
import BookingForm from './components/BookingForm';
import BookingConfirmation from './components/BookingConfirmation';

const App = () => {
  const [currentPage, setCurrentPage] = useState('movies');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [bookingData, setBookingData] = useState(null);

  const handleBookMovie = (movieId) => {
    setSelectedMovie(movieId);
    setCurrentPage('booking');
  };

  const handleBookingSubmit = (formData) => {
    const booking = {
      bookingId: `BK-${Date.now()}`,
      movieTitle: 'Selected Movie',
      ...formData,
      price: formData.seats * (formData.seatType === 'VIP' ? 30 : formData.seatType === 'Premium' ? 18 : 10),
      status: 'confirmed'
    };
    setBookingData(booking);
    setCurrentPage('confirmation');
  };

  return (
    <div className="react-app">
      <header className="react-header">
        <h1>CineBook React App</h1>
        <nav className="react-nav">
          <button 
            onClick={() => setCurrentPage('movies')}
            className={currentPage === 'movies' ? 'active' : ''}
          >
            Movies
          </button>
        </nav>
      </header>

      <main className="react-main">
        {currentPage === 'movies' && (
          <MovieList />
        )}
        {currentPage === 'booking' && (
          <BookingForm movieTitle="Selected Movie" onSubmit={handleBookingSubmit} />
        )}
        {currentPage === 'confirmation' && (
          <BookingConfirmation booking={bookingData} />
        )}
      </main>

      <footer className="react-footer">
        <p>&copy; 2024 CineBook React App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
