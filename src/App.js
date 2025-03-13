import React, { useState } from "react";
import { Layout, Modal } from "antd";
import { useDrag } from "@use-gesture/react";
import "./App.css";
import KioskHeader from "./Header";
import KioskFooter from "./Footer";

const { Content } = Layout;

const Kiosk = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  // Video List
  const videos = [
    "/SnapTik_App_7464290425516428590-HD.mp4",
    "/ssstik.io_1740660246436.mp4",
    "/ssstik.io_1740575354384.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Swipe Gesture for Video Navigation
  const bind = useDrag(
    ({ movement: [mx], direction: [dx], swipe: [swipeX], cancel }) => {
      if (Math.abs(mx) < 50) return;

      if (swipeX === -1 || (dx < 0 && Math.abs(mx) > 50)) {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        cancel();
      } else if (swipeX === 1 || (dx > 0 && Math.abs(mx) > 50)) {
        setCurrentVideoIndex((prev) =>
          prev === 0 ? videos.length - 1 : prev - 1
        );
        cancel();
      }
    },
    { filterTaps: true, threshold: 10, pointer: { touch: true } }
  );

  return (
    <Layout className="kiosk-container">
      <KioskHeader />

      <div className="kiosk-grid">
        <div className="video-container">
          <div {...bind()} className="video-wrapper">
            <video key={videos[currentVideoIndex]} autoPlay loop muted className="video-bg">
              <source src={videos[currentVideoIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <div className="website-container">
          <iframe
            src="https://your-wordpress-site.com"
            className="website-embed"
            title="Embedded Website"
          ></iframe>
        </div>

        <div className="forms-new-container">
          <div className="forms-container">
            <button className="touch-button" onClick={openModal}>
              Open Google Form
            </button>
          </div>
          <div className="new-container">
            <h1>SUPPOSEDLY A PDF! BUT IM TIRED AS SHIT</h1>
            <p>THIS PDF CONTAINS NUMBERS OF PDF FILES THAT USERS CAN SEARCH BY OF SPECIFIC PDF IDK WHAT THE FUCK IS THAT</p>
          </div>
        </div>
      </div>

      <Modal
        title="Google Form"
        open={isModalVisible}
        onCancel={closeModal}
        footer={null}
        width="100%"
        style={{ top: 0, padding: 0 }}
        bodyStyle={{ height: "100vh", padding: 0, overflow: "hidden" }}
      >
        <iframe
          src="https://docs.google.com/forms/d/e/YOUR_CORRECT_GOOGLE_FORM_LINK/viewform"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Google Form"
        ></iframe>
      </Modal>
      <KioskFooter />
    </Layout>
  );
};

export default Kiosk;