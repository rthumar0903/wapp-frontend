import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const sidePanelItems = [
  {
    id: 1,
    url: "details",
    label: "Details",
    icon: "fa-solid fa-user",
  },
  {
    id: 2,
    url: "records",
    label: "Records",
    icon: "fa-solid fa-calendar-days",
  },
  {
    id: 3,
    url: "balance",
    label: "Balances",
    icon: "fa-solid fa-clipboard",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const [activeSideBarItemId, setActiveSideBarItemId] = useState(-1);

  useEffect(() => {
    const list = location.pathname.split("/");
    const activeItem = sidePanelItems.filter(
      (item) => item.url === list[list.length - 1]
    );
    if (activeItem.length) {
      setActiveSideBarItemId(activeItem[0].id);
    }
  }, [location]);

  const getItemIconStyleClass = (id) => {
    let className = "side-panel-item-icon";
    if (id === activeSideBarItemId) {
      className += " active-item";
    }
    return className;
  };

  return (
    <aside className="side-panel-wrapper">
      <div className="company-logo-name">
        <img className="company-logo" src="/assets/pharmcy-icon.png"></img>
        <p className="company-title">Pharamone</p>
      </div>
      <div className="d-flex flex-column row-gap-5">
        <div className="side-panel-item">
          <Link to={"/agent/order"}>
            <div className="side-panel-item-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="90"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M2 20V4h20v16zm11-2h7V6h-7zm1-8h5V8.5h-5zm0 2.5h5V11h-5zm0 2.5h5v-1.5h-5z"
                />
              </svg>

              {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg> */}
            </div>
            <p className="item-title">Orders</p>
          </Link>
        </div>
      </div>
    </aside>
  );
}
