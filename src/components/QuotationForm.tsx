import { useState } from 'react';
import type { ClientInfo, ServiceItem, QuotationData } from '../types/quotation';
import { Header } from './Header';
import { ClientSection } from './ClientSection';
import { CompanySection } from './CompanySection';
import { ServicesTable } from './ServicesTable';
import { TermsSection } from './TermsSection';
import { DownloadButton } from './DownloadButton';
import { SavedQuotationsList } from './SavedQuotationsList';
import { saveQuotation, type SavedQuotation } from '../utils/storage';
import './QuotationForm.css';

const generateId = () => Math.random().toString(36).substring(2, 11);

const createEmptyService = (): ServiceItem => ({
  id: generateId(),
  service: '',
  description: '',
  uom: '',
  quantity: 0,
  unitPrice: 0,
  totalPrice: 0,
  remarks: ''
});

const generateQuotationNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `VMC-${year}${month}-${random}`;
};

export const QuotationForm = () => {
  const [clientInfo, setClientInfo] = useState<ClientInfo>({
    name: '',
    address: '',
    phone: '',
    email: ''
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    // Initialize with 6 empty service rows
    return Array.from({ length: 6 }, createEmptyService);
  });

  const [quotationNumber] = useState(generateQuotationNumber());
  const [date] = useState(new Date().toLocaleDateString('en-IN'));
  const [gstPercentage, setGstPercentage] = useState<number>(18);
  const [termsAndConditions, setTermsAndConditions] = useState<string[]>([
    'Validity: Estimate valid for 30 days.',
    'Payment: Late payments may result in extra charges.',
    'Changes: Scope changes may incur additional charges, documented via change orders.',
    'Cancellation: May forfeit deposit if canceled.',
    'Warranty: One-year workmanship warranty; manufacturer warranties apply to materials.'
  ]);
  const [showSavedList, setShowSavedList] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleClientChange = (field: keyof ClientInfo, value: string) => {
    setClientInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceUpdate = (id: string, field: keyof ServiceItem, value: string | number) => {
    setServices(prev => prev.map(service => {
      if (service.id === id) {
        const updated = { ...service, [field]: value };
        
        // Recalculate total price if quantity or unitPrice changed
        if (field === 'quantity' || field === 'unitPrice') {
          updated.totalPrice = updated.quantity * updated.unitPrice;
        }
        
        return updated;
      }
      return service;
    }));
  };

  const handleAddService = () => {
    if (services.length < 20) {
      setServices(prev => [...prev, createEmptyService()]);
    }
  };

  const handleDeleteService = (id: string) => {
    if (services.length > 1) {
      setServices(prev => prev.filter(service => service.id !== id));
    }
  };

  const handleSave = () => {
    saveQuotation(quotationData);
    setSaveMessage('Quotation saved successfully!');
    setTimeout(() => setSaveMessage(null), 3000);
  };

  const handleLoadQuotation = (saved: SavedQuotation) => {
    setClientInfo(saved.client);
    setServices(saved.services);
    setGstPercentage(saved.gstPercentage);
    if (saved.termsAndConditions && saved.termsAndConditions.length > 0) {
      setTermsAndConditions(saved.termsAndConditions);
    }
  };

  const quotationData: QuotationData = {
    client: clientInfo,
    services,
    date,
    quotationNumber,
    termsAndConditions,
    gstPercentage
  };

  return (
    <div className="quotation-form">
      <button className="load-saved-btn" onClick={() => setShowSavedList(true)}>
        📂 Load Saved Quotations
      </button>
      
      <DownloadButton quotationData={quotationData} />
      
      <Header />
      
      <div className="info-sections">
        <ClientSection clientInfo={clientInfo} onChange={handleClientChange} />
        <CompanySection />
      </div>
      
      <ServicesTable
        services={services}
        onUpdate={handleServiceUpdate}
        onAdd={handleAddService}
        onDelete={handleDeleteService}
        gstPercentage={gstPercentage}
        onGstChange={setGstPercentage}
      />
      
      <TermsSection terms={termsAndConditions} onChange={setTermsAndConditions} />
      
      <div className="save-section">
        <button className="save-btn" onClick={handleSave}>
          💾 Save Quotation
        </button>
        {saveMessage && <span className="save-message">{saveMessage}</span>}
      </div>
      
      {showSavedList && (
        <SavedQuotationsList
          onLoad={handleLoadQuotation}
          onClose={() => setShowSavedList(false)}
        />
      )}
    </div>
  );
};
