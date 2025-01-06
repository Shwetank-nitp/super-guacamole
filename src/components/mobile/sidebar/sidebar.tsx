import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import ItemOfTheSidebar from "@/components/sidebar/sidebar";

const Sidebar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 bg-gray-900 text-gray-200">
        <SheetHeader className="hidden">
          <SheetTitle>Sage</SheetTitle>
        </SheetHeader>
        <ItemOfTheSidebar />
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
