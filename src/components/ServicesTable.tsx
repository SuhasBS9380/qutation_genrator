import type { ServiceItem } from '../types/quotation';
import { ServiceRow } from './ServiceRow';
import './ServicesTable.css';

interface ServicesTableProps {
  services: ServiceItem[];
  onUpdate: (id: string, field: keyof ServiceItem, value: string | number) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  gstPercentage: number;
  onGstChange: (value: number) => void;
}

export const ServicesTable = ({ services, onUpdate, onAdd, onDelete, gstPercentage, onGstChange }: ServicesTableProps) => {
  const canAddMore = services.length < 20;
  const canDelete = services.length > 1;

  const subtotal = services.reduce((sum, service) => sum + service.totalPrice, 0);
  const gstAmount = (subtotal * gstPercentage) / 100;
  const grandTotal = subtotal + gstAmount;

  return (
    <div className="services-table-container">
      <h2 className="table-title">Construction Services Estimate</h2>
      <table className="services-table">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Service</th>
            <th>Description</th>
            <th>UOM</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Price</th>
            <th>Remarks</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <ServiceRow
              key={service.id}
              service={service}
              onChange={onUpdate}
              onDelete={canDelete ? onDelete : () => {}}
              index={index}
            />
          ))}
        </tbody>
        <tfoot>
          <tr className="subtotal-row">
            <td colSpan={6} className="total-label">Subtotal</td>
            <td className="total-amount">
              ₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td colSpan={2}></td>
          </tr>
          <tr className="gst-row">
            <td colSpan={5} className="gst-label">GST</td>
            <td className="gst-input-cell">
              <input
                type="number"
                value={gstPercentage || ''}
                onChange={(e) => onGstChange(parseFloat(e.target.value) || 0)}
                placeholder="0"
                className="gst-input"
                min="0"
                max="100"
                step="0.01"
              />
              <span className="gst-percent">%</span>
            </td>
            <td className="gst-amount">
              ₹{gstAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td colSpan={2}></td>
          </tr>
          <tr className="total-row">
            <td colSpan={6} className="total-label">Grand Total (Inc. GST)</td>
            <td className="total-amount">
              ₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
      <div className="table-actions">
        <button
          onClick={onAdd}
          disabled={!canAddMore}
          className="add-service-btn"
          type="button"
        >
          + Add Service
        </button>
        {!canAddMore && (
          <span className="limit-message">Maximum 20 services reached</span>
        )}
      </div>
    </div>
  );
};
