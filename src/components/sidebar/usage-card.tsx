import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Zap } from "lucide-react";

const FreeTierCard = ({ usage }: { usage: number }) => {
  return (
    <Card className="bg-white/10 border-none text-white">
      <CardHeader>
        <span className="capitalize font-bold text-sm">
          {usage} / {process.env.NEXT_PUBLIC_USAGE_LIMIT} Free generations used
        </span>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-4">
        <Progress
          
          value={(usage / Number(process.env.NEXT_PUBLIC_USAGE_LIMIT!)) * 100}
        />
        <Button className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white font-bold capitalize">
          <span>Upgrade to Pro</span>
          <Zap fill="white" />
        </Button>
      </CardContent>
    </Card>
  );
};

const ProTierCard = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-2 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-lg px-4 py-2">
      <span className="text-sm font-bold capitalize">PRO user enjoy!</span>
      <Zap fill="white" size={16} />
    </div>
  );
};

export { FreeTierCard, ProTierCard };
