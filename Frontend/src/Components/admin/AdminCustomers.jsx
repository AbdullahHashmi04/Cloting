import { useState, useEffect } from "react";
import "../../Style/Admin.css";
import axios from "axios";


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
                <button className="admin-primary-btn" type="button">
              Delete Customer
            </button>
          {/* <button className="admin-secondary-btn" type="button">Export</button> */}
        </div>

        <div className="admin-table admin-mt">
          <div className="admin-table-head">
            <div>ID</div>
            <div>Name</div>
            <div>Email</div>
            <div>Action</div>
            {/* <div>Orders</div> */}
          </div>
          {data.map((c) => (
            <div key={c._id} className="admin-table-row">
              <div className="admin-mono">#{c._id.slice(0,7)}</div>
              <div className="admin-strong">{c.Username}</div>
              <div className="admin-muted">{c.Email}</div>
              <button className="admin-link-btn" type="button">Edit</button>
              <button className="admin-link-btn" type="button">Delete</button>
              {/* <div className="admin-muted">{c.Orders.length}</div> */}
              {/* <div className="admin-right">{c.orders}</div> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
