import React, { useState } from 'react';

function DateForm({ onDateChange }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onDateChange(fromDate, toDate);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fromDate">From:</label>
        <input
          type="datetime-local"
          id="fromDate"
          value={fromDate}
          onChange={e => setFromDate(e.target.value)}
        />

        <label htmlFor="toDate">To:</label>
        <input
          type="datetime-local"
          id="toDate"
          value={toDate}
          onChange={e => setToDate(e.target.value)}
        />

        <button type="submit">送信</button>
      </form>
    </div>
  );
}

export default DateForm;