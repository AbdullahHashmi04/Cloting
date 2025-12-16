import "../../Style/Admin.css";

const orders = [
  { id: "#10492", date: "Dec 12", customer: "Ayesha", status: "Paid", total: "$129.00" },
  { id: "#10491", date: "Dec 11", customer: "Hassan", status: "Processing", total: "$74.50" },
  { id: "#10490", date: "Dec 10", customer: "Sara", status: "Shipped", total: "$249.99" },
  { id: "#10489", date: "Dec 09", customer: "Usman", status: "Paid", total: "$39.00" },
  { id: "#10488", date: "Dec 08", customer: "Ali", status: "Refunded", total: "$59.00" },
];

export default function AdminOrders() {
  return (
    <div className="admin-stack">
      <div className="admin-card admin-card-pad">
        <div className="admin-card-row">
          <div>
            <div className="admin-card-title">Orders</div>
            <div className="admin-muted">Track fulfillment and payment status.</div>
          </div>
          <div className="admin-inline">
            <button className="admin-secondary-btn" type="button">Export</button>
            <button className="admin-primary-btn" type="button">+ Create Order</button>
          </div>
        </div>

        <div className="admin-table admin-mt">
          <div className="admin-table-head">
            <div>Order</div>
            <div>Date</div>
            <div>Customer</div>
            <div>Status</div>
            <div className="admin-right">Total</div>
          </div>
          {orders.map((o) => (
            <div key={o.id} className="admin-table-row">
              <div className="admin-mono">{o.id}</div>
              <div>{o.date}</div>
              <div className="admin-strong">{o.customer}</div>
              <div>
                <span className={`admin-pill admin-pill-${o.status.toLowerCase()}`}>{o.status}</span>
              </div>
              <div className="admin-right admin-strong">{o.total}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
