import React, { useState } from 'react';
import axios from 'axios';
import ReservationCars from './ReservationCars';
import styles from './Reserve.module.css';

/* eslint-disable jsx-a11y/label-has-associated-control */
const Reserve = () => {
  const [date, setDate] = useState('');
  const [city, setCity] = useState('');
  const [cars, setCars] = useState([]);

  const findCars = (e) => {
    e.preventDefault();
    if (date && city) {
      axios
        .get(`http://localhost:3000/api/v1/reserve/cars/${date}`)
        .then((response) => setCars(response.data.cars));
    }
  };

  if (cars.length > 0) {
    return (
      <ReservationCars date={date} city={city} cars={cars} setCars={setCars} />
    );
  }
  return (
    <div
      className={`${styles.cnt} container-fluid vh-100 d-flex flex-column align-items-center pt-5`}
    >
      <h2 className={`${styles.zindex} fs-1 text-white`}>Reserve a car</h2>
      <p className={`${styles.zindex} fs-5 text-white`}>
        Pull up in a fancy car for your next big event!
      </p>
      <hr className={styles.hr} />
      <p className={`${styles.zindex} mb-5 fs-5 text-white`}>
        Choose a city and a reservation date!
      </p>
      <form
        className={`${styles.zindex} ${styles.form} d-flex justify-content-around mb-5 align-items-end`}
        onSubmit={findCars}
      >
        <div>
          <label htmlFor="city" className="form-label text-white ms-3">
            Your city:
          </label>
          <input
            id="city"
            className={`${styles.input} form-control form-control-lg px-4 mx-2`}
            type="text"
            placeholder="City"
            aria-label=".form-control-lg example"
            required
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date" className="form-label text-white ms-3">
            Reservation date:
          </label>
          <input
            id="date"
            className={`${styles.input} form-control form-control-lg px-4 mx-2`}
            type="date"
            placeholder="Date"
            aria-label=".form-control-lg example"
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit" className={`${styles.btn} btn px-4 ms-4`}>
          Next
        </button>
      </form>
    </div>
  );
};

export default Reserve;
