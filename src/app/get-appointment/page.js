"use client"
import { useEffect, useState } from 'react';

const CreateAppointmentPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    doctor_id: '',  // doctor_id will be an integer
    patient_name: '',
    appointment_date: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch doctors for the doctor selection dropdown
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors.php`);
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        setError('Failed to fetch doctors');
      }
    };

    fetchDoctors();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage('');

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),  // doctor_id will be sent as an integer
      });

      if (!response.ok) {
        throw new Error('Failed to create appointment');
      }

      setSuccessMessage('Appointment created successfully');
      setFormData({ doctor_id: '', patient_name: '', appointment_date: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Create Appointment</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        {/* Doctor Selection */}
        <div style={{ marginBottom: '10px' }}>
          <label>Doctor:</label>
          <select
            name="doctor_id"
            value={formData.doctor_id}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="">-- Select Doctor --</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* Patient Name */}
        <div style={{ marginBottom: '10px' }}>
          <label>Patient Name:</label>
          <input
            type="text"
            name="patient_name"
            value={formData.patient_name}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        {/* Appointment Date */}
        <div style={{ marginBottom: '10px' }}>
          <label>Appointment Date and Time:</label>
          <input
            type="datetime-local"
            name="appointment_date"
            value={formData.appointment_date}
            onChange={handleChange}
            required
            style={{ marginLeft: '10px', padding: '5px' }}
          />
        </div>

        {/* Submit Button */}
        <div>
          <button className="bg-[#0147ab] text-[#ffffff] p-[.5rem] my-[.5rem] rounded-xl" type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
            {loading ? 'Creating...' : 'Create Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateAppointmentPage;
