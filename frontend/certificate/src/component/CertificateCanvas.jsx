import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const CertificateCanvas = ({ recipient, templateUrl }) => {
  const certRef = useRef();

  const downloadPDF = async () => {
    const canvas = await html2canvas(certRef.current, { useCORS: true });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'pt', [canvas.width, canvas.height]);
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${recipient.name}_certificate.pdf`);
  };

  return (
    <section className="backdrop-blur-md bg-white/30 border border-white/20 rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-3xl font-bold text-blue-700">📜 Preview Certificate</h2>

      <div
        ref={certRef}
        className="relative w-full max-w-4xl mx-auto aspect-[16/9] bg-cover bg-center border shadow-lg"
        style={{ backgroundImage: `url(${templateUrl})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl font-bold text-gray-800">{recipient.name}</h1>
          <p className="text-lg mt-2 text-gray-700">has successfully completed</p>
          <p className="text-2xl mt-2 font-semibold text-indigo-700">{recipient.course}</p>
          <p className="text-md mt-2 text-gray-600">on {recipient.date}</p>
          <p className="text-md mt-1 text-gray-600">Score: <strong>{recipient.score}</strong></p>
        </div>
      </div>

      <div className="text-right">
        <button
          onClick={downloadPDF}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-md shadow hover:shadow-lg hover:scale-105 transition"
        >
          ⬇️ Download PDF
        </button>
      </div>
    </section>
  );
};

export default CertificateCanvas;
