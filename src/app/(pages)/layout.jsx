"use client";
import Sidebar from "@/components/layout/Sidebar";
import { usePathname } from "next/navigation";
import layout from "@/app/(pages)/layout.module.css"

const HIDE_SIDEBAR_ROUTES = ['/signup', '/login', '/welcome', '/onboarding'];

export default function RootLayout({ children }) {
    const pathname = usePathname();
    const hideSidebar = HIDE_SIDEBAR_ROUTES.some((route) => pathname.startsWith(route));

    return (
        <div className={layout.layout}>
            {!hideSidebar && <Sidebar />}
            {children}
        </div>
    );
}
