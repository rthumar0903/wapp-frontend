import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Customer.css";
export default function Customer() {
  const [agnetDetails, setAgentDetails] = useState([
    {
      name: "",
      address: "",
      pincode: "",
      phoneNumber: "",
    },
  ]);
  const token = localStorage.getItem("token");
  const getCustomersDetails = async (agentId) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/customers`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const customers = res?.data;
        setAgentDetails(
          customers.map((customer) => ({
            name: customer?.name,
            address: customer?.address,
            pincode: customer?.pincode,
            phoneNumber: customer?.phone_number,
          }))
        );
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    getCustomersDetails();
  }, []);

  return (
    <div className="customer-block">
      <div className="customer-header">
        <h2>Customers Details</h2>
      </div>
      <DataTable value={agnetDetails}>
        <Column
          field="name"
          header="Name"
          sortable
          style={{ width: "10%" }}
        ></Column>
        <Column
          field="pincode"
          header="Pincode"
          sortable
          style={{ width: "5%" }}
        ></Column>
        <Column
          field="address"
          header="Address"
          sortable
          style={{ width: "25%" }}
        ></Column>
        <Column
          field="phoneNumber"
          header="Phone no."
          sortable
          style={{ width: "10%" }}
        ></Column>
      </DataTable>
    </div>
  );
}
