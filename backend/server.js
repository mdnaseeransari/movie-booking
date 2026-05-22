/**
 * CineBook Backend - Dummy Node.js Server
 * This is a placeholder backend with mock data and routes
 */

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ===== DUMMY DATA =====
const moviesData = [
  {
    id: 1,
    title: 'Cyberpunk 2099',
    genre: 'Sci-Fi',
    rating: 'PG-13',
    duration: '148 mins',
    image: 'cyberpunk.jpg',
    showtimes: ['10:00 AM', '2:30 PM', '7:00 PM', '10:30 PM']
  },
  {
    id: 2,
    title: 'Quantum Escape',
    genre: 'Thriller',
    rating: 'R',
    duration: '135 mins',
    image: 'quantum.jpg',
    showtimes: ['11:00 AM', '3:45 PM', '8:15 PM']
  },
  {
    id: 3,
    title: 'Mystic Woods',
    genre: 'Fantasy',
    rating: 'PG',
    duration: '152 mins',
    image: 'mystic.jpg',
    showtimes: ['9:30 AM', '1:00 PM', '6:00 PM']
  }
];

const bookingsData = [];

// ===== API ROUTES =====

/**
 * GET /api/movies - Fetch all movies
 */
app.get('/api/movies', (req, res) => {
  res.json({
    status: 'success',
    data: moviesData,
    message: 'Movies retrieved successfully'
  });
});

/**
 * GET /api/movies/:id - Fetch single movie
 */
app.get('/api/movies/:id', (req, res) => {
  const movie = moviesData.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ status: 'error', message: 'Movie not found' });
  }
  res.json({ status: 'success', data: movie });
});

/**
 * POST /api/bookings - Create new booking
 */
app.post('/api/bookings', (req, res) => {
  const { movieId, movieTitle, seats, seatType, showtime, date, email, name } = req.body;

  if (!movieId || !seats || !seatType || !showtime || !email) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required booking fields'
    });
  }

  const bookingId = `BK-${Date.now()}`;
  const newBooking = {
    bookingId,
    movieId,
    movieTitle,
    seats,
    seatType,
    showtime,
    date,
    email,
    name,
    price: seats * (seatType === 'VIP' ? 30 : seatType === 'Premium' ? 18 : 10),
    bookedAt: new Date(),
    status: 'confirmed'
  };

  bookingsData.push(newBooking);

  res.status(201).json({
    status: 'success',
    message: 'Booking created successfully',
    data: newBooking
  });
});

/**
 * GET /api/bookings/:bookingId - Fetch booking details
 */
app.get('/api/bookings/:bookingId', (req, res) => {
  const booking = bookingsData.find(b => b.bookingId === req.params.bookingId);
  if (!booking) {
    return res.status(404).json({ status: 'error', message: 'Booking not found' });
  }
  res.json({ status: 'success', data: booking });
});

/**
 * GET /api/showtimes - Fetch available showtimes
 */
app.get('/api/showtimes', (req, res) => {
  res.json({
    status: 'success',
    data: {
      showtimes: ['10:00 AM', '2:30 PM', '7:00 PM', '10:30 PM'],
      availableSeats: 150
    }
  });
});

/**
 * GET /api/health - Health check
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    message: 'CineBook Backend is running',
    timestamp: new Date()
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`CineBook Backend running on http://localhost:${PORT}`);
});
