'use client';

import React, { useRef, useState } from 'react';
import styles from '@/app/css/pdf-generator.module.css';

interface PropsComponent {
  children: React.ReactNode;
}

const PdfGenerator: React.FC<PropsComponent> = ({ children }) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Method to generate PDF
  const handleGeneratePdf = async (): Promise<void> => {
    if (!printRef.current) return;

    try {
      setIsGenerating(true);
      const element = printRef.current;

      // Try the html2pdf approach first
      try {
        // Import libraries only when needed (client-side)
        const html2pdfModule = (await import('html2pdf.js')) as any;
        const html2pdf = html2pdfModule.default;

        const opt = {
          margin: [10, 10, 10, 10],
          filename: 'document.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            logging: false,
          },
          jsPDF: {
            unit: 'pt',
            format: 'a4',
            orientation: 'landscape',
            compress: true,
          },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        };

        // Use html2pdf which preserves text and layout better
        await html2pdf().from(element).set(opt).save();
        setIsGenerating(false);
        return; // Exit if successful
      } catch (error) {
        console.warn(
          'html2pdf approach failed, falling back to html2canvas method',
          error
        );
      }

      // Fallback to html2canvas + jsPDF approach
      const html2canvasModule = await import('html2canvas');
      const html2canvas = html2canvasModule.default;

      const jsPDFModule = await import('jspdf');
      const jsPDF = jsPDFModule.default;

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      // Create a new jsPDF instance with landscape orientation
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'a4',
      });

      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      // Add the image to the PDF
      pdf.addImage(
        imgData,
        'JPEG',
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      // For multi-page support
      let heightLeft = imgHeight * ratio;
      let position = 0;

      // Add new pages if content overflows
      while (heightLeft > pdfHeight - 40) {
        position = heightLeft - imgHeight * ratio;
        pdf.addPage();
        pdf.addImage(
          imgData,
          'JPEG',
          imgX,
          position,
          imgWidth * ratio,
          imgHeight * ratio
        );
        heightLeft -= pdfHeight - 40;
      }

      // Save the PDF
      pdf.save('document.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={styles.printBody}>
      <button
        onClick={handleGeneratePdf}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2"
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                clipRule="evenodd"
              />
            </svg>
            Generate PDF
          </>
        )}
      </button>

      <div
        ref={printRef}
        className="pdf-container mt-4"
        style={{
          backgroundColor: 'white',
          width: '100%',
          overflowX: 'auto',
        }}
      >
        {/* <div className={styles.pdfContainer}> */}
        {children}
        {/* </div> */}
      </div>
    </div>
  );
};

export default PdfGenerator;
