"use client"
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const { year, month } = params;
  const [dates, setDates] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          `${process.env.NEXT_PUBLIC_API_URL}/appointments.php?year=${year}&month=${month}`
        );
        console.log(response);
        setDates(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch month");
        setLoading(false);
      }
    };

    fetchMonth();
  }, []);
  return (
    <div>
      <p>Year: {year}</p>
      <p>Month: {name[month]}</p>
      <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <table border="1" cellPadding="10">
              <div>
                {dates?.map((date, index) => (
                  <div key={index}>
                    <Link href={`/appointments/${year}/${month}/${date}`}>{date}</Link>
                  </div>
                ))}
              </div>
            </table>
          )}
        </div>
    </div>
  );
};

export default page;
