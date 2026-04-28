"use client"
import Sidebar from "@/components/layout/Sidebar";
import layout from "@/app/(pages)/layout.module.css"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Front from "./front/page";

export default function RootLayout({ children }) {
    const [path,setPath] = useState()
    const url = usePathname();
    let bln=false;

    const [fronOpen, setFrontOpen] = useState(false);
    
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
            { path && <Sidebar setFrontOpen={setFrontOpen} frontOpen={fronOpen}/> }
            <div className={layout.children}>
                {children}

                {fronOpen &&
                    <Front
                        onClose={() => setFrontOpen(false)}
                    />
                }
            </div>
        </div>
    );
}
