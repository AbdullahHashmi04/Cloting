import "../../Style/Admin.css";

const products = [
  { sku: "PR-001", name: "Premium Hoodie", price: "$49.99", stock: 18 },
  { sku: "PR-002", name: "Streetwear Jacket", price: "$89.00", stock: 7 },
  { sku: "PR-003", name: "Classic Sneakers", price: "$59.50", stock: 0 },
  { sku: "PR-004", name: "Minimal Tee", price: "$19.00", stock: 42 },
];

export default function AdminProducts() {
  return (
    <div className="admin-stack">
      <div className="admin-card admin-card-pad">
        <div className="admin-card-row">
          <div>
            <div className="admin-card-title">Products</div>
            <div className="admin-muted">Manage catalog, stock and pricing.</div>
          </div>
          <div className="admin-inline">
            <button className="admin-secondary-btn" type="button">
              Import
            </button>
            <button className="admin-primary-btn" type="button">
              + Add Product
            </button>
          </div>
        </div>

        <div className="admin-table admin-mt">
          <div className="admin-table-head">
            <div>SKU</div>
            <div>Product</div>
            <div className="admin-right">Price</div>
            <div className="admin-right">Stock</div>
            <div className="admin-right">Actions</div>
          </div>
          {products.map((p) => (
            <div key={p.sku} className="admin-table-row">
              <div className="admin-mono">{p.sku}</div>
              <div className="admin-strong">{p.name}</div>
              <div className="admin-right">{p.price}</div>
              <div className="admin-right">
                <span className={`admin-pill ${p.stock === 0 ? "admin-pill-danger" : p.stock < 10 ? "admin-pill-warn" : "admin-pill-ok"}`}>
                  {p.stock === 0 ? "Out" : p.stock}
                </span>
              </div>
              <div className="admin-right">
                <button className="admin-link-btn" type="button">Edit</button>
                <button className="admin-link-btn" type="button">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
