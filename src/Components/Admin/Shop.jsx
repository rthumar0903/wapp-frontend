import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Shop.css";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { RadioButton } from "primereact/radiobutton";
export default function Shop() {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isFullTime, setIsFullTime] = useState(null);
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
  const [newShop, setNewShop] = useState({
    shopName: "",
    shopCode: "",
    shopAddress: "",
    pinCode: "",
    phoneNumber: "",
    openTime: "",
    closeTime: "",
    isFullTime: null,
  });
  const getShopsDetails = async (agentId) => {
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

  const addShop = async () => {
    try {
      console.log("shop Details", newShop);

      const res = await axios({
        method: "POST",
        url: `http://localhost:8000/shops`,
        data: newShop,
      });
      if (res.status === 200) {
        const customers = res?.data;
        console.log(res.data);
      }
    } catch (ex) {
      console.error(ex);
    }
  };
  const handleShopName = (e) => {
    setNewShop((prevShop) => ({
      ...prevShop,
      shopName: e.target.value,
    }));
  };

  const handleShopCode = (e) => {
    setNewShop((prevShop) => ({
      ...prevShop,
      shopCode: e.target.value,
    }));
  };

  const handleShopAddress = (e) => {
    setNewShop((prevShop) => ({
      ...prevShop,
      shopAddress: e.target.value,
    }));
  };

  const handlePincode = (e) => {
    setNewShop((prevShop) => ({
      ...prevShop,
      pinCode: e.target.value,
    }));
  };

  const handlePhoneNumber = (e) => {
    setNewShop((prevShop) => ({
      ...prevShop,
      phoneNumber: e.target.value,
    }));
  };

  const handleOpenTime = (e) => {
    setNewShop((prevShop) => ({
      ...prevShop,
      openTime: e.target.value,
    }));
  };

  const handleCloseTime = (e) => {
    setNewShop((prevShop) => ({
      ...prevShop,
      closeTime: e.target.value,
    }));
  };

  const handleIsFullTime = (e) => {
    setNewShop((prevShop) => ({
      ...prevShop,
      isFullTime: e.target.value === "true", // Assuming it's a checkbox
    }));
  };

  useEffect(() => {
    getShopsDetails();
  }, []);

  return (
    <div className="shop-block">
      <div className="shop-header">
        <h2>Shop Details</h2>
        <Button label="Add Shop" onClick={() => setVisible(true)} />
      </div>
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
      <Dialog
        header="Add Shop"
        visible={visible}
        style={{ maxWidth: "700px", width: "90%" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="shop">
          <div className="shop-blocks">
            <div className="shop-form">
              <div>
                <FloatLabel>
                  <InputText
                    id="username"
                    value={newShop?.shopName}
                    onChange={handleShopName}
                    className="shop-input"
                  />
                  <label htmlFor="username">Shop Name</label>
                </FloatLabel>
              </div>
              <div>
                <FloatLabel>
                  <InputText
                    id="phoneNumber"
                    value={newShop?.shopCode}
                    onChange={handleShopCode}
                    className="shop-input"
                  />
                  <label htmlFor="username">Shop Code</label>
                </FloatLabel>
              </div>
              <div>
                <FloatLabel>
                  <InputText
                    id="username"
                    value={newShop?.shopAddress}
                    onChange={handleShopAddress}
                    className="shop-input"
                  />
                  <label htmlFor="username">Shop Address</label>
                </FloatLabel>
              </div>
              <div>
                <FloatLabel>
                  <InputText
                    id="username"
                    value={newShop?.phoneNumber}
                    onChange={handlePhoneNumber}
                    className="shop-input"
                  />
                  <label htmlFor="username">Shop Phone Number</label>
                </FloatLabel>
              </div>
            </div>
            <div className="shop-form">
              <div>
                <FloatLabel>
                  <InputText
                    id="username"
                    value={newShop?.pinCode}
                    onChange={handlePincode}
                    className="shop-input"
                  />
                  <label htmlFor="username">Pincode</label>
                </FloatLabel>
              </div>
              <div className="radio-group shop-input">
                <p>is Full time : </p>
                <RadioButton
                  inputId="ingredient1"
                  name="isFullTime"
                  value="true"
                  onChange={handleIsFullTime}
                  checked={newShop.isFullTime === true}
                />
                <label htmlFor="ingredient1" className="ml-2">
                  Yes
                </label>
                <RadioButton
                  inputId="ingredient2"
                  name="isFullTime"
                  value="false"
                  onChange={handleIsFullTime}
                  checked={newShop.isFullTime === false}
                />
                <label htmlFor="ingredient2" className="ml-2">
                  No
                </label>
              </div>
              <div>
                <FloatLabel>
                  <InputText
                    id="username"
                    value={newShop.openTime}
                    onChange={handleOpenTime}
                    className="shop-input"
                  />
                  <label htmlFor="username">Open Time</label>
                </FloatLabel>
              </div>
              <div>
                <FloatLabel>
                  <InputText
                    id="username"
                    value={newShop?.closeTime}
                    onChange={handleCloseTime}
                    className="shop-input"
                  />
                  <label htmlFor="username">Close Time</label>
                </FloatLabel>
              </div>
            </div>
            {/* <div>
              <Dropdown
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                placeholder="Select a City"
                // className="w-full md:w-14rem"
                className="agent-input"
                checkmark={true}
                highlightOnSelect={false}
              />
            </div> */}
          </div>
          <div>
            <Button onClick={addShop} className="shop-button">
              Add
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
