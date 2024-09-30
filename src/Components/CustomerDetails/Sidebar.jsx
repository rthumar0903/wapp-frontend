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
        <div className="company-logo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
            <path d="M320 0c17.7 0 32 14.3 32 32l0 64 120 0c39.8 0 72 32.2 72 72l0 272c0 39.8-32.2 72-72 72l-304 0c-39.8 0-72-32.2-72-72l0-272c0-39.8 32.2-72 72-72l120 0 0-64c0-17.7 14.3-32 32-32zM208 384c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zm96 0c-8.8 0-16 7.2-16 16s7.2 16 16 16l32 0c8.8 0 16-7.2 16-16s-7.2-16-16-16l-32 0zM264 256a40 40 0 1 0 -80 0 40 40 0 1 0 80 0zm152 40a40 40 0 1 0 0-80 40 40 0 1 0 0 80zM48 224l16 0 0 192-16 0c-26.5 0-48-21.5-48-48l0-96c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48l0 96c0 26.5-21.5 48-48 48l-16 0 0-192 16 0z" />
          </svg>
        </div>
        <div className="company-name">DiaSoft</div>
      </div>
      <div className="d-flex flex-column row-gap-5">
        <div className="side-panel-item">
          <Link to={"/customer-details/profile"}>
            <div className="side-panel-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
            </div>
            <div className="side-panel-item-title">skdm</div>
          </Link>
        </div>
        <div className="side-panel-item">
          <Link to={"/customer-details/attachment"}>
            <div className="side-panel-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M0 64C0 28.7 28.7 0 64 0L224 0l0 128c0 17.7 14.3 32 32 32l128 0 0 288c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 64zm384 64l-128 0L256 0 384 128z" />
              </svg>
            </div>
            <div className="side-panel-item-title">skdm</div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
