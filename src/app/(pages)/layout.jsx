"use client"

import Sidebar from "@/components/layout/Sidebar";
import layout from "@/app/(pages)/layout.module.css"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
// import Front from "@/components/경로/Front";

export default function RootLayout({ children }) {
const [path, setPath] = useState()
const url = usePathname();
let bln = false;

const [fronOpen, setFrontOpen] = useState(false);
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

useEffect(function () {
    if (isMobileMenuOpen) {
        document.body.classList.add("menu-open");
    } else {
        document.body.classList.remove("menu-open");
    }

    return function () {
        document.body.classList.remove("menu-open");
    }
}, [isMobileMenuOpen])

useEffect(function () {
    switch (url.substring(1)) {
        case 'signup': bln = false; break;
        case 'login': bln = false; break;
        case 'onboarding': bln = false; break;
        default: bln = true;
    }

    setPath(bln)
    setIsMobileMenuOpen(false)
}, [url])

return (
    <div className={`${layout.layout} ${isMobileMenuOpen ? layout.mobileOpen : ""}`}>
        {path && (
            <div className={layout.mobileSidebar}>
                <Sidebar
                    setFrontOpen={setFrontOpen}
                    frontOpen={fronOpen}
                />
            </div>
        )}

        <div className={layout.children}>
            {isMobileMenuOpen && (
                <div
                    className={layout.mobileDim}
                    onClick={() => setIsMobileMenuOpen(false)}
                ></div>
            )}

            {path && (
                <header className={layout.mobileHeader}>
                    <button
                        type="button"
                        className={layout.burgerBtn}
                        onClick={() => setIsMobileMenuOpen(true)}
                    >
                        ☰
                    </button>
                </header>
            )}

            {children}

            {fronOpen && (
                <Front onClose={() => setFrontOpen(false)} />
            )}
        </div>
    </div>
);

}
