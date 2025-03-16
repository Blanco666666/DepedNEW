import { useState, useEffect } from "react";
import "./pdfviewerkiosk.css";

const pdfData = [
  { name: "Angular Router Crash Course", title: "Angular Router", description: "Description 1", url: "Angular_Router_Crash_Course.pdf" },
  { name: "Unit 3", title: "Unit", description: "Description 2", url: "unit3-4.pdf" },
  { name: "Hello PDF", title: "Hello PDF", description: "Description 3", url: "hello.pdf" },
  { name: "This is for test", title: "Sample PDF", description: "Description 3", url: "pdf-sample.pdf" },
  { name: "Testing", title: "Sample PDF", description: "Description 3", url: "sample.pdf" }
];

const PDFViewerKiosk = () => {
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    document.onkeydown = function (e) {
      if (e.ctrlKey || e.altKey) {
        return false;
      }
    };

    window.addEventListener("contextmenu", function (e) {
      e.preventDefault();
    }, false);
  }, []);

  return (
    <div className="container">
      <h1 className="main-title">PDF Reader with Searching and Navigating</h1>
      <div className="grid">
        {pdfData.map((pdf, index) => (
          <div key={index} className="box" title="Click to view" onClick={() => { setSelectedPDF(pdf.url); setShowModal(true); }}>
            <img src="/pdf.png" alt="pdf" className="w-12 mx-auto block mb-3" />
            <div className="f">
              <h6 className="text-xl mb-1">{pdf.title}</h6>
              <p className="text-sm">{pdf.name}</p>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button onClick={() => setShowModal(false)}>Close</button>
            <iframe src={selectedPDF} width="100%" height="500px" title="PDF Viewer"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewerKiosk;
