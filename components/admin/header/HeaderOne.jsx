"use client";

import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import ModeToggler from "./ModeToggler";
import { UserContext } from "lib/context/ContextProvider";

function HeaderOne() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
console.log("user>>>>", user);
  const handleLogout = async () => {
    router.push("/admin/login");
    Cookies.remove("access");
    Cookies.remove("refresh");
  };

  return ( 
    <header className=" z-30 w-full bg-[#C41C22]">
      <div className="flex h-[70px] w-full justify-between items-center px-6 md:px-10 dark:bg-darkblack-400">
        
        {/* ✅ Mobile Menu Button */}
        <button
          aria-label="Toggle Sidebar"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="block md:hidden focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-8 h-8 text-white transition-transform duration-300 mr-4"
            style={{
              transform: isMobileMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* ✅ Mobile Sidebar Menu */}
        <div
          className={`fixed top-0 left-0 z-40 w-[200px] h-screen bg-[#223C55] text-white transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="flex justify-between items-center px-6 h-[70px] border-b border-gray-500">
            <h1 className="text-lg font-semibold">Menu</h1>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl"
            >
              ✖
            </button>
          </div>
          <nav className="p-6 space-y-4">
            <Link
              href="/"
              className="block text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/transaction"
              className="block text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Transaction
            </Link>
            <Link
              href="/admin/users"
              className="block text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Users
            </Link>
            <Link
              href="/admin/self_operator"
              className="block text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Self Operator
            </Link>
            <Link
              href="/admin/requisiton"
              className="block text-lg"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Requisition
            </Link>
            <button
              onClick={handleLogout}
              className="block text-lg text-red-400"
            >
              Log Out
            </button>
          </nav>
        </div>

        {/* ✅ Sidebar Overlay (Closes on Click) */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* ✅ Logo */}
        <Link href="/">
          <Image
            width={100}
            height={100}
            src="/logo/bird-emts.svg"
            alt="logo"
          />
        </Link>

        {/* ✅ Right-Side User Section */}
        <div className="ml-auto flex items-center space-x-3">
          <ModeToggler />

          <p className="text-white text-sm hidden md:block">
            {user?.userName ? user.userName : ""}
            {user?.userType ? ` (${user.userType.toUpperCase()})` : ""}
          </p>
          {/* ✅ User Dropdown */}
          <Dropdown
            className="bg-white shadow-lg rounded-lg"
            placement="bottom-end"
          >
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.userType || "Guest"}
                size="sm"
                src="/icons/700674.png"
              />
            </DropdownTrigger>

          <DropdownMenu
            aria-label="Profile Actions"
            className="py-2 px-4 rounded-lg shadow-lg bg-white dark:bg-darkblack-400"
          >
  

          <DropdownItem
            key="profile"
            className="text-gray-600 font-bold hover:bg-gray-100 rounded-md"
          >
            <p className="text-gray-800 dark:text-white text-sm"> 
              {user?.userName ? user.userName : ""}
              {user?.userType ? ` (${user.userType.toUpperCase()})` : " "}
            </p>
          </DropdownItem>
          <DropdownItem
            key="logout"
            className="text-red-600 font-bold hover:bg-red-100 rounded-md"
            onClick={handleLogout}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>

          </Dropdown>
        </div>
      </div>
    </header>
  );
}

export default HeaderOne;
