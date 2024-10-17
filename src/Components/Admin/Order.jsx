import React, { useState, useEffect } from "react";
import { Card } from "primereact/card";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./Order.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
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
  const [selectedImageUrl, setSelectedImageUrl] = useState(null); // State for the selected image URL
  const [isDialogVisible, setIsDialogVisible] = useState(false); // State to manage Dialog visibility
  const token = localStorage.getItem("token");
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

  const onImageClick = (imageUrl) => {
    setSelectedImageUrl(imageUrl);
    setIsDialogVisible(true);
  };
  const onHideDialog = () => {
    setIsDialogVisible(false);
    setSelectedImageUrl(null);
  };
  const imgBodyTemplate = (rowData) => {
    return (
      <Button
        icon="pi pi-eye"
        className="p-button-rounded p-button-info"
        onClick={() =>
          onImageClick(
            "http://res.cloudinary.com/dluc3pzef/image/upload/v1728927773/assets/bpjifrilimibeko7rwmg.jpg"
          )
        }
        tooltip="View Image"
      />
    );
  };
  const handleDownloadClick = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(selectedImageUrl, {
        responseType: "blob",
      });
      console.log("image response", response?.data);
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });

      const a = document.createElement("a");
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = "image.jpg";
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(objectUrl);
      document.body.removeChild(a);

      onHideDialog();
    } catch (error) {
      console.error("Download failed: ", error);
    }
  };

  const getOrderDetails = async (agentId) => {
    try {
      const agent = await axios({
        method: "GET",
        url: `http://localhost:8000/agent/${agentId}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (agent.status === 200) {
        const res = await axios({
          method: "GET",
          url: `http://localhost:8000/orders/${agent?.data?.id}`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
    <div className="order-block">
      <div className="order-header">
        <h2>Order Details</h2>
      </div>
      <DataTable value={agnetDetails} className="order-table">
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
          header="Media"
          body={imgBodyTemplate}
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
      <Dialog
        visible={isDialogVisible}
        style={{ width: "30vw" }}
        header="Image Preview"
        onHide={onHideDialog}
        dismissableMask
        footer={
          selectedImageUrl && (
            <div className="p-d-flex p-jc-end">
              {/* Download Button */}
              <a href={selectedImageUrl} download="image.jpg">
                <Button
                  icon="pi pi-download"
                  label="Download"
                  className="p-button-success"
                  onClick={handleDownloadClick} // Handle download and close dialog
                />
              </a>
            </div>
          )
        }
      >
        {selectedImageUrl && (
          <img
            src={selectedImageUrl}
            alt="Product"
            style={{ width: "100%", height: "auto" }}
          />
        )}
      </Dialog>
    </div>
  );
}
