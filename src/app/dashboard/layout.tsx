import NavBar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full relative">
      <div className="bg-gray-900 hidden h-full md:w-72 md:flex md:flex-col md:inset-y-0 md:z-[40] md:fixed text-gray-200">
        <Sidebar />
      </div>
      <main className="md:pl-72">
        <NavBar />
        {children}
      </main>
    </div>
  );
};

export default Layout;
