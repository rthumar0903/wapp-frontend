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
import { Dropdown } from "primereact/dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Shop() {
  const [visible, setVisible] = useState(false);
  // const [name, setName] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  // const [isFullTime, setIsFullTime] = useState(null);
  const [shopsDetails, setShopsDetails] = useState([
    {
      id: "",
      shopName: "",
      shopCode: "",
      shopAddress: "",
      pincode: "",
      phoneNumber: "",
      openTime: "",
      closeTime: "",
      isFullTime: null,
      agentId: "",
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
    agentId: "",
    name: "",
  });

  const [agnetDetails, setAgentDetails] = useState([
    {
      id: "",
      name: "",
      phoneNumber: "",
    },
  ]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedAgentId, setSelectedAgentId] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const token = localStorage.getItem("token");
  const getAgentDetails = async (agentId) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/agents/${agentId}`,
      });
      if (res.status === 200) {
        return res?.data;
      }
    } catch (ex) {
      console.error(ex);
    }
  };
  const getShopsDetails = async (agentId) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/shops`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const customers = res?.data;
        setShopsDetails(
          customers.map((shop) => ({
            id: shop?.id,
            shopName: shop.shop_name,
            shopCode: shop.shop_code,
            shopAddress: shop.shop_address,
            pincode: shop.pincode,
            phoneNumber: shop.phone_number,
            openTime: shop.open_time,
            closeTime: shop.close_time,
            isFullTime: shop.is_full_time === 1,
            agentId: shop.agent_id,
          }))
        );
      }
    } catch (ex) {
      console.error(ex);
    }
  };
  const handleEditForm = async (rawData) => {
    // console.log("raw", rawData);
    setIsEdit(true);
    const agentDetails = await getAgentDetails(rawData?.agentId);
    const agentDetail = {
      id: agentDetails?.id,
      name: agentDetails?.name,
      phoneNumber: agentDetails?.phone_number,
    };
    console.log("inside", agentDetail);
    setNewShop((prevShop) => ({
      ...prevShop,
      shopName: rawData?.shopName,
      shopCode: rawData?.shopCode,
      shopAddress: rawData?.shopAddress,
      pinCode: rawData?.pincode,
      phoneNumber: rawData?.phoneNumber,
      openTime: rawData?.openTime,
      closeTime: rawData?.closeTime,
      isFullTime: rawData?.isFullTime,
      agentId: rawData?.id,
      name: agentDetail,
    }));
    openDialog();
  };
  const getAgentsDetails = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/agents`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const agents = res?.data;
        setAgentDetails(
          agents.map((agent) => ({
            name: agent?.name,
            phoneNumber: agent?.phone_number,
            id: agent?.id,
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: newShop,
      });
      if (res.status === 201) {
        setNewShop((prevShop) => ({
          ...prevShop,
          shopName: "",
          shopCode: "",
          shopAddress: "",
          pinCode: "",
          phoneNumber: "",
          openTime: "",
          closeTime: "",
          isFullTime: null,
          agentId: "",
        }));
        getShopsDetails();
        setVisible(false);
        toast.success("Shop added successfully");
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const editShop = async () => {
    try {
      console.log("shop Details", newShop);
      const res = await axios({
        method: "PUT",
        url: `http://localhost:8000/shops/${newShop?.agentId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: newShop,
      });
      if (res.status === 201) {
        setNewShop((prevShop) => ({
          ...prevShop,
          shopName: "",
          shopCode: "",
          shopAddress: "",
          pinCode: "",
          phoneNumber: "",
          openTime: "",
          closeTime: "",
          isFullTime: null,
          agentId: "",
        }));
        getShopsDetails();
        setVisible(false);
        toast.success("Shop added successfully");
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

  const handleAgentSelect = (e) => {
    // console.log(e.target.value?.name);
    // setSelectedAgentId(e?.value?.id);
    setNewShop((prevShop) => ({
      ...prevShop,
      agentId: e.value?.id,
      agentName: e.value,
    }));
    // setSelectedAgent(e?.value);
  };

  const openDialog = () => {
    setVisible(true);
    getAgentsDetails();
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => handleEditForm(rowData)}
        />
        {/* <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteProduct(rowData)}
        /> */}
      </React.Fragment>
    );
  };
  useEffect(() => {
    getShopsDetails();
  }, []);

  return (
    <div className="shop-block">
      <ToastContainer />
      <div className="shop-header">
        <h2>Shop Details</h2>
        <Button label="Add Shop" onClick={openDialog} />
      </div>
      <DataTable
        value={shopsDetails}
        tableStyle={{ minWidth: "50rem" }}
        editMode="row"
        dataKey="id"
      >
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
        <Column
          header="Action"
          body={actionBodyTemplate}
          exportable={false}
          style={{ width: "10%" }}
        ></Column>
      </DataTable>
      <Dialog
        header={isEdit ? "Edit Shop" : "Add Shop"}
        visible={visible}
        style={{ maxWidth: "700px", width: "90%" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
          setIsEdit(false);
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
              <div>
                <Dropdown
                  value={newShop?.name}
                  onChange={handleAgentSelect}
                  options={agnetDetails}
                  optionLabel="name"
                  placeholder="Select a Agent"
                  // className="w-full md:w-14rem"
                  className="agent-input"
                  checkmark={true}
                  highlightOnSelect={false}
                />
              </div>
            </div>
          </div>
          <div>
            {isEdit ? (
              <Button onClick={editShop} className="shop-button">
                Edit
              </Button>
            ) : (
              <Button onClick={addShop} className="shop-button">
                Add
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </div>
  );
}
