import React, { useState } from "react";
import { Layout, Modal } from "antd";
import { useDrag } from "@use-gesture/react";
import "./App.css";
import KioskHeader from "./Header";
import KioskFooter from "./Footer";
import PDFViewerKiosk from "./PDFViewerKiosk";

const Kiosk = () => {
  const [isExternalModalVisible, setIsExternalModalVisible] = useState(false);
  const [isInternalModalVisible, setIsInternalModalVisible] = useState(false);

  const openExternalModal = () => setIsExternalModalVisible(true);
  const closeExternalModal = () => setIsExternalModalVisible(false);

  const openInternalModal = () => setIsInternalModalVisible(true);
  const closeInternalModal = () => setIsInternalModalVisible(false);

  const videos = [
    "/SnapTik_App_7464290425516428590-HD.mp4",
    "/ssstik.io_1740660246436.mp4",
    "/ssstik.io_1740575354384.mp4",
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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
    <Layout
      className="kiosk-container"
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/bg.png")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <KioskHeader />

      <div className="kiosk-grid">
        {/* Video Section */}
        <div className="video-container">
          <div {...bind()} className="video-wrapper">
            <video key={videos[currentVideoIndex]} autoPlay loop muted className="video-bg">
              <source src={videos[currentVideoIndex]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Website Section */}
        <div className="website-container">
          <iframe
            src="https://your-wordpress-site.com"
            className="website-embed"
            title="Embedded Website"
          ></iframe>
        </div>

        {/* Forms and PDF Section */}
        <div className="forms-new-container">
          <div className="forms-container">
            <button className="touch-button" onClick={openExternalModal}>
              External
            </button>
            <button className="touch-button" onClick={openInternalModal}>
              Internal
            </button>
          </div>
          
          {/* PDF Section */}
          <div className="new-container">
          </div>
        </div>
      </div>

      {/* External Modal */}
      <Modal
        title="Google Form - External"
        open={isExternalModalVisible}
        onCancel={closeExternalModal}
        footer={null}
        width="100%"
        style={{ top: 0, padding: 0 }}
        bodyStyle={{ height: "100vh", padding: 0, overflow: "hidden" }}
      >
        <iframe
          src="https://csm.p2.depedcaraga.site/form/1/1/1/eyJpdiI6IlhBOC9HNFN0ZnZScUxWb1FhK2hiZ3c9PSIsInZhbHVlIjoidVBETnhSa2NOa3dNczA4L29zZ1RJUT09IiwibWFjIjoiZWI1ODJkNGY3MDIzZTNlNmNlMzY0YWUyN2MzNjk0YTk4MDYyZWQ2Mjc0MzdkYTViOGI1Nzk0ODM5NDFjZWQ5MiIsInRhZyI6IiJ9"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Google Form - External"
        ></iframe>
      </Modal>

      {/* Internal Modal */}
      <Modal
        title="Google Form - Internal"
        open={isInternalModalVisible}
        onCancel={closeInternalModal}
        footer={null}
        width="100%"
        style={{ top: 0, padding: 0 }}
        bodyStyle={{ height: "100vh", padding: 0, overflow: "hidden" }}
      >
        <iframe
          src="https://csm.p2.depedcaraga.site/form/1/1/0/eyJpdiI6IkpPUndiK3JWMWZWT0dDRGxHRDNYaWc9PSIsInZhbHVlIjoiNWpzVy9KR0dNMUIvcndCWHhuNWxsQT09IiwibWFjIjoiYTdhYmZkYmYzZmI1YzM3ZGE2MWExZjRhMzIzMTEwYzY0Y2EwN2I4ZWNjYmVhZjQxYWQyMTJjMDNlNDMxYTE2MSIsInRhZyI6IiJ9"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Google Form - Internal"
        ></iframe>
      </Modal>

      <KioskFooter />
    </Layout>
  );
};

export default Kiosk;
