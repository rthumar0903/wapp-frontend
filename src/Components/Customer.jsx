// import React, { useState, useEffect } from "react";

// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import axios from "axios";

// export default function Customer() {
//   const [customerDetails, setCustomerDetails] = useState(null);
//   const getCustomerDetails = async (customerId) => {
//     try {
//       const res = await axios({
//         method: "GET",
//         url: `http://localhost:8000/customers/${customerId}`,
//       });
//       if (res.status === 200) setCustomerDetails(res?.ata);
//       console.log("=======", res);
//     } catch (ex) {
//       console.error(ex);
//     }
//   };
//   useEffect(() => {
//     const customerId = localStorage.getItem("userId");
//     getCustomerDetails(customerId);
//     console.log(customerId);
//   }, []);
//   //   const [products, setProducts] = useState([]);

//   //   useEffect(() => {
//   //     ProductService.getProductsMini().then((data) => setProducts(data));
//   //   }, []);
//   return (

// );
// }

import React, { useState, useEffect } from "react";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function Customer() {
  const [customerDetails, setCustomerDetails] = useState({
    id: "",
    name: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
    files: [],
  });

  const [isEditingAddress, setIsEditingAddress] = useState(false); // Control address editing mode

  const getCustomerDetails = async (customerId) => {
    try {
      const res = await axios({
        method: "GET",
        url: `http://localhost:8000/customers/${customerId}`,
      });
      if (res.status === 200) {
        setCustomerDetails(res?.data);
        const customer = res?.data;
        setCustomerDetails((prevDetails) => ({
          ...prevDetails,
          name: customer?.name,
          address: customer?.address,
          phone: customer?.phone_number,
          latitude: customer?.latitude,
          longitude: customer?.longitude,
        }));
      }
    } catch (ex) {
      console.error(ex);
    }
  };

  useEffect(() => {
    const customerId = localStorage.getItem("userId");
    getCustomerDetails(customerId);
  }, []);

  const handleSaveAddress = () => {
    // Call API to save the updated address
    axios
      .put(`http://localhost:8000/customers/${customerDetails.id}`, {
        address: customerDetails.address,
      })
      .then((response) => {
        console.log("Address updated successfully", response.data);
        setIsEditingAddress(false); // Exit edit mode after saving
      })
      .catch((error) => {
        console.error("Error updating address", error);
      });
  };

  return (
    <div className="p-fluid">
      <h2>Customer Details</h2>

      {/* Customer information displayed in a card-like format */}
      <Card style={{ textAlign: "left" }}>
        <div>
          <label> Name : {customerDetails.name}</label>
          <br />
          <br />
          <label> Phone Number : {customerDetails.phone}</label>
          <br />
          <br />
          <label> Address : {customerDetails.address}</label>
          <br />
          <br />
          <label> Latitude : {customerDetails.latitude}</label>
          <br />
          <br />
          <label> Longitude : {customerDetails.longitude}</label>
          <br />
          <br />
        </div>
      </Card>
    </div>
  );
}
