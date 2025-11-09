import type { ClientInfo } from '../types/quotation';
import { validateEmail, validatePhone } from '../utils/validation';
import './ClientSection.css';

interface ClientSectionProps {
  clientInfo: ClientInfo;
  onChange: (field: keyof ClientInfo, value: string) => void;
}

export const ClientSection = ({ clientInfo, onChange }: ClientSectionProps) => {
  const isEmailValid = validateEmail(clientInfo.email);
  const isPhoneValid = validatePhone(clientInfo.phone);
  const isNameEmpty = !clientInfo.name || clientInfo.name.trim() === '';

  return (
    <div className="client-section">
      <h3 className="section-title">Billed To</h3>
      <div className="form-group">
        <label htmlFor="client-name">
          Name: {isNameEmpty && <span className="required-indicator">*</span>}
        </label>
        <input
          id="client-name"
          type="text"
          value={clientInfo.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Client name"
          className={isNameEmpty ? 'input-warning' : ''}
        />
      </div>
      <div className="form-group">
        <label htmlFor="client-address">Address:</label>
        <input
          id="client-address"
          type="text"
          value={clientInfo.address}
          onChange={(e) => onChange('address', e.target.value)}
          placeholder="Client address"
        />
      </div>
      <div className="form-group">
        <label htmlFor="client-phone">Phone:</label>
        <input
          id="client-phone"
          type="tel"
          value={clientInfo.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="Phone number"
          className={!isPhoneValid ? 'input-error' : ''}
        />
        {!isPhoneValid && clientInfo.phone && (
          <span className="error-message">Invalid phone format</span>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="client-email">Email:</label>
        <input
          id="client-email"
          type="email"
          value={clientInfo.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="Email address"
          className={!isEmailValid ? 'input-error' : ''}
        />
        {!isEmailValid && clientInfo.email && (
          <span className="error-message">Invalid email format</span>
        )}
      </div>
    </div>
  );
};
