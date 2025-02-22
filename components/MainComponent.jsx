"use client"
import React from "react";
import { useState, useEffect } from "react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import CartsWidget from "components/admin/widget/CartsWidget";
import { useLoginSsoRedirectToken } from "lib/hooks/useLoginSsoRedirectToken";
import ApexChart from "components/admin/chart/HomeBarChart";
import { useRouter } from "next/router";

const MainComponent = () => {

    const [timeFrame, setTimeFrame] = useState("monthly");
    const router = useRouter();
    const {
        data,
        isLoading,
        error,
    } = useLoginSsoRedirectToken();
    useEffect(() => {
        if (
            !Cookies.get("access") ||
            Cookies.get("access") === undefined ||
            !Cookies.get("refresh") ||
            Cookies.get("refresh") === undefined
        ) {


            console.log("redirect token from hook", data);
            console.log("No token found", data);

            if (typeof window !== "undefined" && data) {
                // Client-side code only
                console.log("redirect url", `${process.env.NEXT_PUBLIC_SSO_FRONTEND_URL}/login?redirect=${data}`);
                window.location.href = `${process.env.NEXT_PUBLIC_SSO_FRONTEND_URL}/login?redirect=${data}`;
            }
        }
    }, [data]); // Ensure this runs on mount


    // if (!Cookies.get("access") || Cookies.get("access") === undefined || !Cookies.get("refresh") || Cookies.get("refresh") === undefined) {
    //     const {
    //         data,
    //         isLoading,
    //         error,
    //     } = useLoginSsoRedirectToken();
    //     console.log(data);
    //     console.log("No token found", data);
    //     if (window !== undefined) {
    //         window.location.href = `${process.env.NEXT_PUBLIC_SSO_FRONTEND_URL}/login?redirect_token=${data}`

    //     }

    // }

    const handleTimeFrameChange = (frame) => {
        setTimeFrame(frame);
    };
    return (

        <main className="w-full px-4 pb-6 sm:pt-10 lg:pt-14 xl:px-8 xl:pb-12">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pb-4 px-1">
                <h2 className="text-gray-600 text-lg sm:text-xl">At A Glance</h2>
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
                    <DropdownMenu
                        className="text-[#223C55] shadow-lg rounded-lg border border-gray-300 bg-white mt-1"
                        aria-label="Time Frame Selection"
                    >
                        <DropdownItem
                            key="hourly"
                            onClick={() => handleTimeFrameChange("hourly")}
                            className="py-2 px-4 hover:bg-gray-100 transition-colors"
                        >
                            Hourly
                        </DropdownItem>
                        <DropdownItem
                            key="daily"
                            onClick={() => handleTimeFrameChange("daily")}
                            className="py-2 px-4 hover:bg-gray-100 transition-colors"
                        >
                            Daily
                        </DropdownItem>
                        <DropdownItem
                            key="weekly"
                            onClick={() => handleTimeFrameChange("weekly")}
                            className="py-2 px-4 hover:bg-gray-100 transition-colors"
                        >
                            Weekly
                        </DropdownItem>
                        <DropdownItem
                            key="monthly"
                            onClick={() => handleTimeFrameChange("monthly")}
                            className="py-2 px-4 hover:bg-gray-100 transition-colors"
                        >
                            Monthly
                        </DropdownItem>
                        <DropdownItem
                            key="fortnightly"
                            onClick={() => handleTimeFrameChange("fortnightly")}
                            className="py-2 px-4 hover:bg-gray-100 transition-colors"
                        >
                            Fortnightly
                        </DropdownItem>
                        <DropdownItem
                            key="yearly"
                            onClick={() => handleTimeFrameChange("yearly")}
                            className="py-2 px-4 hover:bg-gray-100 transition-colors"
                        >
                            Yearly
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>

            <div className="2xl:flex 2xl:space-x-12 relative">
                <div className="mb-6 2xl:mb-0 2xl:flex-1">
                    <CartsWidget timeFrame={timeFrame} />



                    <div className="mb-6 xl:flex xl:space-x-6 pt-6 flex-wrap space-y-6">

                        <ApexChart timeFrame={timeFrame} />

                        {/* <TopTransactions filter={timeFrame} /> */}
                    </div>
                    <div className="pt-6">
                        {/* <TransactionComponent /> */}
                    </div>
                </div>
            </div>
        </main>

    );
}

export default MainComponent;