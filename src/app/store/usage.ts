import { create } from "zustand";

interface Usage {
  usage: number;
  plan: "FREE" | "PRO";
  rank?: "SILVER" | "GOLD" | "PLATINUME";
  fetchUsage: (uid: string) => Promise<void>;
  setUsage: (num: number, plan: "PRO" | "FREE") => void;
}

const useUsage = create<Usage>((set) => ({
  usage: 0,
  plan: "FREE",
  fetchUsage: async (userid: string) => {
    const response = await fetch(process.env.NEXT_PUBLIC_USAGE!, {
      method: "POST",
      body: JSON.stringify({
        uid_clerk: userid,
      }),
    });

    if (!response.ok) {
      return;
    }
    response.json().then((data) => {
      console.log(data);

      set({
        usage: Number(process.env.NEXT_PUBLIC_USAGE_LIMIT!) - data.result.usage,
        plan: data.result.plan,
        rank: data.result?.title,
      });
    });
  },
  setUsage: (num: number, plan: "PRO" | "FREE") => {
    set({ usage: num, plan });
  },
}));

export default useUsage;
