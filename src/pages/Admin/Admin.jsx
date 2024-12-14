import React, { useEffect } from 'react';
import { FaUsers, FaWallet, FaBell, FaEnvelope } from 'react-icons/fa';
import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';

const AdminBox = ({ title, icon, delay, link }) => (
  <div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-xl hover:scale-105"
    data-aos="fade-up"
    data-aos-delay={delay}
  >
    <Link to={link}>
    <div className="text-4xl mb-4 text-blue-600 dark:text-blue-400 flex justify-center">{icon}</div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white text-center">{title}</h3>
    </Link>
  </div>
);

export default function Admin() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="relative z-10 w-full min-h-screen bg-gray-100 dark:bg-black dark:text-white duration-300">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8 text-center" data-aos="fade-down">Admin Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AdminBox title="User Control" icon={<FaUsers />} delay={100} link="user-control" />
          <AdminBox title="Wallet Control" icon={<FaWallet />} delay={200} link="wallet-control"/>
          <AdminBox title="Notification Control" icon={<FaBell />} delay={300} link="notification-control" />
          <AdminBox title="Contact Requests" icon={<FaEnvelope />} delay={400} link="contact-requests" />
        </div>
      </div>
    </div>
  );
}

