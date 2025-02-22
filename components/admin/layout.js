import { useState, useEffect } from "react";
import HeaderOne from "components/admin/header/HeaderOne";
import Provider from "components/provider";
import Overlay from "components/admin/overlay";
import Cookies from "js-cookie";
import { sectionItemsWithTeams } from "components/admin/sidebar/sidebar-items";
import CustomSidebar from "./sidebar/sidebar";
import { Icon } from "@iconify/react";

function AdminLayout({ bg, overlay, children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // Toggle sidebar visibility
  const handleSidebarToggle = () => {
    setSidebarVisible((prev) => !prev);
  };


  return (
    <Provider>
      <HeaderOne handleSidebar={handleSidebarToggle} showToggleButton={!sidebarVisible} />
      <div className="layout-wrapper flex w-full dark:bg-darkblack-500 bg-[#FAFAFA]">
        {/* Sidebar Section */}
        <div className={`${sidebarVisible ? "block" : "hidden"} sm:block`}>
          <CustomSidebar isCollapsed={!sidebarVisible} />
        </div>

        {/* Main Content Section */}
        <div className={`flex-1 transition-all ${sidebarVisible ? "" : ""}`}>

          {/* Overlay */}
          {overlay ? overlay : <Overlay />}

          {/* Dashboard Content */}
          <div className={`body-wrapper  ${bg || "dark:bg-darkblack-500 bg-[#FAFAFA]"}`}>
            {children}
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default AdminLayout;
