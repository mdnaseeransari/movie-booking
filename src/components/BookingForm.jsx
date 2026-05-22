/**
 * BookingForm Component
 * Handles movie ticket booking form with validation
 */

import React, { useState } from 'react';

const BookingForm = ({ movieTitle, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    seats: 1,
    seatType: 'Normal',
    showtime: '10:00 AM'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'seats' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      onSubmit(formData);
      setFormData({ name: '', email: '', seats: 1, seatType: 'Normal', showtime: '10:00 AM' });
    }
  };

  return (
    <form className="react-booking-form" onSubmit={handleSubmit}>
      <h2>Book Tickets for {movieTitle}</h2>
      
      <div className="form-group">
        <label htmlFor="name">Full Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Enter your name"
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your email"
        />
      </div>

      <div className="form-group">
        <label htmlFor="seats">Number of Seats:</label>
        <select id="seats" name="seats" value={formData.seats} onChange={handleChange}>
          {[1, 2, 3, 4, 5, 6].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="seatType">Seat Type:</label>
        <select id="seatType" name="seatType" value={formData.seatType} onChange={handleChange}>
          <option value="Normal">Normal ($10)</option>
          <option value="Premium">Premium ($18)</option>
          <option value="VIP">VIP ($30)</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="showtime">Showtime:</label>
        <select id="showtime" name="showtime" value={formData.showtime} onChange={handleChange}>
          <option value="10:00 AM">10:00 AM</option>
          <option value="2:30 PM">2:30 PM</option>
          <option value="7:00 PM">7:00 PM</option>
          <option value="10:30 PM">10:30 PM</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">Book Now</button>
    </form>
  );
};

export default BookingForm;
