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
          <Link to={"/admin/order"}>
            <div className="side-panel-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="70"
                height="70"
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
            <div className="side-panel-item-title">skdm</div>
          </Link>
        </div>
        <div className="side-panel-item">
          <Link to={"/admin/customer"}>
            <div className="side-panel-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
              </svg>
            </div>
            <div className="side-panel-item-title">skdm</div>
          </Link>
        </div>
        <div className="side-panel-item">
          <Link to={"/admin/shop"}>
            <div className="side-panel-item-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
                <path d="M36.8 192l566.3 0c20.3 0 36.8-16.5 36.8-36.8c0-7.3-2.2-14.4-6.2-20.4L558.2 21.4C549.3 8 534.4 0 518.3 0L121.7 0c-16 0-31 8-39.9 21.4L6.2 134.7c-4 6.1-6.2 13.2-6.2 20.4C0 175.5 16.5 192 36.8 192zM64 224l0 160 0 80c0 26.5 21.5 48 48 48l224 0c26.5 0 48-21.5 48-48l0-80 0-160-64 0 0 160-192 0 0-160-64 0zm448 0l0 256c0 17.7 14.3 32 32 32s32-14.3 32-32l0-256-64 0z" />
              </svg>
            </div>
            <div className="side-panel-item-title">skdm</div>
          </Link>
        </div>
        <div className="side-panel-item">
          <Link to={"/admin/agent"}>
            <div className="side-panel-item-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="48px"
                height="48px"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12v7c0 1.66 1.34 3 3 3h2v-3H5v-2h14v2h-2v3h2c1.66 0 3-1.34 3-3v-7c0-5.52-4.48-10-10-10zm0 18c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4zm6.39-9.56c-.56-2.19-2.63-3.44-4.89-3.44s-4.33 1.25-4.89 3.44c-.07.26.03.54.25.68.23.14.52.12.72-.06C10.47 10.6 11.23 10 12 10s1.53.6 1.91 1.06c.2.18.49.2.72.06.22-.14.32-.42.25-.68zM12 5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6 9.5h-2v2h2v-2zm-8 2h-2v2h2v-2z" />
              </svg>
            </div>
            <div className="side-panel-item-title">skdm</div>
          </Link>
        </div>
      </div>
    </aside>
  );
}
