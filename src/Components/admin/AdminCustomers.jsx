import "../../Style/Admin.css";

const customers = [
  { id: "CU-201", name: "Ayesha Khan", email: "ayesha@example.com", orders: 8, spend: "$640" },
  { id: "CU-202", name: "Hassan Ali", email: "hassan@example.com", orders: 3, spend: "$214" },
  { id: "CU-203", name: "Sara Ahmed", email: "sara@example.com", orders: 5, spend: "$420" },
  { id: "CU-204", name: "Usman Raza", email: "usman@example.com", orders: 1, spend: "$39" },
];

export default function AdminCustomers() {
  return (
    <div className="admin-stack">
      <div className="admin-card admin-card-pad">
        <div className="admin-card-row">
          <div>
            <div className="admin-card-title">Customers</div>
            <div className="admin-muted">Customer list and basic insights.</div>
          </div>
          <button className="admin-secondary-btn" type="button">Export</button>
        </div>

        <div className="admin-table admin-mt">
          <div className="admin-table-head">
            <div>ID</div>
            <div>Name</div>
            <div>Email</div>
            <div className="admin-right">Orders</div>
            <div className="admin-right">Spend</div>
          </div>
          {customers.map((c) => (
            <div key={c.id} className="admin-table-row">
              <div className="admin-mono">{c.id}</div>
              <div className="admin-strong">{c.name}</div>
              <div className="admin-muted">{c.email}</div>
              <div className="admin-right">{c.orders}</div>
              <div className="admin-right admin-strong">{c.spend}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
