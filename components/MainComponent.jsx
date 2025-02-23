"use client";

import React, { useState, useEffect } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Cookies from "js-cookie";
import CartsWidget from "components/admin/widget/CartsWidget";
import { useLoginSsoRedirectToken } from "lib/hooks/useLoginSsoRedirectToken";
import ApexChart from "components/admin/chart/HomeBarChart";
import { useRouter } from "next/navigation";
import TopTransactions from "./admin/Transaction/TopTransactions";
import TransactionComponent from "./TransactionComponent";
import Link from "next/link";

const MainComponent = () => {
    const [timeFrame, setTimeFrame] = useState("monthly");
    const [isClient, setIsClient] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();
    const { data } = useLoginSsoRedirectToken();

    // ✅ Ensure component only renders on client
    useEffect(() => {
        setIsClient(true);
    }, []);

    // ✅ Prevent SSR execution for authentication check
    useEffect(() => {
        if (isClient) {
            if (!Cookies.get("access") || !Cookies.get("refresh")) {
                console.log("No token found", data);
                if (data) {
                    window.location.href = `${process.env.NEXT_PUBLIC_SSO_FRONTEND_URL}/login?redirect=${data}`;
                }
            }
        }
    }, [isClient, data]);

    // ✅ Prevent hydration issues
    if (!isClient) return null;

    return (
        <main className="w-full px-4 pb-6 sm:pt-10 lg:pt-14 xl:px-8 xl:pb-12 ">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-4 px-1 ">

                {/* ✅ Mobile Sidebar Menu - Only Rendered on Client */}
                {isClient && (
                    <div
                        className={`fixed top-0 left-0 z-40 w-[250px] h-screen bg-[#223C55] text-white transition-transform duration-300 ${
                            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                        } md:hidden`}
                    >
                        <div className="flex justify-between items-center px-6 h-[70px] border-b border-gray-500">
                            <span className="text-lg font-semibold">Menu</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="text-xl"
                            >
                                ✖
                            </button>
                        </div>
                        <nav className="p-6 space-y-4">
                            <Link href="/" className="block text-lg" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                            <Link href="/transaction" className="block text-lg" onClick={() => setIsMobileMenuOpen(false)}>Transaction</Link>
                            <Link href="/users" className="block text-lg" onClick={() => setIsMobileMenuOpen(false)}>Users</Link>
                            <Link href="/self_operator" className="block text-lg" onClick={() => setIsMobileMenuOpen(false)}>Self Operator</Link>
                            <Link href="/requisition" className="block text-lg" onClick={() => setIsMobileMenuOpen(false)}>Requisition</Link>
                            <button onClick={() => router.push("/login")} className="block text-lg text-red-400">Log Out</button>
                        </nav>
                    </div>
                )}

                <h2 className="text-gray-600 dark:text-white text-lg sm:text-xl mt-4 md:mt-0">At A Glance</h2>
                <Dropdown>
                    <DropdownTrigger>
                        <Button
                            size="sm"
                            className="font-semibold rounded-lg shadow-lg bg-gradient-to-r from-blue-500 to-[#5fdfd8] text-white"
                            color="primary"
                            variant="faded"
                        >
                            {timeFrame} ⌵
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu className="text-[#223C55] dark:text-white shadow-lg rounded-lg border border-gray-300 bg-white dark:bg-darkblack-600 mt-1" aria-label="Time Frame Selection">
                        {["hourly", "daily", "weekly", "monthly", "fortnightly", "yearly"].map((frame) => (
                            <DropdownItem
                                key={frame}
                                onClick={() => setTimeFrame(frame)}
                                className="py-2 px-4 hover:bg-gray-100 transition-colors"
                            >
                                {frame.charAt(0).toUpperCase() + frame.slice(1)}
                            </DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div className="2xl:flex 2xl:space-x-12 relative">
                <div className="mb-6 2xl:mb-0 2xl:flex-1">
                    <CartsWidget timeFrame={timeFrame} />
                    <div className="mb-6 xl:flex xl:space-x-6 pt-6 flex-wrap space-y-6 ">
                        <ApexChart timeFrame={timeFrame} />
                        <TopTransactions filter={timeFrame} />
                    </div>
                    {/* <div className="pt-6">
                        <TransactionComponent />
                    </div> */}
                </div>
            </div>
        </main>
    );
};

export default MainComponent;
