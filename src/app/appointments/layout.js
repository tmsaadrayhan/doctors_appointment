import Link from "next/link";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <p>Appointment</p>
      {children}
      <Link className="bg-[#0147ab] text-[#ffffff] p-[.5rem] my-[.5rem] rounded-xl" href="/get-appointment">Get Appointment</Link>
    </div>
  );
}
