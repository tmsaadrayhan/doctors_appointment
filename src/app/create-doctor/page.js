"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const page = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/doctors.php`, {
        name,
        specialty,
        phone,
        email,
      });

      console.log('Doctor created:', response.data);

      // Redirect to the doctors list page after successful creation
      router.push('/doctors');
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  return (
    <div>
      <h1>Create Doctor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Specialty:</label>
          <input
            type="text"
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button className="bg-[#0147ab] text-[#ffffff] p-[.5rem] my-[.5rem] rounded-xl" type="submit">Create Doctor</button>
      </form>
    </div>
  );
};

export default page;
