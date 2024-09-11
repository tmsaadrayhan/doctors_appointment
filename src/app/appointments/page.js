"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const page = () => {
  const [years, setYears] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Fetch years when the component is mounted
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments.php?years=true`
        );
        const data = await response.json();
        console.log(data)
        setYears(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch years");
        setLoading(false);
      }
    };

    fetchYears();
  }, []);
  return (
    <div>
      <p>Years</p>
      <div>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <table border="1" cellPadding="10">
            
            <div>
              {years.map((year, index) => (
                <div key={index}>
                  <Link href={`/appointments/${year}`}>{year}</Link>
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
