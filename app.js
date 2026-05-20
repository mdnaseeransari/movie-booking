/**
 * CineBook - Client-side Booking & Confirmation Logic
 * Handles movie ticket booking form computations, localStorage persistence, and receipt rendering.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Page routing check based on present DOM elements
  const bookingForm = document.getElementById('booking-form');
  const ticketRef = document.getElementById('ticket-ref');

  if (bookingForm) {
    initializeBookingPage();
  } else if (ticketRef) {
    initializeConfirmationPage();
  }
});

/**
 * Booking Page Controller
 */
function initializeBookingPage() {
  // --- Form & Summary Inputs ---
  const bookingForm = document.getElementById('booking-form');
  const customerName = document.getElementById('customer-name');
  const customerEmail = document.getElementById('customer-email');
  const movieSelect = document.getElementById('movie-select');
  const showtimeSelect = document.getElementById('showtime');
  const bookingDate = document.getElementById('booking-date');
  const seatsCountSelect = document.getElementById('seats-count');
  const seatTypeSelect = document.getElementById('seat-type');

  // --- Summary Elements ---
  const movieDisplayTitle = document.getElementById('movie-display-title');
  const summaryMovieTitle = document.getElementById('summary-movie-title');
  const summaryDate = document.getElementById('summary-date');
  const summaryShowtime = document.getElementById('summary-showtime');
  const summarySeatsCount = document.getElementById('summary-seats-count');
  const summarySeatTier = document.getElementById('summary-seat-tier');
  const summaryTicketPrice = document.getElementById('summary-ticket-price');
  const summaryTotalPrice = document.getElementById('summary-total-price');

  // --- Pricing Config ---
  const seatPrices = {
    'Normal': 10.00,
    'Premium': 18.00,
    'VIP': 30.00
  };

  // Set min date to today so user cannot book past dates
  const today = new Date().toISOString().split('T')[0];
  bookingDate.min = today;
  bookingDate.value = today; // default to today for better UX

  // --- Parse Movie Name URL Parameter ---
  const urlParams = new URLSearchParams(window.location.search);
  const movieParam = urlParams.get('movie');
  if (movieParam) {
    const decodedMovie = decodeURIComponent(movieParam);
    
    // Auto-select option if it matches one of the dropdown choices
    for (let option of movieSelect.options) {
      if (option.value.toLowerCase() === decodedMovie.toLowerCase()) {
        movieSelect.value = option.value;
        break;
      }
    }
  }

  // --- Event Listeners ---
  const formControls = [movieSelect, showtimeSelect, bookingDate, seatsCountSelect, seatTypeSelect];
  formControls.forEach(control => {
    control.addEventListener('change', updateSummary);
  });

  // Init form fields check
  updateSummary();

  // --- Calculate and Update Summary Pane ---
  function updateSummary() {
    const movie = movieSelect.value || 'Not selected';
    const dateVal = bookingDate.value;
    const time = showtimeSelect.value || 'Not selected';
    const seats = parseInt(seatsCountSelect.value) || 0;
    const tier = seatTypeSelect.value || 'Not selected';
    
    // Update labels
    movieDisplayTitle.textContent = movie !== 'Not selected' ? `Book Tickets: ${movie}` : 'Book Ticket';
    summaryMovieTitle.textContent = movie;
    summaryDate.textContent = dateVal ? formatDateString(dateVal) : 'Not selected';
    summaryShowtime.textContent = time;
    summarySeatsCount.textContent = seats > 0 ? `${seats} Ticket(s)` : '-';
    summarySeatTier.textContent = tier;

    // Price calculations
    const unitPrice = seatPrices[tier] || 0.00;
    summaryTicketPrice.textContent = unitPrice > 0 ? `$${unitPrice.toFixed(2)}` : '$0.00';
    
    const totalPrice = seats * unitPrice;
    summaryTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // --- Form Submission & Storage ---
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const tier = seatTypeSelect.value;
    const seats = parseInt(seatsCountSelect.value);
    const unitPrice = seatPrices[tier];
    const totalAmount = seats * unitPrice;

    // Create unique random 6-digit booking reference number
    const bookingId = Math.floor(100000 + Math.random() * 900000);

    // Save booking payload to individual localStorage keys
    localStorage.setItem('customerName', customerName.value);
    localStorage.setItem('email', customerEmail.value);
    localStorage.setItem('movie', movieSelect.value);
    localStorage.setItem('showtime', showtimeSelect.value);
    localStorage.setItem('date', bookingDate.value);
    localStorage.setItem('seats', seats.toString());
    localStorage.setItem('seatType', tier);
    localStorage.setItem('totalPrice', totalAmount.toFixed(2));
    localStorage.setItem('bookingId', bookingId.toString());

    // Redirect to confirmation screen
    window.location.href = 'confirm.html';
  });
}

/**
 * Confirmation Page Controller
 */
function initializeConfirmationPage() {
  const noBookingState = document.getElementById('no-booking-state');
  const bookingConfirmedState = document.getElementById('booking-confirmed-state');

  // Retrieve individual keys from storage
  const customerName = localStorage.getItem('customerName');
  const email = localStorage.getItem('email');
  const movie = localStorage.getItem('movie');
  const showtime = localStorage.getItem('showtime');
  const date = localStorage.getItem('date');
  const seats = localStorage.getItem('seats');
  const seatType = localStorage.getItem('seatType');
  const totalPrice = localStorage.getItem('totalPrice');
  const bookingId = localStorage.getItem('bookingId');

  // Verify that essential keys are present
  if (!customerName || !email || !movie || !showtime || !date || !seats || !seatType || !totalPrice || !bookingId) {
    // Show error state if navigated to manually without booking
    noBookingState.style.display = 'block';
    bookingConfirmedState.style.display = 'none';
    return;
  }

  // Inject details into confirmation view elements
  document.getElementById('ticket-ref').textContent = `#${bookingId}`;
  document.getElementById('ticket-movie').textContent = movie;
  document.getElementById('ticket-date').textContent = formatDateString(date);
  document.getElementById('ticket-showtime').textContent = showtime;
  document.getElementById('ticket-name').textContent = customerName;
  document.getElementById('ticket-email').textContent = email;
  document.getElementById('ticket-seats-count').textContent = seats;
  document.getElementById('ticket-seats-tier').textContent = seatType;
  document.getElementById('ticket-price').textContent = `$${totalPrice}`;

  // Show confirmed UI
  noBookingState.style.display = 'none';
  bookingConfirmedState.style.display = 'block';
}

/**
 * Helper to format date string into readable format (e.g. Thursday, May 21, 2026)
 */
function formatDateString(dateStr) {
  if (!dateStr) return '-';
  const dateObj = new Date(dateStr);
  if (isNaN(dateObj.getTime())) return dateStr;
  
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  // Add UTC offset correction for consistent date output
  const correctedDate = new Date(dateObj.getTime() + dateObj.getTimezoneOffset() * 60000);
  return correctedDate.toLocaleDateString('en-US', options);
}
