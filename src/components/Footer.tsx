import { BANK_DETAILS } from '../constants/companyData';
import './Footer.css';

export const Footer = () => {
  return (
    <div className="quotation-footer">
      <div className="footer-content">
        <div className="bank-details">
          <span className="bank-label">Bank A/c Details:</span>
          <span className="bank-info">
            <strong>{BANK_DETAILS.accountName}</strong> | Bank: {BANK_DETAILS.bankName} | 
            A/c No: {BANK_DETAILS.accountNumber} | IFSC: {BANK_DETAILS.ifscCode}
          </span>
        </div>
        <div className="footer-message">
          We hope that you will find our offer favorable and place your valued order on us. 
          We assure you of our best services at all time.
        </div>
      </div>
    </div>
  );
};
