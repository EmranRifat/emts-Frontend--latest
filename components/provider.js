import UserProvider from "lib/context/ContextProvider";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Provider({ children }) {
    let router = useRouter();
    let queryClient = new QueryClient();


    return (
        <QueryClientProvider client={queryClient}>
            <NextUIProvider navigate={router.push}>
                <UserProvider>
                    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light">
                        {children}
                    </ThemeProvider>
                </UserProvider>
            </NextUIProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}