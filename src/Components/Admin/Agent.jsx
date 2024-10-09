import React, { useState, useEffect } from "react";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Agent.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { Dropdown } from "primereact/dropdown";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AgentAdmin() {
  const [agnetDetails, setAgentDetails] = useState([
    {
      name: "",
      phoneNumber: "",
      id: "",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [agentId, setAgentId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  // const [selectedCity, setSelectedCity] = useState(null);

  const getAgentDetails = async (agentId) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/agents`,
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

  const editAgent = async () => {
    try {
      console.log("name,phone", name, phoneNumber);
      const res = await axios({
        method: "PUT",
        url: `http://localhost:8000/agents/${agentId}`,
        data: {
          phoneNumber,
          name,
        },
      });
      if (res.status === 201) {
        getAgentDetails();
        setName(null);
        setPhoneNumber(null);
        setVisible(false);
        toast.success("Agent Edit successfully");
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const addAgent = async () => {
    try {
      console.log("name,phone", name, phoneNumber);
      const res = await axios({
        method: "POST",
        url: `http://localhost:8000/agents`,
        data: {
          phoneNumber,
          name,
        },
      });
      if (res.status === 201) {
        getAgentDetails();
        setName(null);
        setPhoneNumber(null);
        setVisible(false);
        toast.success("Agent Added successfully");
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  const handleEditForm = async (rawData) => {
    console.log("raw", rawData);
    setIsEdit(true);
    setPhoneNumber(rawData?.phoneNumber);
    setName(rawData?.name);
    setAgentId(rawData?.id);
    // const agentDetails = await getAgentDetails(rawData?.agentId);
    // const agentDetail = {
    //   id: agentDetails?.id,
    //   name: agentDetails?.name,
    //   phoneNumber: agentDetails?.phone_number,
    // };
    // console.log("inside", agentDetail);
    // setNewShop((prevShop) => ({
    //   ...prevShop,
    //   shopName: rawData?.shopName,
    //   shopCode: rawData?.shopCode,
    //   shopAddress: rawData?.shopAddress,
    //   pinCode: rawData?.pincode,
    //   phoneNumber: rawData?.phoneNumber,
    //   openTime: rawData?.openTime,
    //   closeTime: rawData?.closeTime,
    //   isFullTime: rawData?.isFullTime,
    //   agentId: rawData?.id,
    //   name: agentDetail,
    // }));
    // openDialog();
    setVisible(true);
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
    getAgentDetails();
  }, []);

  return (
    <div className="agent-block">
      <ToastContainer />
      <div className="agent-header">
        <h2>Agents Details</h2>
        <Button label="Add Agent" onClick={() => setVisible(true)} />
      </div>
      {/* <Button label="Add Agnet" /> */}
      <div>
        <DataTable value={agnetDetails} className="table-block">
          <Column
            field="name"
            header="Name"
            sortable
            style={{ width: "5%" }}
          ></Column>
          <Column
            field="phoneNumber"
            header="Phone no."
            sortable
            style={{ width: "5%" }}
          ></Column>
          <Column
            header="Action"
            body={actionBodyTemplate}
            exportable={false}
            style={{ width: "10%" }}
          ></Column>
        </DataTable>
        <Dialog
          header={isEdit ? "Edit Agent" : "Add Agent"}
          visible={visible}
          style={{ maxWidth: "450px", width: "90%" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
            setIsEdit(false);
          }}
        >
          <div className="agent-form">
            <div>
              <FloatLabel>
                <InputText
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="agent-input"
                />
                <label htmlFor="username">Name</label>
              </FloatLabel>
            </div>
            <div>
              <FloatLabel>
                <InputText
                  id="username"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="agent-input"
                />
                <label htmlFor="username">Phone Number</label>
              </FloatLabel>
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
            {isEdit ? (
              <Button onClick={editAgent}>Edit</Button>
            ) : (
              <Button onClick={addAgent}>Submit</Button>
            )}
          </div>
        </Dialog>
      </div>
    </div>
  );
}
