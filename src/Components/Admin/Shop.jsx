import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Order.css";
export default function Shop() {
  const [shopsDetails, setShopsDetails] = useState([
    {
      shopName: "",
      shopCode: "",
      shopAddress: "",
      pincode: "",
      phoneNumber: "",
      openTime: "",
      closeTime: "",
    },
  ]);

  const getCustomersDetails = async (agentId) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/shops`,
      });
      if (res.status === 200) {
        const customers = res?.data;
        setShopsDetails(
          customers.map((shop) => ({
            shopName: shop.shop_name,
            shopCode: shop.shop_code,
            shopAddress: shop.shop_address,
            pincode: shop.pincode,
            phoneNumber: shop.phone_number,
            openTime: shop.open_time,
            closeTime: shop.close_time,
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
    <div className="p-fluid">
      <h2 className="order-title">Shop Details</h2>
      <div className="order-table">
        <DataTable value={shopsDetails} tableStyle={{ minWidth: "50rem" }}>
          <Column
            field="shopName"
            header="Shop Name"
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="shopCode"
            header="Shop Code"
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="shopAddress"
            header="Shop Address"
            sortable
            style={{ width: "20%" }}
          ></Column>
          <Column
            field="pincode"
            header="Pincode"
            sortable
            style={{ width: "5%" }}
          ></Column>
          <Column
            field="phoneNumber"
            header="Phone no."
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="openTime"
            header="Open time"
            sortable
            style={{ width: "10%" }}
          ></Column>
          <Column
            field="closeTime"
            header="Close time"
            sortable
            style={{ width: "10%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
