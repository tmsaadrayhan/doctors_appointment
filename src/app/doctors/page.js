"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const handleDelete = async (id) => {
    const confirmDelete = confirm('Are you sure you want to delete this doctor?');
    if (confirmDelete) {
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/doctors.php?id=${id}`);
        // Remove doctor from the local state after successful deletion
        setDoctors(doctors.filter((doctor) => doctor.id !== id));
        console.log('Doctor deleted successfully');
      } catch (error) {
        console.error('Error deleting doctor:', error);
      }
    }
  };
  useEffect(() => {
    // Fetch doctors from the API
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/doctors.php`
        );
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div>
      <Link href="/create-doctor">
        <button className="bg-[#0147ab] text-[#ffffff] p-[.5rem] my-[.5rem] rounded-xl">Create</button>
      </Link>
      <h1>Doctors List</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Specialty</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.id}</td>
              <td>{doctor.name}</td>
              <td>{doctor.specialty}</td>
              <td>{doctor.phone}</td>
              <td>{doctor.email}</td>
              <td><Link href={`/doctors/${doctor.id}`}>Edit</Link> <button  onClick={() => handleDelete(doctor.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Doctors;
