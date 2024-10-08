import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'; // Import useAuth for authentication context
import { useNavigate } from 'react-router-dom';

const ReportingIssue = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  
  // State for form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState([]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!auth.user) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);
    images.forEach((image) => {
      formData.append('reportImages', image);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/reports', formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      // Reset form fields
      setTitle('');
      setDescription('');
      setLocation('');
      setImages([]);
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred while reporting the issue.');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold">Report an Issue</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div>
          <label className="block mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="textarea textarea-bordered w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="input input-bordered w-full"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2">Upload Images:</label>
          <input
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            className="file-input file-input-bordered w-full"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-4">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportingIssue;