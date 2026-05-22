# CineBook - Movie Ticket Booking System

A full-stack movie ticket booking application with:
- **Frontend**: HTML/CSS/JavaScript (vanilla) + React components
- **Backend**: Node.js/Express dummy API server

## Project Structure

```
├── index.html              # Main HTML booking page
├── booking.html            # Booking form page
├── confirm.html            # Booking confirmation page
├── app.js                  # Client-side vanilla JavaScript
├── style.css               # Main styles
├── Jenkinsfile             # CI/CD pipeline
│
├── backend/                # Node.js Backend (dummy/placeholder)
│   ├── server.js           # Express server with mock API routes
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment configuration template
│
└── src/                    # React Components (dummy/placeholder)
    ├── App.jsx             # Main React app component
    ├── index.js            # React entry point
    ├── styles.css          # React component styles
    ├── package.json        # React dependencies
    └── components/
        ├── MovieCard.jsx           # Displays single movie card
        ├── MovieList.jsx           # Movie list with grid layout
        ├── BookingForm.jsx         # Ticket booking form component
        └── BookingConfirmation.jsx # Booking confirmation display
```

## Frontend (Vanilla HTML/CSS/JS)

The main website uses vanilla JavaScript and operates on:
- **index.html** - Home page with movie listings
- **booking.html** - Movie booking form
- **confirm.html** - Booking confirmation

Run directly in a browser - no build tools needed.

## Backend (Node.js)

Dummy Express API server with mock data endpoints.

### Installation & Setup

```bash
cd backend
npm install
npm start
```

Server runs on `http://localhost:5000`

### Available Endpoints

- `GET /api/health` - Health check
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:bookingId` - Get booking details
- `GET /api/showtimes` - Get available showtimes

## React Components

Separate React application with reusable components.

### Installation & Setup

```bash
cd src
npm install
npm start
```

### Components

1. **MovieCard** - Individual movie display
2. **MovieList** - Grid of movies with dummy data
3. **BookingForm** - Ticket booking form with validation
4. **BookingConfirmation** - Booking receipt display
5. **App** - Main application with routing

---

**Note**: The React components and Backend are dummy/placeholder implementations and don't affect the main HTML website functionality.
