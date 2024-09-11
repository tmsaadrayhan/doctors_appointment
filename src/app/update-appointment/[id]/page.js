"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const UpdateAppointmentPage = ({ params }) => {
    const router = useRouter();
  const { id } = params; // Get appointment ID from URL
  const [appointment, setAppointment] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch the appointment details by ID
  useEffect(() => {
    if (!id) return;

    const fetchAppointment = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments.php?id=${id}`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch appointment");
        }
        const data = await res.json();
        console.log(data[0]);
        setAppointment(data[0]);
        setSelectedDoctorId(data[0].doctor_id);
        setPatientName(data[0].patient_name);
        setAppointmentDate(data[0].appointment_date);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAppointment();
  }, []);

  // Fetch the list of all doctors for the dropdown
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/doctors.php`
        );
        if (!res.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchDoctors();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedAppointment = {
      id,
      doctor_id: selectedDoctorId,
      patient_name: patientName,
      appointment_date: appointmentDate,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/appointments.php`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAppointment),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update appointment");
      }

      setMessage("Appointment updated successfully!");
      router.push("/appointments"); // Redirect back to the appointments list
    } catch (err) {
      setError(err.message);
    }
  };
  console.log(selectedDoctorId, patientName, appointmentDate);

  if (!appointment) {
    return <p>Loading appointment...</p>;
  }

  return (
    <div>
      <h1>Update Appointment</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Doctor:</label>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            required
          >
            <option value="">Select a Doctor</option>
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Patient Name:</label>
          <input
            type="text"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Appointment Date:</label>
          <input
            type="datetime-local"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <button className="bg-[#0147ab] text-[#ffffff] p-[.5rem] my-[.5rem] rounded-xl" type="submit">Update Appointment</button>
      </form>
    </div>
  );
};

export default UpdateAppointmentPage;
