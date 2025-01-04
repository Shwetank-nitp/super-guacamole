import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CardProps {
  gradientString?: string;
  price: string;
  month: string;
  title: string;
  discription: string;
  className?: string;
  action?: () => void;
  loading: boolean;
}

const PriceCard = ({
  gradientString = "after:from-orange-300 after:via-yellow-700",
  price,
  month,
  title,
  className,
  discription,
  loading,
  action,
}: CardProps) => {
  return (
    <div
      className={cn(
        "border rounded-md px-4 py-2 transition-all hover:shadow-md relative hover:after:opacity-100 after:content-[''] after:opacity-0 after:rotate-90 after:bg-gradient-to-tr after:h-[100%] after:w-[100%] after:inset-0 after:absolute after:-z-20 overflow-hidden after:blur-2xl after:animate-rotate before:absolute before:content-[''] before:bg-primary-foreground before:-z-10 before:inset-0 before:m-1",
        gradientString,
        className
      )}
    >
      <div className="text-center font-bold text-2xl md:text-3xl">{title}</div>
      <div className="flex justify-between my-4">
        <span className="text-lg capitalize font-semibold">Price</span>
        <span className="text-muted-foreground">
          $ {price} for {month} month
        </span>
      </div>
      <div className="text-sm text-muted-foreground text-center max-w-[350px] m-auto">
        {discription}
      </div>
      <div className="mt-4">
        <Button
          disabled={loading}
          onClick={action}
          className="bg-gradient-to-tr text-white font-bold from-pink-500 to-purple-500 float-right"
        >
          Subscribe
        </Button>
      </div>
    </div>
  );
};

export default PriceCard;
