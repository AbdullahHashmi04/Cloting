import "../../Style/Admin.css";

const kpis = [
  { label: "Revenue", value: "$12,480", delta: "+8.2%" },
  { label: "Orders", value: "324", delta: "+3.1%" },
  { label: "Customers", value: "1,248", delta: "+5.6%" },
  { label: "Conversion", value: "2.9%", delta: "+0.4%" },
];

const recentOrders = [
  { id: "#10492", customer: "Ayesha", status: "Paid", total: "$129.00" },
  { id: "#10491", customer: "Hassan", status: "Processing", total: "$74.50" },
  { id: "#10490", customer: "Sara", status: "Shipped", total: "$249.99" },
  { id: "#10489", customer: "Usman", status: "Paid", total: "$39.00" },
];

export default function AdminDashboard() {
  return (
    <div className="admin-stack">
      <section className="admin-kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="admin-card">
            <div className="admin-card-row">
              <div>
                <div className="admin-kpi-label">{k.label}</div>
                <div className="admin-kpi-value">{k.value}</div>
              </div>
              <div className="admin-kpi-delta">{k.delta}</div>
            </div>
          </div>
        ))}
      </section>

      <section className="admin-grid-2">
        <div className="admin-card admin-card-pad">
          <div className="admin-card-title">Recent Orders</div>
          <div className="admin-table">
            <div className="admin-table-head">
              <div>Order</div>
              <div>Customer</div>
              <div>Status</div>
              <div className="admin-right">Total</div>
            </div>
            {recentOrders.map((o) => (
              <div key={o.id} className="admin-table-row">
                <div className="admin-mono">{o.id}</div>
                <div>{o.customer}</div>
                <div>
                  <span className={`admin-pill admin-pill-${o.status.toLowerCase()}`}
                  >
                    {o.status}
                  </span>
                </div>
                <div className="admin-right admin-strong">{o.total}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-card admin-card-pad">
          <div className="admin-card-title">Quick Actions</div>
          <div className="admin-actions-grid">
            <button className="admin-action" type="button">
              <div className="admin-action-title">Create Discount</div>
              <div className="admin-action-sub">Boost sales with promo codes</div>
            </button>
            <button className="admin-action" type="button">
              <div className="admin-action-title">View Low Stock</div>
              <div className="admin-action-sub">Restock before items run out</div>
            </button>
            <button className="admin-action" type="button">
              <div className="admin-action-title">Export Orders</div>
              <div className="admin-action-sub">Download last 30 days report</div>
            </button>
            <button className="admin-action" type="button">
              <div className="admin-action-title">Manage Users</div>
              <div className="admin-action-sub">Control admin access permissions</div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
