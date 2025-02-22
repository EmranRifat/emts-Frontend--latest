import React, { useCallback, useState } from "react";
import { Avatar, ScrollShadow, Spacer, Tooltip } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { useMediaQuery } from "usehooks-ts";
import Link from "next/link";
import { cn } from "@nextui-org/react";
import { sectionItemsWithTeams } from "./sidebar-items";
import Image from "next/image";
import { useRequisitionWithPendingCount } from "lib/hooks/admin/requisition/useRequisitionWithPendingCount";

function CustomSidebar({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isCompact = isCollapsed || isMobile;

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);


  const pageSize = 10;
  const page = 1;
  const search = "";
  const { countPendingRequisition, refetch_requisitions } =
    useRequisitionWithPendingCount(page, pageSize, search);



  return (
    <div className="flex h-screen w-full ">
      {/* Sidebar Container */}
      <aside
        className={cn(
          "relative flex h-full w-72 flex-col border-r border-divider bg-[#223C55] dark:bg-[#1D1E24] p-6 text-white transition-all",
          { "w-16 items-center md:px-2 pl-2 md:pl-0 py-6": isCompact }
        )}
      >
       
        {/* Toggle Button - Top Right */}
        <button
          onClick={toggleSidebar}
          className="absolute top-4 right-4  p-2  rounded-md bg-gray-700 hover:bg-gray-600 text-white"
          aria-label="Toggle Sidebar"
        >
          <Icon icon="solar:sidebar-minimalistic-outline" width={20} />
        </button>

        <ScrollShadow className="-mr-6 h-full max-h-full pt-8 pr-6">
          {sectionItemsWithTeams.map((section) => (
            <Link href={section.href} key={section.key} passHref>
              <div
                className={cn(
                  "flex items-center px- py-3 text-white rounded-lg hover:bg-gray-800 transition-colors cursor-pointer",
                  { "justify-center": isCompact }
                )}
              >
                {/* <span className="px-2 py-1">   {section.icon}</span>
                {!isCompact && <span>{section.title}</span>} */}

                <div className="flex">
                  <span className="px-2 py-1">{section.icon}</span>
                  {section.title === "Requisition" ? (
                    <>
                      {!isCompact && <span>{section.title}</span>}
                      {!isCompact && (
                        <span className="text-success-500 rounded-full text-sm px-1 mt-0.5">
                          {countPendingRequisition > 0
                            ? `(${countPendingRequisition})`
                            : "(0)"}
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

        {/* Footer with Tooltips */}
        <Spacer y={2} />
        <div
          className={cn("mt-auto flex flex-col", { "items-center": isCompact })}
        >
          <Tooltip content="Help & Feedback" placement="right">
            <button
              onClick={() => console.log("Help Clicked")}
              className="text-white flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg"
            >
              <Icon icon="solar:info-circle-line-duotone" width={24} />
              {!isCompact && "Help & Information"}
            </button>
          </Tooltip>
          <Tooltip content="Log Out" placement="right">
            <button
              onClick={() => console.log("Log Out")}
              className="text-white flex items-center gap-2 p-2 hover:bg-gray-800 rounded-lg mt-3"
            >
              <Icon icon="solar:minus-circle-line-duotone" width={24} />
              {!isCompact && "Log Out"}
            </button>
          </Tooltip>
        </div>
      </aside>

      {/* Main Content */}
      <div className="w-full flex-1 flex-col p-3">
        <main className="mt-4 h-full w-full overflow-auto ">{children}</main>
      </div>
    </div>
  );
}

export default CustomSidebar;
