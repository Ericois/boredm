import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function BoringLog() {
  const documentRef = useRef<HTMLDivElement>(null);

  const handleSavePDF = async () => {
    const element = documentRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      
      const pdfWidth = 297; // mm
      const pdfHeight = 210; // mm
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = imgWidth / imgHeight;
      
      let finalWidth = pdfWidth;
      let finalHeight = pdfWidth / ratio;
      
      // If height exceeds page, scale to fit
      if (finalHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = pdfHeight * ratio;
      }

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, 0, finalWidth, finalHeight);
      
      // Save the PDF
      pdf.save('Result.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5', padding: '20px' }}>
      <style>{`
        @page {
          size: A4 landscape;
          margin: 20mm;
        }

        @media print {
          body {
            background: white !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .document {
            box-shadow: none !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1000px', margin: '0 auto', backgroundColor: 'white', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        
        <div className="no-print" style={{ marginBottom: '20px', textAlign: 'center' }}>
          <button 
            onClick={handleSavePDF}
            style={{
              padding: '12px 30px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Save as PDF (Result.pdf)
          </button>
          <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
            Click the button above to download the PDF file
          </p>
        </div>

        <div ref={documentRef} style={{ border: '2px solid #000' }}>
          
          <div style={{ display: 'flex' }}>
            <div style={{ width: '25%', padding: '20px', borderRight: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '28px', fontWeight: 'bold' }}>
                <svg width="23" height="46" viewBox="0 0 46 92" style={{ marginRight: '8px' }}>
                  <path d="M20 4 H36 V68 L26 78 L20 70 V4 Z" fill="#111"/>
                  <polygon points="20,12 36,20 36,24 20,16" fill="#fff"/>
                  <polygon points="19,33 36,41 36,45 19,37" fill="#fff"/>
                  <polygon points="20,53 36,61 36,65 20,57" fill="#fff"/>
                </svg>
                <span>BORE<span style={{ color: '#888' }}>DM</span></span>
              </div>
            </div>
            <div style={{ width: '50%', padding: '20px', borderRight: '2px solid #000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Riverside Condominiums</div>
              <div style={{ fontSize: '16px', fontWeight: 'bold' }}>General Location - Project</div>
            </div>
            <div style={{ width: '25%', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold' }}>
              B-17
            </div>
          </div>

          <div style={{ display: 'flex', borderBottom: '2px solid #000' }}>
            <div style={{ width: '25%', padding: '10px 15px', borderRight: '2px solid #000', fontSize: '12px' }}>
            </div>
            <div style={{ width: '50%', padding: '10px 15px', borderRight: '2px solid #000', fontSize: '12px' }}>
            </div>
            <div style={{ width: '25%', padding: '10px 15px', fontSize: '12px', textAlign: 'right' }}>
              Page 1 of 1
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '33.33%', padding: '12px 15px', borderRight: '2px solid #000', fontSize: '12px', display: 'flex', alignItems: 'center', borderBottom: '2px solid #000' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Drilling Firm:</span>
              <span>BoreDM Drilling</span>
            </div>
            <div style={{ width: '33.33%', padding: '12px 15px', borderRight: '2px solid #000', fontSize: '12px', display: 'flex', alignItems: 'center', borderBottom: '2px solid #000' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Project No.:</span>
              <span>25-3332</span>
            </div>
            <div style={{ width: '33.33%', padding: '12px 15px', fontSize: '12px', display: 'flex', alignItems: 'flex-start', paddingTop: '12px' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Remarks:</span>
              <span>-</span>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '33.33%', padding: '12px 15px', borderRight: '2px solid #000', fontSize: '12px', display: 'flex', alignItems: 'center', borderBottom: '2px solid #000' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Driller:</span>
              <span>PA</span>
            </div>
            <div style={{ width: '33.33%', padding: '12px 15px', borderRight: '2px solid #000', fontSize: '12px', display: 'flex', alignItems: 'center', borderBottom: '2px solid #000' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Date Drilled:</span>
              <span>03/05/2025</span>
            </div>
            <div style={{ width: '33.33%', padding: '12px 15px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <span></span>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '33.33%', padding: '12px 15px', borderRight: '2px solid #000', fontSize: '12px', display: 'flex', alignItems: 'center', borderBottom: '2px solid #000' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Logged By:</span>
              <span>LA</span>
            </div>
            <div style={{ width: '33.33%', padding: '12px 15px', borderRight: '2px solid #000', fontSize: '12px', display: 'flex', alignItems: 'center', borderBottom: '2px solid #000' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Boring Depth:</span>
              <span>-</span>
            </div>
            <div style={{ width: '33.33%', padding: '12px 15px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <span></span>
            </div>
          </div>

          <div style={{ display: 'flex', borderBottom: '2px solid #000' }}>
            <div style={{ width: '33.33%', padding: '12px 15px', borderRight: '2px solid #000', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <svg width="20" height="24" viewBox="0 0 20 24" style={{ marginRight: '8px' }}>
                <polygon points="0,0 10,12 10,0" fill="#000" />
                <polygon points="10,0 20,0 10,12" fill="#fff" stroke="#000" strokeWidth="1" />
                <line x1="0" y1="14" x2="20" y2="14" stroke="#000" strokeWidth="1.5" />
                <line x1="6" y1="18" x2="14" y2="18" stroke="#000" strokeWidth="1.5" />
              </svg>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Water :</span>
              <span>N/A</span>
            </div>
            <div style={{ width: '33.33%', padding: '12px 15px', borderRight: '2px solid #000', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Boring Elevation:</span>
              <span>N/A</span>
            </div>
            <div style={{ width: '33.33%', padding: '12px 15px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <span></span>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div style={{ width: '33.33%', padding: '12px 15px', borderRight: '2px solid #000', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Hammer Type:</span>
              <span>-</span>
            </div>
            <div style={{ width: '66.66%', padding: '12px 15px', fontSize: '12px', display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '15px', whiteSpace: 'nowrap' }}>Brand Address:</span>
              <span>4909 N. 44th St, Phoenix, AZ 85018</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}