"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const page = ({ params }) => {
  const { year } = params;
  const [months, setMonths] = useState([]);
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
  // Fetch month when the component is mounted
  useEffect(() => {
    const fetchMonth = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments.php?year=${year}`
        );
        const data = await response.json();
        setMonths(data);
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
      <div>
        
        <p>Year: {year}</p>
        <div>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <table border="1" cellPadding="10">
              <div>
                {months.map((month, index) => (
                  <div key={index}>
                    <Link href={`/appointments/${year}/${month}`}>{name[month-1]}</Link>
                  </div>
                ))}
              </div>
            </table>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default page;
