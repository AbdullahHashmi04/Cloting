import { useState, useEffect } from "react";
import "../../Style/Admin.css";
import axios from "axios";

const customers = [
  { id: "CU-201", name: "Ayesha Khan", email: "ayesha@example.com", orders: 8, spend: "$640" },
  { id: "CU-202", name: "Hassan Ali", email: "hassan@example.com", orders: 3, spend: "$214" },
  { id: "CU-203", name: "Sara Ahmed", email: "sara@example.com", orders: 5, spend: "$420" },
  { id: "CU-204", name: "Usman Raza", email: "usman@example.com", orders: 1, spend: "$39" },
];


export default function AdminCustomers() {

  const[data , setData] = useState ([]);

  useEffect (() => {
    const fetchCustomers = async () => {
      let response = await axios("http://localhost:3000/getcustomers");
      console.log("Fetched customers: ", response.data);
      setData(response.data);
        }
        fetchCustomers();
  }, []);
  return (
    <div className="admin-stack">
      <div className="admin-card admin-card-pad">
        <div className="admin-card-row">
          <div>
            <div className="admin-card-title">Customers</div>
            <div className="admin-muted">Customer list and basic insights.</div>
          </div>
          {/* <button className="admin-secondary-btn" type="button">Export</button> */}
        </div>

        <div className="admin-table admin-mt">
          <div className="admin-table-head">
            <div>ID</div>
            <div>Name</div>
            <div>Email</div>
            <div className="admin-right">Orders</div>
          </div>
          {data.map((c) => (
            <div key={c.id} className="admin-table-row">
              <div className="admin-mono">{c.id}</div>
              <div className="admin-strong">{c.Username}</div>
              <div className="admin-muted">{c.Email}</div>
              {/* <div className="admin-right">{c.orders}</div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
