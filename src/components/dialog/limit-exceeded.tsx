import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogHeader } from "../ui/dialog";
import {
  Check,
  Images,
  LucideProps,
  Music,
  Text,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Dispatch,
  ForwardRefExoticComponent,
  RefAttributes,
  SetStateAction,
} from "react";
import { cn } from "@/lib/utils";

interface Item {
  label: string;
  logo: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  color: string;
  bgColor: string;
}

const items: Item[] = [
  {
    label: "Image Generation",
    logo: Images,
    color: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    label: "Music Generation",
    logo: Music,
    color: "text-purple-500",
    bgColor: "bg-purple-100",
  },
  {
    label: "Conversation",
    logo: Text,
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
  },
];

const LimitExceeded = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e.valueOf())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Usage Limit Exceeded</DialogTitle>
          <DialogDescription>
            You have user your all 5 free demo usage to continue using our ai
            models please upgrade to pro plan.
          </DialogDescription>
        </DialogHeader>
        <div>
          {items.map((item, index) => (
            <div
              key={index}
              className="font-bold py-2 flex justify-between capitalize"
            >
              <div className="flex gap-x-2 items-center">
                <item.logo
                  size={30}
                  className={cn(
                    item.color,
                    item.bgColor,
                    "p-1 rounded-md border"
                  )}
                />
                {item.label}
              </div>
              <Check color="green" />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LimitExceeded;
