import { useState } from 'react';
import './TermsSection.css';

interface TermsSectionProps {
  terms: string[];
  onChange: (terms: string[]) => void;
}

export const TermsSection = ({ terms, onChange }: TermsSectionProps) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleAddTerm = () => {
    onChange([...terms, '']);
    setEditingIndex(terms.length);
    setEditValue('');
  };

  const handleEditTerm = (index: number) => {
    setEditingIndex(index);
    setEditValue(terms[index]);
  };

  const handleSaveTerm = (index: number) => {
    if (editValue.trim()) {
      const newTerms = [...terms];
      newTerms[index] = editValue.trim();
      onChange(newTerms);
    }
    setEditingIndex(null);
    setEditValue('');
  };

  const handleDeleteTerm = (index: number) => {
    if (confirm('Are you sure you want to delete this term?')) {
      const newTerms = terms.filter((_, i) => i !== index);
      onChange(newTerms);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter') {
      handleSaveTerm(index);
    } else if (e.key === 'Escape') {
      setEditingIndex(null);
      setEditValue('');
    }
  };

  return (
    <div className="terms-section">
      <div className="terms-header">
        <h3 className="terms-title">Terms and Conditions</h3>
        <button className="add-term-btn" onClick={handleAddTerm} title="Add new term">
          + Add Term
        </button>
      </div>
      
      <ul className="terms-list">
        {terms.map((term, index) => (
          <li key={index} className="term-item">
            {editingIndex === index ? (
              <div className="term-edit-container">
                <input
                  type="text"
                  className="term-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, index)}
                  placeholder="Enter term (e.g., Validity: Estimate valid for 30 days)"
                  autoFocus
                />
                <div className="term-actions">
                  <button 
                    className="save-term-btn" 
                    onClick={() => handleSaveTerm(index)}
                    title="Save"
                  >
                    ✓
                  </button>
                  <button 
                    className="cancel-term-btn" 
                    onClick={() => {
                      setEditingIndex(null);
                      setEditValue('');
                    }}
                    title="Cancel"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ) : (
              <div className="term-display">
                <span className="term-text">{term}</span>
                <div className="term-actions">
                  <button 
                    className="edit-term-btn" 
                    onClick={() => handleEditTerm(index)}
                    title="Edit term"
                  >
                    ✎
                  </button>
                  <button 
                    className="delete-term-btn" 
                    onClick={() => handleDeleteTerm(index)}
                    title="Delete term"
                  >
                    🗑
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
      
      {terms.length === 0 && (
        <p className="no-terms-message">No terms added yet. Click "Add Term" to get started.</p>
      )}
    </div>
  );
};
