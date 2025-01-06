"use client";

import Header from "@/components/ui/header";
import { ArrowDown, Image } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Empty from "@/components/ui/empty";
import { useUser } from "@clerk/nextjs";
import LimitExceeded from "@/components/dialog/limit-exceeded";
import CircularProgress from "@/components/ui/circular-progressbar";
import useUsage from "@/store/usage";

const formSchema = z.object({
  query: z.string().min(1).max(200),
});

const ImageGeneration = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [imageurl, setImageUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const user = useUser();
  const [progress, setProgress] = useState<number>(0);
  const { usage, plan, setUsage } = useUsage();

  const submit = async (obj: z.infer<typeof formSchema>) => {
    setImageUrl(null);
    setLoading(true);
    setErrorMessage(null);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_TEXT2IMAGE_API!, {
        method: "POST",
        body: JSON.stringify({ query: obj.query, uid_clerk: user.user?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 410) {
        setOpen(true);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.error || "An error occurred");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
      setUsage(usage + 1, plan);
    } catch (error) {
      console.log("Error fetching image:", error);
      setErrorMessage("An error occurred while generating the image.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    const duration = 240000; // 4 minutes
    const updateInterval = 100; // Update every 100ms
    const steps = duration / updateInterval;
    let count = 0;

    if (loading && !interval) {
      interval = setInterval(() => {
        count++;
        const percentage = (count / steps) * 100;
        setProgress(Math.min(percentage, 100)); // Ensure it doesn't exceed 100%
        if (count >= steps) {
          clearInterval(interval!);
        }
      }, updateInterval);
    }
    return () => {
      setProgress(0);
      if (interval) clearInterval(interval);
    };
  }, [loading]);

  return (
    <div>
      <LimitExceeded open={open} setOpen={setOpen} />
      <Header
        label="Image Generation"
        icon={Image}
        bgColor="bg-green-100"
        color="text-green-500"
        description="Our latest image generation model powered by Genious."
      />
      <div className="mt-4 md:mt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <fieldset
              disabled={loading}
              className="flex flex-col md:flex-row gap-2"
            >
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="query"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Type your prompt here ..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit">Generate</Button>
            </fieldset>
          </form>
        </Form>
      </div>

      <div className="my-4 md:my-8 w-full flex justify-center md:block pb-6">
        {loading && (
          <div className="w-[320px] max-w-[320px]  flex items-center justify-center h-[320px] border rounded-md overflow-hidden bg-accent">
            <CircularProgress progress={progress} />
          </div>
        )}
        {!loading && !imageurl && !errorMessage && <Empty />}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {imageurl && (
          <div className="md:max-w-[320px] border rounded-md overflow-hidden">
            <img
              src={imageurl}
              alt="Generated AI image"
              className="w-full rounded-md h-auto hover:scale-105 transition-transform"
            />
            <a href={imageurl} download="generated-image.jpg">
              <Button className="mt-2 w-full flex gap-x-2" variant={"outline"}>
                Download Image
                <ArrowDown />
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageGeneration;
