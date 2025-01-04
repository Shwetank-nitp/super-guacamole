import { create } from "zustand";

interface Usage {
  usage: number;
  plan: "FREE" | "PRO" | null;
  rank?: "SILVER" | "GOLD" | "PLATINUME";
  valid_date?: string;
  fetchUsage: (uid: string) => Promise<void>;
  setUsage: (num: number, plan: "PRO" | "FREE" | null) => void;
}

const useUsage = create<Usage>((set) => ({
  usage: 0,
  plan: null,
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
      const date = new Date(data.result?.valid_date);
      const dateString = date.toUTCString();
      set({
        usage: Number(process.env.NEXT_PUBLIC_USAGE_LIMIT!) - data.result.usage,
        plan: data.result.plan,
        rank: data.result?.title,
        valid_date: dateString,
      });
    });
  },
  setUsage: (num: number, plan: "PRO" | "FREE") => {
    set({ usage: num, plan });
  },
}));

export default useUsage;
