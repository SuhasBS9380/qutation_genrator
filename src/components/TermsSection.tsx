import './TermsSection.css';

export const TermsSection = () => {
  return (
    <div className="terms-section">
      <h3 className="terms-title">Terms and Conditions</h3>
      <ul className="terms-list">
        <li>
          <strong>Validity:</strong> Estimate valid for 30 days.
        </li>
        <li>
          <strong>Payment:</strong> Late payments may result in extra charges.
        </li>
        <li>
          <strong>Changes:</strong> Scope changes may incur additional charges, documented via change orders.
        </li>
        <li>
          <strong>Cancellation:</strong> May forfeit deposit if canceled.
        </li>
        <li>
          <strong>Warranty:</strong> One-year workmanship warranty; manufacturer warranties apply to materials.
        </li>
      </ul>
    </div>
  );
};
