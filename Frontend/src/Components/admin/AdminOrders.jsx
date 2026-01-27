import { useState, useEffect } from "react";
import "../../Style/Admin.css";
import axios from "axios";

export default function AdminOrders() {
  const [ordersData, setOrdersData] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getorders');
        setOrdersData(response.data);
        console.log("Fetched orders: ", response.data);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };
    fetchOrders();
  }, []);

  console.log("Orders Data: ", ordersData.length);

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
            {/* <div className="admin-right">Total</div> */}
          </div>
    {ordersData.length > 0 ? (
              ordersData.map((o, index) => (  // Added index as fallback
              <div key={o._id?.toString() || `order-${index}`} className="admin-table-row">  {/* Unique key with fallback */}
                <div className="admin-mono">{o._id?.toString() || o._id}</div>
                <div>N/A</div>
                <div className="admin-strong">{o.FullName}</div>
                {/* <div>
                  <span className={`admin-pill admin-pill-${(o.status || '').toLowerCase()}`}>{o.status || 'N/A'}</span>
                </div>
                <div className="admin-right admin-strong">{o.total || `Items: ${o.cart?.length || 0}`}</div> */}
              </div>
            ))
          ) : (
            <div>No orders available</div>  // Fallback if not an array or empty
          ) }
        </div>
      </div>
    </div>
  );
}