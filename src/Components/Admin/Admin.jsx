import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Admin() {
  const [showLoader, setShowLoader] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({});

  const params = useParams();
  const empId = params.id;

  return (
    <>
      <div>
        {/* <div>
          Header
        </div> */}
        <div className="d-flex">
          <Sidebar />
          <div className="flex-grow-1">
            <div className="w-90 my-4 mx-auto">
              <Outlet context={{ customerDetails, empId, showLoader }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
