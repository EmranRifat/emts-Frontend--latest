import { useState, useEffect } from "react";
import HeaderOne from "components/admin/header/HeaderOne";
import Provider from "components/provider";
import CustomSidebar from "./sidebar/sidebar";

function AdminLayout({ bg, overlay, children }) {
  
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
      };

      handleResize(); // Initial check
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleSidebarToggle = () => {
    setSidebarVisible((prev) => !prev);
  };

  return (
    <Provider>
      {/* Top Header */}
      <HeaderOne handleSidebar={handleSidebarToggle} showToggleButton={!sidebarVisible} />

      {/* Mobile Overlay */}
      {sidebarVisible && isMobile && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40 sm:hidden"
          onClick={handleSidebarToggle}
        ></div>
      )}

      <div className="layout-wrapper flex w-full min-h-screen dark:bg-darkblack-400 bg-[#ececec] relative">
        {/* Sidebar */}
        <div
          className={`
            fixed sm:static top-0 left-0 h-full 
            ${sidebarVisible ? "w-64" : "w-0 sm:w-64"} 
            transition-all duration-300 overflow-hidden z-50
          `}
        >
          <CustomSidebar isCollapsed={!sidebarVisible && isMobile} />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-screen overflow-x-hidden">
          <div className={`body-wrapper p-4 ${bg || "dark:bg-darkblack-500 bg-[#ffffff]"}`}>
            {children}
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default AdminLayout;