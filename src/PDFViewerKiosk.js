import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Modal } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// ✅ Correct worker source for PDFs
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();
  
const samplePDFs = [
  { id: 1, title: "Angular Router", file: "/1.pdf" },
  { id: 2, title: "Unit 3", file: "/2.pdf" },
  { id: 3, title: "Hello PDF", file: "/3.pdf" },
  { id: 4, title: "Sample PDF", file: "/pdfs/sample.pdf" },
  { id: 5, title: "Testing PDF", file: "/pdfs/sample2.pdf" },
  { id: 6, title: "Angular Router", file: "/pdfs/angular-router.pdf" },
  { id: 7, title: "Unit 3", file: "/pdfs/unit3.pdf" },
  { id: 8, title: "Hello PDF", file: "/pdfs/hello.pdf" },
  { id: 9, title: "Sample PDF", file: "/pdfs/sample.pdf" },
  { id: 10, title: "Testing PDF", file: "/pdfs/sample2.pdf" },
 { id: 11, title: "Angular Router", file: "/pdfs/angular-router.pdf" },
 { id: 12, title: "Unit 3", file: "/pdfs/unit3.pdf" },
 { id: 13, title: "Hello PDF", file: "/pdfs/hello.pdf" },
 { id: 14, title: "Sample PDF", file: "/pdfs/sample.pdf" },
 { id: 15, title: "Testing PDF", file: "/pdfs/sample2.pdf" },
 { id: 16, title: "Angular Router", file: "/pdfs/angular-router.pdf" },
 { id: 17, title: "Unit 3", file: "/pdfs/unit3.pdf" },
 { id: 18, title: "Hello PDF", file: "/pdfs/hello.pdf" },
 { id: 19, title: "Sample PDF", file: "/pdfs/sample.pdf" },
 { id: 20, title: "Testing PDF", file: "/pdfs/sample2.pdf" },
];

const PDFViewer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [currentPDF, setCurrentPDF] = useState(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const openModal = (pdf) => {
    setCurrentPDF(pdf);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">


      {/* ✅ PDF Grid Layout */}
      <div className="pdf-grid">
  {samplePDFs.map((pdf) => (
    <div
      key={pdf.id}
      className="pdf-card"
      onClick={() => openModal(pdf.file)}
    >
      <img src="/pdf-icon.png" alt="PDF Icon" className="pdf-icon" />
      <p className="pdf-title">{pdf.title}</p>
    </div>
  ))}
</div>

      {/* ✅ PDF Fullscreen Modal */}
      <Modal
        title={
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold">📄 PDF Viewer</span>
            <CloseOutlined className="text-red-500 cursor-pointer" onClick={() => setIsModalOpen(false)} />
          </div>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        width="90vw"
        bodyStyle={{ height: "80vh", padding: "0" }}
        closeIcon={null}
      >
        {currentPDF && (
          <div className="pdf-modal">
            <Document file={currentPDF} onLoadSuccess={onDocumentLoadSuccess}>
              {Array.from(new Array(numPages), (_, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} width={800} />
              ))}
            </Document>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default PDFViewer;
