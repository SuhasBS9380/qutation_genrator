import { COMPANY_DATA } from '../constants/companyData';
import './Header.css';

export const Header = () => {
  return (
    <header className="header">
      <div className="header-main">
        <div className="header-left">
          <h1 className="company-name">{COMPANY_DATA.name}</h1>
        </div>
        <div className="header-right">
          <div className="logo-container">
            <img 
              src="/logo.png" 
              alt="VM Constructions Logo" 
              className="company-logo"
            />
          </div>
        </div>
      </div>
      <div className="header-contact">
        <div className="contact-item">
          <span className="contact-icon">📍</span>
          <span>{COMPANY_DATA.address}</span>
        </div>
        <div className="contact-item">
          <span className="contact-icon">📧</span>
          <span>{COMPANY_DATA.email}</span>
        </div>
        <div className="contact-item">
          <span className="contact-icon">📞</span>
          <span>{COMPANY_DATA.phone}</span>
        </div>
      </div>
    </header>
  );
};
