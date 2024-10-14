import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./OrderDetails.css";
import { Button } from "primereact/button";
// import fetch from "cross-fetch";

export default function OrderDetails() {
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

  const redirectToImage = async () => {
    try {
      const token =
        "EAAL8U6Q18bYBO0CbwqDNMfoKgdrC8knRAMhgwlzSvzJD4pZBhaFvABn45pMJEI9kHvXhezW9TA1bYfIox8lwzlHRIXJs1TLHyhKjRgoi3iMSvTzLGZBzmiEX4lnV6ep9LforfANYXjQMeXmHLguJvSLZBvZBmv3a9Q9hMeWQXCbSYhncx8BcxNRE5jGIA7Xbr4CDjMNnRK9zlpWDcqz0wqx7VDJewtH804jZC";
      const URL =
        "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=1206148197308460&ext=1728493701&hash=ATuY_vtQO40JeBq6u0xeRLg8-fyUVswt9xJqVLKk6nBVIw";
      const mediaMimeType = "image/jpeg";
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": mediaMimeType,
        },
        responseType: "arraybuffer", // This is important for binary data
      });
      if (mediaMimeType.startsWith("image/")) {
        const filename = "temp";
        const file_extension = filename + "." + mediaMimeType.split("/")[1];
        const typeoffile = mediaMimeType.split("/")[0];

        const somedata = Buffer.from(response.data, "binary");
        const bufferArray = new Uint8Array(somedata).buffer;
        const blob = new Blob([bufferArray], {
          type: "image/jpeg",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        console.log("url == = = = = ", url);
        // await fs.writeFileSync(
        //   file_extension,
        //   Buffer.from(response.data, "binary")
        // );

        console.log(`Media saved to ${file_extension} successfully.`);
      }
    } catch (ex) {
      console.log(ex);
    }

    // try {
    //   fetch(
    //     "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=1206148197308460&ext=1728491571&hash=ATv4stRKzExrOzC-El5jhnehMfrGKZ8NTVIU1vnLv5P34Q",
    //     {
    //       headers: {
    //         Authorization: `Bearer EAAL8U6Q18bYBO0CbwqDNMfoKgdrC8knRAMhgwlzSvzJD4pZBhaFvABn45pMJEI9kHvXhezW9TA1bYfIox8lwzlHRIXJs1TLHyhKjRgoi3iMSvTzLGZBzmiEX4lnV6ep9LforfANYXjQMeXmHLguJvSLZBvZBmv3a9Q9hMeWQXCbSYhncx8BcxNRE5jGIA7Xbr4CDjMNnRK9zlpWDcqz0wqx7VDJewtH804jZC`,
    //         "User-Agent": "node",
    //       },
    //     }
    //   );
    // const agent = await axios({
    //   method: "GET",
    //   url: `http://localhost:8000/getImage`,
    // });
    // if (agent.status === 200) {
    // }
    // } catch (ex) {
    //   console.error(ex);
    // }
  };
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => redirectToImage()}
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
          <Column
            header="Action"
            body={actionBodyTemplate}
            exportable={false}
            style={{ width: "10%" }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
}
