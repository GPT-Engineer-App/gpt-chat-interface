import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="flex flex-col min-h-screen p-4 overflow-auto items-center justify-center bg-[#00061a] text-[#fcfbe7] font-poppins">
      <Outlet />
    </main>
  );
};

export default Layout;