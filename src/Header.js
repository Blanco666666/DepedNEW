import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import "./Header.css"; // Ensure your styles are updated

const { Header } = Layout;

const KioskHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer); // Cleanup on unmount
  }, []);

  return (
    <Header className="header">
      <div className="header-content">
        {/* Logo on the left */}
        <img src="https://cert.depedcaraga.site/images/depedcaraga_logo.png" alt="Kiosk Logo" className="header-logo" />
        <img src="https://logolook.net/wp-content/uploads/2021/06/DepEd-Logo.svg" alt="Kiosk Logo" className="header-logo" />


        {/* Date & Time on the right */}
        <div className="header-time">
          {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </Header>
  );
};

export default KioskHeader;
