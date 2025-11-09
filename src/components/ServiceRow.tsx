import type { ServiceItem } from '../types/quotation';
import './ServiceRow.css';

interface ServiceRowProps {
  service: ServiceItem;
  onChange: (id: string, field: keyof ServiceItem, value: string | number) => void;
  onDelete: (id: string) => void;
  index: number;
}

export const ServiceRow = ({ service, onChange, onDelete, index }: ServiceRowProps) => {
  const handleQuantityChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    // Ensure positive number
    if (numValue >= 0) {
      onChange(service.id, 'quantity', numValue);
    }
  };

  const handleUnitPriceChange = (value: string) => {
    const numValue = parseFloat(value) || 0;
    // Ensure positive number
    if (numValue >= 0) {
      onChange(service.id, 'unitPrice', numValue);
    }
  };

  const isEvenRow = index % 2 === 0;

  return (
    <tr className={`service-row ${isEvenRow ? 'even-row' : 'odd-row'}`}>
      <td className="sr-no-cell">{index + 1}</td>
      <td>
        <input
          type="text"
          value={service.service}
          onChange={(e) => onChange(service.id, 'service', e.target.value)}
          placeholder="Service name"
          className="service-input"
        />
      </td>
      <td>
        <input
          type="text"
          value={service.description}
          onChange={(e) => onChange(service.id, 'description', e.target.value)}
          placeholder="Description"
          className="service-input description-input"
        />
      </td>
      <td>
        <input
          type="text"
          value={service.uom}
          onChange={(e) => onChange(service.id, 'uom', e.target.value)}
          placeholder="Unit"
          className="service-input uom-input"
        />
      </td>
      <td>
        <input
          type="number"
          value={service.quantity || ''}
          onChange={(e) => handleQuantityChange(e.target.value)}
          placeholder="0"
          className="service-input number-input"
          min="0"
          step="1"
        />
      </td>
      <td>
        <input
          type="number"
          value={service.unitPrice || ''}
          onChange={(e) => handleUnitPriceChange(e.target.value)}
          placeholder="0"
          className="service-input number-input"
          min="0"
          step="0.01"
        />
      </td>
      <td className="total-cell">
        ₹{service.totalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </td>
      <td>
        <input
          type="text"
          value={service.remarks}
          onChange={(e) => onChange(service.id, 'remarks', e.target.value)}
          placeholder="Remarks"
          className="service-input remarks-input"
        />
      </td>
      <td className="action-cell">
        <button
          onClick={() => onDelete(service.id)}
          className="delete-btn"
          title="Delete row"
          type="button"
        >
          ✕
        </button>
      </td>
    </tr>
  );
};
