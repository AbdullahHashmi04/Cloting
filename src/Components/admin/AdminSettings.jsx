import "../../Style/Admin.css";

export default function AdminSettings() {
  return (
    <div className="admin-stack">
      <div className="admin-card admin-card-pad">
        <div className="admin-card-title">Settings</div>
        <div className="admin-muted">Basic configuration placeholders (connect to backend later).</div>

        <div className="admin-form-grid admin-mt">
          <label className="admin-field">
            <span className="admin-field-label">Store Name</span>
            <input className="admin-input" placeholder="Your Store" />
          </label>
          <label className="admin-field">
            <span className="admin-field-label">Support Email</span>
            <input className="admin-input" placeholder="support@example.com" />
          </label>
          <label className="admin-field">
            <span className="admin-field-label">Currency</span>
            <select className="admin-input">
              <option>USD</option>
              <option>PKR</option>
              <option>EUR</option>
            </select>
          </label>
          <label className="admin-field">
            <span className="admin-field-label">Timezone</span>
            <select className="admin-input">
              <option>Asia/Karachi</option>
              <option>UTC</option>
              <option>America/New_York</option>
            </select>
          </label>
        </div>

        <div className="admin-mt admin-inline">
          <button className="admin-secondary-btn" type="button">Reset</button>
          <button className="admin-primary-btn" type="button">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
