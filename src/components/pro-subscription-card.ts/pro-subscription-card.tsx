import { Crown, Shield, Star } from "lucide-react";

interface ProSubscriptionCardProps {
  rank: string;
  features?: string[];
  valid_date: string;
}

const ProSubscriptionCard = ({
  rank,
  features = [
    "Unlimited access to all features",
    "Priority customer support",
    "Custom analytics dashboard",
    "API access",
  ],
  valid_date,
}: ProSubscriptionCardProps) => {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl shadow-xl overflow-hidden border">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-10 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Crown className="h-8 w-8" />
                <h1 className="text-3xl font-bold">Pro Member</h1>
              </div>
              <span className="px-4 py-1 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                Active
              </span>
            </div>
            <p className="mt-4 text-indigo-100">
              You're subscribed to our {rank} plan
            </p>
          </div>
          <div className="px-8 py-6">
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-b-gray-800">
              <div>
                <p className="text-muted-foreground">Subscription Status</p>
                <p className="text-lg dark:text-slate-200 text-slate-800 font-semibold ">
                  Active until {valid_date}
                </p>
              </div>
              <Shield className="h-6 w-6 text-green-500" />
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-muted-foreground">
                <Star className="h-5 w-5 mr-2 text-yellow-500" />
                Your Pro Features
              </h3>
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-center text-muted-foreground"
                  >
                    <div className="h-2 w-2 rounded-full bg-indigo-500 mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p className="text-center mt-6 text-gray-600">
          Need help? Contact our priority support at support@us.com
        </p>
      </div>
    </div>
  );
};

export default ProSubscriptionCard;
