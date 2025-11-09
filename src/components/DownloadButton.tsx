import { useState } from 'react';
import type { QuotationData } from '../types/quotation';
import { generateQuotationPDF } from '../utils/pdfGenerator';
import { isQuotationValid } from '../utils/validation';
import './DownloadButton.css';

interface DownloadButtonProps {
  quotationData: QuotationData;
}

export const DownloadButton = ({ quotationData }: DownloadButtonProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Validate quotation data
      const validation = isQuotationValid(
        quotationData.client.name,
        quotationData.services.length
      );

      if (!validation.valid) {
        throw new Error(validation.message);
      }

      // Generate PDF (now async to load logo)
      await generateQuotationPDF(quotationData);

      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate PDF');
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="download-button-container">
      <button
        onClick={handleDownload}
        disabled={isGenerating}
        className="download-btn"
        type="button"
      >
        {isGenerating ? (
          <>
            <span className="spinner"></span>
            Generating...
          </>
        ) : (
          <>
            <span className="download-icon">⬇</span>
            Download PDF
          </>
        )}
      </button>
      
      {showSuccess && (
        <div className="toast success-toast">
          ✓ PDF downloaded successfully!
        </div>
      )}
      
      {error && (
        <div className="toast error-toast">
          ✕ {error}
        </div>
      )}
    </div>
  );
};
