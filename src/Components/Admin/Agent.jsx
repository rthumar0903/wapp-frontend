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
export default function AgentAdmin() {
  const [agnetDetails, setAgentDetails] = useState([
    {
      name: "",
      phoneNumber: "",
    },
  ]);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const cities = [
    { name: "New York", code: "NY" },
    { name: "Rome", code: "RM" },
    { name: "London", code: "LDN" },
    { name: "Istanbul", code: "IST" },
    { name: "Paris", code: "PRS" },
  ];

  const getAgentDetails = async (agentId) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/agents`,
      });
      if (res.status === 200) {
        const customers = res?.data;
        setAgentDetails(
          customers.map((customer) => ({
            name: customer?.name,
            phoneNumber: customer?.phone_number,
          }))
        );
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    getAgentDetails();
  }, []);

  return (
    <div className="agent-block">
      <div className="agent-header">
        <h2>Agents Details</h2>
        <Button label="Add Agent" onClick={() => setVisible(true)} />
      </div>
      {/* <Button label="Add Agnet" /> */}
      <div>
        <DataTable value={agnetDetails}>
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
        </DataTable>
        <Dialog
          header="Add Agent"
          visible={visible}
          style={{ width: "50vw", height: "500px" }}
          onHide={() => {
            if (!visible) return;
            setVisible(false);
          }}
        >
          <div>
            <div>
              <FloatLabel>
                <InputText
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="username">Username</label>
              </FloatLabel>
            </div>{" "}
            <div>
              <FloatLabel>
                <InputText
                  id="username"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="username">Phone Number</label>
              </FloatLabel>
            </div>
            <div>
              <Dropdown
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.value)}
                options={cities}
                optionLabel="name"
                placeholder="Select a City"
                className="w-full md:w-14rem"
                checkmark={true}
                highlightOnSelect={false}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
