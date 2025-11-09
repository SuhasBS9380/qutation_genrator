export const validateEmail = (email: string): boolean => {
  if (!email) return true; // Allow empty
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  if (!phone) return true; // Allow empty
  // Accept various phone formats
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone);
};

export const validatePositiveNumber = (value: number): boolean => {
  return value >= 0;
};

export const isQuotationValid = (clientName: string, servicesCount: number): { valid: boolean; message?: string } => {
  if (!clientName || clientName.trim() === '') {
    return { valid: false, message: 'Client name is required' };
  }
  
  if (servicesCount === 0) {
    return { valid: false, message: 'At least one service is required' };
  }
  
  return { valid: true };
};
