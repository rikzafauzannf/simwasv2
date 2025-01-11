import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface PropsComponent {
  children: React.ReactNode;
}
const PdfGenerator: React.FC<PropsComponent> = ({ children }) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleGeneratePdf = async (): Promise<void> => {
    if (printRef.current) {
      const element = printRef.current;

      // Menggunakan html2canvas untuk menangkap elemen sebagai gambar
      const canvas = await html2canvas(element, { scale: 2 }); // Skala untuk resolusi lebih baik
      const data = canvas.toDataURL('image/png');

      // Membuat instance jsPDF
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 190; // Lebar gambar dalam PDF (mm)
      const pageHeight = 297; // Tinggi halaman PDF (mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Menambahkan gambar ke PDF
      pdf.addImage(data, 'PNG', 10, position + 10, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Tambahkan halaman jika konten melebihi satu halaman
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(data, 'PNG', 10, position + 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Simpan file PDF
      pdf.save('document.pdf');
    }
  };

  return (
    <div>
      <button onClick={handleGeneratePdf} style={{ marginBottom: '20px' }}>
        Generate PDF
      </button>
      <div
        ref={printRef}
        style={{
          padding: '20px',
          backgroundColor: 'white',
          border: '1px solid #ddd',
          borderRadius: '5px',
        }}
      >
        {children}
        {/* <h1>Judul Tabel</h1>
        <table
          border={1}
          style={{
            borderCollapse: "collapse",
            width: "100%",
            textAlign: "left",
          }}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Alamat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>John Doe</td>
              <td>Jakarta</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jane Smith</td>
              <td>Bandung</td>
            </tr>
          </tbody>
        </table> */}
      </div>
    </div>
  );
};

export default PdfGenerator;
