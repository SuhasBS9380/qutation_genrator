import { useState } from 'react';
import { getSavedQuotations, deleteQuotation, type SavedQuotation } from '../utils/storage';
import './SavedQuotationsList.css';

interface SavedQuotationsListProps {
  onLoad: (quotation: SavedQuotation) => void;
  onClose: () => void;
}

export const SavedQuotationsList = ({ onLoad, onClose }: SavedQuotationsListProps) => {
  const [quotations, setQuotations] = useState<SavedQuotation[]>(getSavedQuotations());

  const handleDelete = (quotationNumber: string) => {
    if (confirm('Are you sure you want to delete this quotation?')) {
      deleteQuotation(quotationNumber);
      setQuotations(getSavedQuotations());
    }
  };

  const handleLoad = (quotation: SavedQuotation) => {
    onLoad(quotation);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Saved Quotations</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="quotations-list">
          {quotations.length === 0 ? (
            <p className="empty-message">No saved quotations yet</p>
          ) : (
            quotations.map((quotation) => (
              <div key={quotation.id} className="quotation-item">
                <div className="quotation-info">
                  <h3>{quotation.quotationNumber}</h3>
                  <p className="client-name">{quotation.client.name || 'No client name'}</p>
                  <p className="saved-date">
                    Saved: {new Date(quotation.savedAt).toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="quotation-actions">
                  <button 
                    className="load-btn" 
                    onClick={() => handleLoad(quotation)}
                  >
                    Load
                  </button>
                  <button 
                    className="delete-btn" 
                    onClick={() => handleDelete(quotation.quotationNumber)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
