import Sidebar from "@/components/layout/Sidebar";
import layout from "@/app/(pages)/layout.module.css"

export default function RootLayout({ children }) {
    return (
        <div className={layout.layout}>
            <Sidebar />
            {children}
        </div>
    );
}
