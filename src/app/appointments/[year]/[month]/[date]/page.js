"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const { year, month, date } = params;
  const [appointments, setAppointment] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const name = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    const fetchMonth = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments.php?date=${date}`
        );
        console.log(response.data);
        setAppointment(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch month");
        setLoading(false);
      }
    };

    fetchMonth();
  }, []);

  const handleDelete = async (appointmentId) => {
    if (!confirm('Are you sure you want to delete this appointment?')) {
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/appointments.php?id=${appointmentId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error('Failed to delete appointment');
      }
      router.push('/appointments');  // Redirect to the appointments list page after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <p>Year: {year}</p>
      <p>Month: {name[month]}</p>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <table border="1" cellPadding="10">
            
              <th>ID</th>
              <th>Doctor</th>
              <th>Patient Name</th>
              <th>Date</th>
              <th>Action</th>
            
            
              {appointments?.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.id}</td>
                  <td>{appointment.doctor_name}</td>
                  <td>{appointment.patient_name}</td>
                  <td>{appointment.appointment_date}</td>
                  <td><Link href={`/update-appointment/${appointment.id}`}>Edit</Link> <button onClick={()=>handleDelete(appointment.id)}>Delete</button></td>
                </tr>
              ))}
            
          </table>
        )}
      </div>
    </div>
  );
};

export default page;
