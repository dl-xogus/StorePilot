"use client"
import Sidebar from "@/components/layout/Sidebar";
import layout from "@/app/(pages)/layout.module.css"
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Front from "./front/page";
import useAIStore from "@/store/aiStore";

export default function RootLayout({ children }) {
    const [path,setPath] = useState()
    const url = usePathname();
    let bln=false;

    const [fronOpen, setFrontOpen] = useState(false);
    const fetchAll = useAIStore(state => state.fetchAll);

    // 앱 진입 시 AI 분석을 백그라운드에서 미리 호출
    useEffect(() => { fetchAll(); }, []);

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
