import type { QuotationData } from '../types/quotation';

// Use environment variable or default to localhost for development
const API_URL = (import.meta as any).env?.PROD 
  ? '/api'  // Production (Vercel) - relative path
  : 'http://localhost:3001/api';  // Development - local server

export interface SavedQuotation extends QuotationData {
  savedAt: string;
  id: string;
}

export const saveQuotation = async (quotation: QuotationData): Promise<void> => {
  const savedQuotation: SavedQuotation = {
    ...quotation,
    id: quotation.quotationNumber,
    savedAt: new Date().toISOString()
  };
  
  try {
    const response = await fetch(`${API_URL}/quotations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(savedQuotation)
    });
    
    if (!response.ok) {
      throw new Error('Failed to save quotation');
    }
  } catch (error) {
    console.error('Save error:', error);
    throw error;
  }
};

export const getSavedQuotations = async (): Promise<SavedQuotation[]> => {
  try {
    const response = await fetch(`${API_URL}/quotations`);
    if (!response.ok) {
      throw new Error('Failed to load quotations');
    }
    return await response.json();
  } catch (error) {
    console.error('Load error:', error);
    return [];
  }
};

export const loadQuotation = async (quotationNumber: string): Promise<SavedQuotation | null> => {
  const saved = await getSavedQuotations();
  return saved.find(q => q.quotationNumber === quotationNumber) || null;
};

export const deleteQuotation = async (quotationNumber: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/quotations/${quotationNumber}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete quotation');
    }
  } catch (error) {
    console.error('Delete error:', error);
    throw error;
  }
};
