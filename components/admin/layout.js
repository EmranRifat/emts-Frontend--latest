import { useState, useEffect } from "react";
import HeaderOne from "components/admin/header/HeaderOne";
import Provider from "components/provider";
import CustomSidebar from "./sidebar/sidebar";

function AdminLayout({ bg, overlay, children }) {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Toggle sidebar visibility
  const handleSidebarToggle = () => {
    setSidebarVisible((prev) => !prev);
    setIsOverlayVisible((prev) => !prev); 
  };


  return (
    <Provider>
      
      <HeaderOne handleSidebar={handleSidebarToggle} showToggleButton={!sidebarVisible} />
      
      {/* Overlay for background blur */}
      {isOverlayVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
          onClick={() => setIsOverlayVisible(false)} // Hide on click
        ></div>
      )}

      <div className="layout-wrapper flex w-full dark:bg-darkblack-500 bg-[#FAFAFA] relative">
        {/* Sidebar Section */}
        <div className={`${sidebarVisible ? "block" : "hidden"} sm:block z-50`}>
          <CustomSidebar isCollapsed={!sidebarVisible} />
        </div>

        {/* Main Content */}
        <div className={`flex-1 transition-all ${sidebarVisible ? "" : ""}`}>
          <div className={`body-wrapper ${bg || "dark:bg-darkblack-500 bg-[#FAFAFA]"}`}>
            {children}
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default AdminLayout;
