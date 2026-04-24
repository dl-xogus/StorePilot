"use client"
import Sidebar from "@/components/layout/Sidebar";
import layout from "@/app/(pages)/layout.module.css"
import { useEffect, useState } from "react";

export default function RootLayout({ children }) {
    const [path,setPath] = useState()
    const url = window.location.pathname;
    let bln=false;

    useEffect(function(){        
        switch(url.substring(1)){
            case 'signup' : bln=false; break;
            case 'login' : bln=false; break;
            case 'onboarding' : bln=false; break;
            default:bln=true;
        }
        setPath(bln)
    },[url])


    return (
        <div className={layout.layout}>
            { path && <Sidebar /> }
            {children}
        </div>
    );
}
