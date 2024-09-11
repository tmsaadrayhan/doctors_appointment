"use client";
import axios from "axios";
import { useEffect, useState } from "react";

const page = () => {
  const [doctorsData, setDoctorsData]= useState();
  const [appointmentsData, setAppointmentsData]= useState();
  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/doctors.php`);
      if (response.status === 200) {
        setDoctorsData(response.data);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/appointments.php`);
      if (response.status === 200) {
        setAppointmentsData(response.data);
      } else {
        console.error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
   
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <p>Doctors({doctorsData?.length})</p>
      <p>Appointment({appointmentsData?.length})</p>
    </div>
  );
};

export default page;
