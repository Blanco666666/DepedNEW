import React, { useState } from "react";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const samplePDFs = [
  { id: 1, title: "Angular Router", file: "/1.pdf" },
  { id: 2, title: "Unit 3", file: "/2.pdf" },
  { id: 3, title: "Hello PDF", file: "/3.pdf" },
  { id: 4, title: "Sample PDF", file: "/pdfs/sample.pdf" },
  { id: 5, title: "Testing PDF", file: "/pdfs/sample2.pdf" },
  { id: 6, title: "Angular Router", file: "/pdfs/angular-router.pdf" },
  { id: 7, title: "Unit 3", file: "/pdfs/unit3.pdf" },
  { id: 8, title: "Hello PDF", file: "/pdfs/hello.pdf" },
];

const PDFViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPDF, setCurrentPDF] = useState(null);

  const openModal = (pdf) => {
    setCurrentPDF(pdf);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* ✅ PDF Grid Layout */}
      <div className="pdf-grid">
        {samplePDFs.map((pdf) => (
          <div key={pdf.id} className="pdf-card" onClick={() => openModal(pdf.file)}>
            <img src="/pdf-icon.png" alt="PDF Icon" className="pdf-icon" />
            <p className="pdf-title">{pdf.title}</p>
          </div>
        ))}
      </div>

      {/* ✅ PDF Fullscreen Modal */}
<Modal
  title="📄 PDF Viewer"
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
  centered
  width="90vw"
  bodyStyle={{
    height: "80vh",
    padding: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fff", // Ensure modal background is visible
  }}
  closeIcon={<CloseOutlined className="text-red-500 cursor-pointer" />}
>
  {currentPDF && (
    <iframe
      src={currentPDF}
      width="100%"
      height="100%"
      style={{ border: "none", minHeight: "75vh" }}
      title="PDF Viewer"
    ></iframe>
  )}
</Modal>
    </div>
  );
};

export default PDFViewer;
