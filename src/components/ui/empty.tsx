import Image from "next/image";
import emptyImage from "../../../public/empty.png";
import { cn } from "@/lib/utils";

const Empty = (className: { className?: string }) => {
  return (
    <div
      className={cn(
        className,
        "h-full w-full flex flex-col justify-center items-center text-center gap-y-4 md:gap-y-8"
      )}
    >
      <div className="rounded-full bg-gray-300/50 p-6">
        <Image alt="empty" src={emptyImage} width={150} height={150} />
      </div>
      <p className="text-sm text-muted-foreground font-bold">
        Oops! we have nothing to show.
      </p>
    </div>
  );
};

export default Empty;
