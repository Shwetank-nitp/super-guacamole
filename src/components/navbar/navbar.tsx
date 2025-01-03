"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import MobileSidebar from "@/components/mobile/sidebar/sidebar";
import LoadingDefault from "../loading/loading";

const NavBar = () => {
  const user = useUser();
  return (
    <div className="flex items-center p-4">
      <MobileSidebar />
      <div className="w-full flex justify-end">
        {!user.isLoaded ? (
          <LoadingDefault width={25} height={25} />
        ) : (
          <UserButton />
        )}
      </div>
    </div>
  );
};

export default NavBar;
