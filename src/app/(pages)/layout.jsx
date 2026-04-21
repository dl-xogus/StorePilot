import Sidebar from "@/components/layout/Sidebar";

export default function RootLayout({ children }) {
  return (
      <div>
        <Sidebar/>
        {children}
      </div>
  );
}
