import { COMPANY_DATA } from '../constants/companyData';
import './CompanySection.css';

export const CompanySection = () => {
  return (
    <div className="company-section">
      <h3 className="section-title">Company Details</h3>
      <div className="detail-row">
        <span className="detail-label">Proprietor:</span>
        <span className="detail-value">{COMPANY_DATA.proprietor}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">GST No:</span>
        <span className="detail-value">{COMPANY_DATA.gstNumber}</span>
      </div>
      <div className="detail-row">
        <span className="detail-label">State:</span>
        <span className="detail-value">{COMPANY_DATA.state}</span>
      </div>
    </div>
  );
};
