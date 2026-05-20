/**
 * CineLux - Client-side Booking Logic
 * Handles interactive seat grids, pricing calculations, and reservation processing.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Page detection: only initialize booking logic if booking elements exist
  const movieDisplayTitle = document.getElementById('movie-display-title');
  if (movieDisplayTitle) {
    initializeBooking();
  }
});

function initializeBooking() {
  // --- DOM Elements ---
  const movieDisplayTitle = document.getElementById('movie-display-title');
  const summaryMovieTitle = document.getElementById('summary-movie-title');
  const summaryShowtime = document.getElementById('summary-showtime');
  const summarySeats = document.getElementById('summary-seats');
  const summaryTicketPrice = document.getElementById('summary-ticket-price');
  const summaryTotalPrice = document.getElementById('summary-total-price');
  
  const showtimeSelect = document.getElementById('showtime');
  const bookingForm = document.getElementById('booking-form');
  const seatingGrid = document.getElementById('seating-grid');
  
  // Modal Elements
  const modalOverlay = document.getElementById('success-modal-overlay');
  const ticketRef = document.getElementById('ticket-ref');
  const ticketMovie = document.getElementById('ticket-movie');
  const ticketShowtime = document.getElementById('ticket-showtime');
  const ticketSeats = document.getElementById('ticket-seats');
  const ticketPrice = document.getElementById('ticket-price');
  const btnCloseSuccess = document.getElementById('btn-close-success');

  // --- State Variables ---
  let selectedSeats = [];
  let baseTicketPrice = 15.00; // Default ticket price
  let currentMovie = 'Selected Movie';

  // --- 1. Parse URL Parameter ---
  const urlParams = new URLSearchParams(window.location.search);
  const movieParam = urlParams.get('movie');
  if (movieParam) {
    currentMovie = decodeURIComponent(movieParam);
  } else {
    // If no movie is selected, fallback or direct back
    currentMovie = 'General Admission';
  }
  
  // Update header and summary views
  movieDisplayTitle.textContent = currentMovie;
  summaryMovieTitle.textContent = currentMovie;

  // --- 2. Seat Selection Logic ---
  seatingGrid.addEventListener('click', (e) => {
    // Check if clicked element is a seat and not occupied
    const seatButton = e.target.closest('.seat');
    if (!seatButton || seatButton.classList.contains('occupied')) return;
    
    // Stop form button behavior (since seats are button tags)
    e.preventDefault();

    const seatCode = seatButton.getAttribute('data-seat');

    if (seatButton.classList.contains('selected')) {
      // Deselect
      seatButton.classList.remove('selected');
      selectedSeats = selectedSeats.filter(seat => seat !== seatCode);
    } else {
      // Select
      seatButton.classList.add('selected');
      selectedSeats.push(seatCode);
      
      // Subtle pulse scale animation on selection
      seatButton.style.transform = 'scale(1.25)';
      setTimeout(() => {
        seatButton.style.transform = '';
      }, 150);
    }

    updateSummary();
  });

  // --- 3. Showtime & Dynamic Pricing Logic ---
  showtimeSelect.addEventListener('change', () => {
    const selectedVal = showtimeSelect.value;
    summaryShowtime.textContent = selectedVal || 'Not selected';

    // Matinee discount: 10% off for 12:30 PM show
    if (selectedVal === '12:30 PM') {
      baseTicketPrice = 13.50; // $15 - 10%
      summaryTicketPrice.textContent = `$13.50 (Matinee)`;
    } else {
      baseTicketPrice = 15.00;
      summaryTicketPrice.textContent = `$15.00`;
    }

    updateSummary();
  });

  // --- 4. Recalculate Summary & Ticket Costs ---
  function updateSummary() {
    // Sort seats alphabetically (e.g. A1, B3, F7)
    selectedSeats.sort((a, b) => {
      if (a[0] !== b[0]) return a.charCodeAt(0) - b.charCodeAt(0);
      return parseInt(a.slice(1)) - parseInt(b.slice(1));
    });

    // Update seat listing
    if (selectedSeats.length > 0) {
      summarySeats.textContent = selectedSeats.join(', ');
      summarySeats.style.color = 'var(--secondary-color)';
    } else {
      summarySeats.textContent = 'None';
      summarySeats.style.color = 'var(--text-muted)';
    }

    // Calculate total price
    const totalCost = selectedSeats.length * baseTicketPrice;
    summaryTotalPrice.textContent = `$${totalCost.toFixed(2)}`;
  }

  // --- 5. Booking Form Submission & Validation ---
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Custom Validation: Ensure at least one seat is selected
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat before confirming your booking.');
      return;
    }

    // Verify Showtime is selected (extra safety check)
    if (!showtimeSelect.value) {
      alert('Please choose a valid showtime.');
      return;
    }

    // Generate random mock booking reference
    const randomRef = 'CL-' + Math.floor(10000 + Math.random() * 90000);
    const finalTotal = selectedSeats.length * baseTicketPrice;

    // Fill virtual receipt ticket
    ticketRef.textContent = `#${randomRef}`;
    ticketMovie.textContent = currentMovie;
    ticketShowtime.textContent = showtimeSelect.value;
    ticketSeats.textContent = selectedSeats.join(', ');
    ticketPrice.textContent = `$${finalTotal.toFixed(2)}`;

    // Show Success Modal Dialog
    modalOverlay.classList.add('active');
  });

  // --- 6. Modal Dismissal & Redirect ---
  btnCloseSuccess.addEventListener('click', () => {
    modalOverlay.classList.remove('active');
    // Redirect back to main page to complete booking flow
    window.location.href = 'index.html';
  });
}
