"use client";

// [todo] :: in this page there is too much prop dirlling convert into context api orivider ot prevent prop dirlling.

import { Laptop, Moon, Settings, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";
import Header from "@/components/ui/header";
import { useEffect, useState } from "react";
import LoadingDefault from "@/components/loading/loading";
import { useUser } from "@clerk/nextjs";
import PriceCard from "@/components/ui/custom-card";
import useUsage from "@/app/store/usage";
import ProSubscriptionCard from "@/components/pro-subscription-card.ts/pro-subscription-card";

const plans = [
  {
    name: "Silver",
    price: "3.99",
    d_month: "1",
    description:
      "Our most affordable plan to get you started in the world of AI and boost your productivity.",
    gradientColor:
      "after:dark:from-gray-500 after:dark:via-slate-200 after:from-purple-500 after:via-pink-600",
  },
  {
    name: "Gold",
    price: "11.99",
    d_month: "3",
    description:
      "A mid-range plan for AI enthusiasts, perfect for getting started with enhanced features.",
  },
  {
    name: "Platinum",
    price: "20.59",
    d_month: "6",
    description:
      "Our premium plan offering complete access to advanced AI tools and maximum productivity for professionals.",
    gradientColor: "after:from-gray-900 after:via-slate-500",
  },
];

const Page = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const user = useUser();
  const [loadingOfSubmission, setLoadingOfSubmission] = useState(false);
  const { plan, rank, valid_date, fetchUsage } = useUsage();

  async function onSubscribe(title: string) {
    setLoadingOfSubmission(true);

    const req = {
      title,
      uid_clerk: user.user?.id,
    };

    try {
      const res = await fetch(process.env.NEXT_PUBLIC_SUBSCRIBE!, {
        method: "POST",
        body: JSON.stringify(req),
      });

      if (!res.ok) {
        const error = (await res.json()).error;
        console.error(error);
      }
      // check if user is authenticated
      if (user.user?.id) fetchUsage(user.user?.id);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOfSubmission(false);
    }
  }

  useEffect(() => {
    setLoading(false);
    return () => setLoading(true);
  }, [theme]);

  if (loading) {
    return (
      <div>
        <Header
          label="Settings"
          icon={Settings}
          description="Manage all your app settings here."
        />
        <div className="my-4 md:my-8 flex flex-col gap-y-3 md:gap-y-6">
          <LoadingDefault width={300} key={1} />
          <LoadingDefault width={100} key={2} />
          <LoadingDefault key={3} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        label="Settings"
        icon={Settings}
        description="Manage all your app settings here."
      />
      <div className="my-4 md:my-8 flex flex-col gap-y-3 md:gap-y-6">
        <div className="flex gap-x-2 items-center">
          <p className="text-lg md:text-xl font-semibold">
            Our Availabel Themes
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="capitalize"
                variant={theme.theme === "light" ? "outline" : "default"}
              >
                {theme.theme === "dark" ? (
                  <Moon />
                ) : theme.theme === "light" ? (
                  <Sun />
                ) : (
                  <Laptop />
                )}
                <span>{theme.theme}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Available Themes</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => theme.setTheme("dark")}>
                <Moon />
                <span>Dark</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => theme.setTheme("light")}>
                <Sun />
                <span>Light</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => theme.setTheme("system")}>
                <Laptop />
                <span>System</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {!plan && <LoadingDefault key={"loading"} />}
        {plan === "FREE" && (
          <div
            key={"freeusercard"}
            className="my-4 md:my-8 flex flex-col gap-y-4"
          >
            <span className="font-bold">
              Get Unlimited Generations
              <span className="bg-gradient-to-tr text-white from-purple-500 to-pink-500 py-2 px-3 rounded-2xl mx-1">
                pro
              </span>
            </span>
            <DropdownMenuSeparator />
            <div className="flex flex-col md:flex-row items-center justify-center flex-wrap gap-4 md:gap-8">
              {plans.map((plan, index) => (
                <PriceCard
                  key={index}
                  discription={plan.description}
                  month={plan.d_month}
                  price={plan.price}
                  title={plan.name}
                  loading={loadingOfSubmission}
                  gradientString={plan?.gradientColor}
                  action={() => {
                    onSubscribe(plan.name);
                  }}
                />
              ))}
            </div>
          </div>
        )}
        {plan === "PRO" && (
          <ProSubscriptionCard
            rank={rank!}
            valid_date={valid_date!}
            key={"prousercard"}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
