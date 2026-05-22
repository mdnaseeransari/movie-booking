/**
 * BookingConfirmation Component
 * Displays booking confirmation details and receipt
 */

import React from 'react';

const BookingConfirmation = ({ booking }) => {
  if (!booking) {
    return <div className="confirmation">No booking data available</div>;
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="react-booking-confirmation">
      <div className="confirmation-header">
        <h2>Booking Confirmed!</h2>
        <p className="confirmation-id">Reference: {booking.bookingId}</p>
      </div>

      <div className="confirmation-details">
        <div className="detail-row">
          <span className="label">Movie:</span>
          <span className="value">{booking.movieTitle}</span>
        </div>
        <div className="detail-row">
          <span className="label">Date:</span>
          <span className="value">{booking.date}</span>
        </div>
        <div className="detail-row">
          <span className="label">Showtime:</span>
          <span className="value">{booking.showtime}</span>
        </div>
        <div className="detail-row">
          <span className="label">Number of Seats:</span>
          <span className="value">{booking.seats}</span>
        </div>
        <div className="detail-row">
          <span className="label">Seat Type:</span>
          <span className="value">{booking.seatType}</span>
        </div>
        <div className="detail-row">
          <span className="label">Customer Name:</span>
          <span className="value">{booking.name}</span>
        </div>
        <div className="detail-row">
          <span className="label">Email:</span>
          <span className="value">{booking.email}</span>
        </div>
      </div>

      <div className="confirmation-total">
        <h3>Total Price: ${booking.price}</h3>
      </div>

      <div className="confirmation-footer">
        <p>A confirmation email has been sent to {booking.email}</p>
        <button className="download-btn">Download Receipt</button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
