"use client";

import Link from "next/link";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";
import logo from "../../../public/logo.png";
import {
  Code,
  Images,
  LayoutDashboard,
  LucideProps,
  Music,
  Settings,
  Text,
  Video,
  Zap,
} from "lucide-react";
import { usePathname } from "next/navigation";
import {
  ForwardRefExoticComponent,
  RefAttributes,
  useEffect,
  useState,
} from "react";
import useUsage from "@/app/store/usage";
import { useUser } from "@clerk/nextjs";
import LoadingDefault from "../loading/loading";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { FreeTierCard, ProTierCard } from "./usage-card";

const monsterrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

type Item = {
  label: string;
  logo: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
  href: string;
  hover?: string;
};

const routes: Item[] = [
  {
    label: "Dashboard",
    logo: LayoutDashboard,
    color: "text-blue-500",
    href: "/dashboard",
    hover: "hover:text-blue-200",
  },
  {
    label: "Image Generation",
    logo: Images,
    color: "text-green-500",
    href: "/dashboard/image-generation",
    hover: "hover:text-green-200",
  },

  {
    label: "Music Generation",
    logo: Music,
    color: "text-purple-500",
    href: "/dashboard/music",
    hover: "hover:text-purple-200",
  },
  {
    label: "Conversation",
    logo: Text,
    color: "text-yellow-500",
    href: "/dashboard/conversation",
    hover: "hover:text-yellow-200",
  },

  {
    label: "Settings",
    logo: Settings,
    color: "text-white",
    href: "/dashboard/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { fetchUsage, usage, plan } = useUsage();
  const [loading, setLoading] = useState(true);
  const user = useUser();

  useEffect(() => {
    fetchUsage(user.user?.id!).finally(() => setLoading(false));
  }, [user.user]);

  return (
    <div className="w-full flex flex-col h-full py-4 px-4 overflow-auto">
      <Link href={"/dashboard"} className="flex h-fit w-full items-center">
        <div>
          <Image src={logo} alt="logo" width={50} height={50} />
        </div>
        <div className={cn(monsterrat.className, "text-2xl font-bold")}>
          Genius
        </div>
      </Link>
      <div className="flex-1">
        {routes.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "flex gap-1 items-center my-4 rounded-lg py-2 px-2",
              item.hover,
              pathname === item.href ? "bg-white/10" : ""
            )}
          >
            <item.logo className={cn(item.color, "mr-2")}></item.logo>
            <div className={cn("font-bold")}>{item.label}</div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-2 md:mt-4">
        {loading ? (
          <LoadingDefault color="bg-gray-100/10" height={130} />
        ) : plan === "FREE" ? (
          <Link href={"/dashboard/settings"}>
            <FreeTierCard usage={usage} />
          </Link>
        ) : (
          <ProTierCard />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
