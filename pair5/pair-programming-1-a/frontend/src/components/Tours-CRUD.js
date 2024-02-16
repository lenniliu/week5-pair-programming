import React, { useState } from 'react';
import axios from 'axios';

const TourForm = () => {
  const [tourData, setTourData] = useState({
    id: '',
    image: '',
    date: '',
    info: '',
    title: '',
    location: '',
    cost: '',
    duration: ''
  });

  const handleChange = (e) => {
    setTourData({ ...tourData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/tours', tourData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        ID:
        <input type="number" name="id" value={tourData.id} onChange={handleChange} required />
      </label>
      <label>
        Image:
        <input type="text" name="image" value={tourData.image} onChange={handleChange} required />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={tourData.date} onChange={handleChange} required />
      </label>
      <label>
        Info:
        <textarea name="info" value={tourData.info} onChange={handleChange} required />
      </label>
      <label>
        Title:
        <input type="text" name="title" value={tourData.title} onChange={handleChange} required />
      </label>
      <label>
        Location:
        <input type="text" name="location" value={tourData.location} onChange={handleChange} required />
      </label>
      <label>
        Cost:
        <input type="number" name="cost" value={tourData.cost} onChange={handleChange} required />
      </label>
      <label>
        Duration:
        <input type="text" name="duration" value={tourData.duration} onChange={handleChange} required />
      </label>
      <button type="submit">Add Tour</button>
    </form>
  );
};

const DeleteTourButton = ({ id }) => {
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/tours/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleDelete}>Delete Tour</button>;
};

export { TourForm, DeleteTourButton };
