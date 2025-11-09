export interface ClientInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface ServiceItem {
  id: string;
  service: string;
  description: string;
  uom: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  remarks: string;
}

export interface QuotationData {
  client: ClientInfo;
  services: ServiceItem[];
  date: string;
  quotationNumber: string;
  termsAndConditions: string[];
  gstPercentage: number;
}

export interface CompanyDetails {
  name: string;
  proprietor: string;
  gstNumber: string;
  state: string;
  address: string;
  phone: string;
  email: string;
  tagline: string;
}
