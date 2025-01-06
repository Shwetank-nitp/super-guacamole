import { cn } from "@/lib/utils";
import { Bot } from "lucide-react";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { Button } from "../ui/button";

const monstrat = Montserrat({
  weight: ["600", "300"],
  subsets: ["latin"],
});

const Navigation = () => {
  return (
    <div className="flex justify-between w-full h-full items-center">
      {/** Name of product */}
      <div className={cn("flex gap-x-1 items-center", monstrat.className)}>
        <h1 className="font-bold text-lg">Sage</h1>
        <span className="text-xs text-muted-foreground">Powerd by AI</span>
        <Bot size={13} className="text-muted-foreground" />
      </div>
      {/** options */}
      <div>
        <Link href={"/dashboard"}>
          <Button className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
