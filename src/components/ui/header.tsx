import { cn } from "@/lib/utils";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type HeaderPropType = {
  label: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  bgColor?: string;
  color?: string;
  description: string;
};

const Header = ({
  label,
  icon,
  bgColor,
  color,
  description,
}: HeaderPropType) => {
  const Icon = icon;
  return (
    <div>
      <div className="flex items-center gap-x-2 mb-2">
        <div className={cn("p-2 rounded-md border", bgColor, color)}>
          <Icon />
        </div>
        <div className="text-2xl font-bold">{label}</div>
      </div>
      <div className="text-sm text-muted-foreground font-semibold">
        {description}
      </div>
    </div>
  );
};

export default Header;
