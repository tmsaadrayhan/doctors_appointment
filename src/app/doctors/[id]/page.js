"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = ({params}) => {
  const [doctor, setDoctor] = useState({
    name: "",
    specialty: "",
    phone: "",
    email: "",
  });

  const router = useRouter();
  const { id } = params; // Get doctor ID from URL

  useEffect(() => {
    if (id) {
      // Fetch doctor by ID
      const fetchDoctor = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/doctors.php?id=${id}`
          );
          setDoctor(response.data);
        } catch (error) {
          console.error("Error fetching doctor:", error);
        }
      };
      fetchDoctor();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/doctors.php`,
        doctor
      );
      console.log("Doctor updated:", response.data);

      // Redirect to doctors list after successful update
      router.push("/doctors");
    } catch (error) {
      console.error("Error updating doctor:", error);
    }
  };

  return (
    <div>
      <h1>Edit Doctor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Specialty:</label>
          <input
            type="text"
            name="specialty"
            value={doctor.specialty}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={doctor.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={doctor.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="bg-[#0147ab] text-[#ffffff] p-[.5rem] my-[.5rem] rounded-xl" type="submit">Update Doctor</button>
      </form>
    </div>
  );
};

export default page;
