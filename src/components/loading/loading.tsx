import Image from "next/image";
import loading from "../../../public/starIcon.png";
import { cn } from "@/lib/utils";

interface LoadingProps {
  height?: number;
  width?: number;
  color?: string;
  className?: string;
  children?: React.ReactNode;
}

const LoadingDefault = ({
  height = 50,
  width = 250,
  color = "dark:bg-gray-100/50 bg-gray-800/30",
  className,
  children,
}: LoadingProps) => {
  return (
    <div
      style={{ height: height + "px", width: width + "px" }}
      className={cn("animate-pulse rounded-md", color, className)}
    >
      {children}
    </div>
  );
};

export default LoadingDefault;
