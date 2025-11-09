import type { QuotationData } from '../types/quotation';

const STORAGE_KEY = 'vm_construction_quotations';

export interface SavedQuotation extends QuotationData {
  savedAt: string;
  id: string;
}

export const saveQuotation = (quotation: QuotationData): void => {
  const saved = getSavedQuotations();
  
  // Check if quotation with same client name and email exists
  const existingIndex = saved.findIndex(q => 
    q.client.name.toLowerCase().trim() === quotation.client.name.toLowerCase().trim() &&
    q.client.email.toLowerCase().trim() === quotation.client.email.toLowerCase().trim()
  );
  
  const savedQuotation: SavedQuotation = {
    ...quotation,
    id: quotation.quotationNumber,
    savedAt: new Date().toISOString()
  };
  
  if (existingIndex >= 0) {
    // Update existing quotation
    saved[existingIndex] = savedQuotation;
  } else {
    // Add new quotation
    saved.push(savedQuotation);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
};

export const getSavedQuotations = (): SavedQuotation[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const loadQuotation = (quotationNumber: string): SavedQuotation | null => {
  const saved = getSavedQuotations();
  return saved.find(q => q.quotationNumber === quotationNumber) || null;
};

export const deleteQuotation = (quotationNumber: string): void => {
  const saved = getSavedQuotations();
  const filtered = saved.filter(q => q.quotationNumber !== quotationNumber);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};
