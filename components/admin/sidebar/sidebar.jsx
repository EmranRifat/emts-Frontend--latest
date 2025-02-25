import React, { useCallback, useState, useEffect } from "react";
import { Avatar, ScrollShadow, Spacer, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import Link from "next/link";
import { cn } from "@nextui-org/react";
import { sectionItemsWithTeams } from "./sidebar-items";
import { useRequisitionWithPendingCount } from "lib/hooks/admin/requisition/useRequisitionWithPendingCount";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

function CustomSidebar({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isCompact = isCollapsed || isMobile;
  const router = useRouter();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  // const toggleSidebar = useCallback(() => {
  //   setIsCollapsed((prev) => !prev);
  // }, []);
  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setSidebarVisible((prev) => !prev);
    } else {
      setIsCollapsed((prev) => !prev);
    }
  }, [isMobile]);
  const pageSize = 10;
  const page = 1;
  const search = "";
  const { countPendingRequisition } = useRequisitionWithPendingCount(
    page,
    pageSize,
    search
  );

  // ✅ Ensure hydration is complete before rendering dynamic content
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarVisible(false);
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    router.push("/admin/login");
    Cookies.remove("access");
    Cookies.remove("refresh");
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <aside
        className={cn(
          "fixed md:relative flex flex-col h-full min-h-screen w-72 border-r border-divider bg-[#223C55] dark:bg-[#1D1E24] p-6 text-white transition-all duration-300 ease-in-out",
          {
            "w-16 items-center px-2 py-6": isCollapsed && !isMobile, // Collapse mode on desktop
            "hidden md:flex": isMobile && !sidebarVisible, // Hide on mobile unless toggled
          }
        )}
      >
        {/* ✅ Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4 p-2 rounded-md bg-gray-700 hover:bg-gray-600 text-white"
          aria-label="Toggle Sidebar"
        >
          <Icon icon="solar:sidebar-minimalistic-outline" width={20} />
        </button>

        {/* ✅ Sidebar Content */}
        <ScrollShadow className="flex-1 -mr-6 h-full max-h-full pt-8 pr-6 overflow-auto">
          {sectionItemsWithTeams.map((section) => (
            <Link href={section.href} key={section.key} passHref>
              <div
                className={cn(
                  "flex items-center py-3 px-4 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer",
                  { "justify-center": isCompact }
                )}
              >
                <div className="flex">
                  <span className="px-2 py-1">{section.icon}</span>

                  {section.title === "Requisition" ? (
                    <>
                      {!isCompact && <span>{section.title}</span>}
                      {!isCompact && (
                        <span className="text-success-500 rounded-full text-sm px-1 mt-0.5">
                          {isClient
                            ? countPendingRequisition !== undefined
                              ? `(${countPendingRequisition})`
                              : "(0)"
                            : "..."}
                        </span>
                      )}
                    </>
                  ) : (
                    !isCompact && <span>{section.title}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </ScrollShadow>

        <Spacer y={2} />
        <div
          className={cn("mt-auto flex flex-col pb-6", {
            "items-center": isCompact,
          })}
        >
          <Tooltip content="Help & Feedback" placement="right">
            <button
              onClick={() => console.log("Help Clicked")}
              className="text-white flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg"
            ></button>
          </Tooltip>
          <Tooltip content="Log Out" placement="right">
            <button
              onClick={() => handleLogout()}
              className="text-white flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg mt-3"
            >
              <Icon icon="solar:minus-circle-line-duotone" width={24} />
              {!isCompact && "Log Out"}
            </button>
          </Tooltip>
        </div>
      </aside>

      {/* ✅ Main Content */}
      <div className="w-full flex-1 flex flex-col p-3 min-h-screen overflow-auto">
        <main className="mt-4 h-full w-full">{children}</main>
      </div>
    </div>
  );
}

export default CustomSidebar;
