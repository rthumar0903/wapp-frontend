import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Order.css";
export default function Order() {
  const [agnetDetails, setAgentDetails] = useState([
    {
      name: "",
      address: "",
      pincode: "",
      status: "",
      media: "",
      time: "",
    },
  ]);

  const getOrderDetails = async (agentId) => {
    try {
      const agent = await axios({
        method: "GET",
        url: `http://localhost:8000/agent/${agentId}`,
      });
      if (agent.status === 200) {
        const res = await axios({
          method: "GET",
          url: `http://localhost:8000/orders/${agent?.data?.id}`,
        });
        if (res.status === 200) {
          const orders = res?.data;
          setAgentDetails(
            orders.map((order) => ({
              name: order?.name,
              address: order?.address,
              pincode: order?.pincode,
              status: order?.status,
              media: order?.media_id,
              time: order?.created_at,
            }))
          );
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    const agentId = localStorage.getItem("userId");
    getOrderDetails(agentId);
  }, []);

  return (
    <div className="p-fluid">
      <h2 className="order-title">Order Details</h2>
      <div className="order-table">
        <DataTable value={agnetDetails} tableStyle={{ minWidth: "50rem" }}>
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
            field="status"
            header="Status"
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="media"
            header="Media"
            sortable
            style={{ width: "25%" }}
          ></Column>
          <Column
            field="time"
            header="Time"
            sortable
            style={{ width: "25%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
