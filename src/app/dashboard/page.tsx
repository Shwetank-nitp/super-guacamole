import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  MessageSquare,
  Image,
  Video,
  Music,
  Code,
  LucideProps,
  MoveRight,
} from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type Item = {
  label: string;
  color: string;
  bgColor: string;
  href: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

const features: Item[] = [
  {
    label: "Image Generation",
    color: "text-green-500",
    bgColor: "bg-green-100",
    href: "/dashboard/image-generation",
    icon: Image,
  },
  {
    label: "Music",
    color: "text-purple-500",
    bgColor: "bg-purple-100",
    href: "/dashboard/music",
    icon: Music,
  },
  {
    label: "Conversation",
    color: "text-yellow-500",
    bgColor: "bg-yellow-100",
    href: "/dashboard/conversation",
    icon: MessageSquare,
  },
];

const Dashboard = () => {
  return (
    <div className="py-4 px-4 md:px-12 md:py-12">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">
          Explore the power of AI
        </h1>
        <p className="text-muted-foreground ">
          Follow to the give tools to learn and explore new things
        </p>
      </div>
      <div>
        <div className="flex flex-col gap-y-4 mt-6">
          {features.map((item, index) => (
            <Card
              key={index}
              className="hover:shadow-lg hover:transition-shadow overflow-hidden p-3"
            >
              <Link href={item.href} className="flex items-center gap-x-3">
                <div
                  className={cn(
                    item.color,
                    item.bgColor,
                    "w-max p-2 rounded-md"
                  )}
                >
                  <item.icon></item.icon>
                </div>
                <span className="font-bold md:text-lg flex-1">
                  {item.label}
                </span>
                <MoveRight className="mr-4" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
