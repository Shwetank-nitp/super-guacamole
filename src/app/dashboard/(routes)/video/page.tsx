"use client";

import LoadingDefault from "@/components/loading/loading";
import { Button } from "@/components/ui/button";
import Empty from "@/components/ui/empty";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import Header from "@/components/ui/header";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, Video } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  query: z.string().min(1).max(200),
});

const page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [videourl, setVideourl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const submit = async (obj: z.infer<typeof formSchema>) => {};
  return (
    <div>
      <Header
        label="Video Generation"
        icon={Video}
        bgColor="bg-pink-200"
        color="text-pink-700"
        description="our latest video generation model"
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
      <div className="my-4 md:my-8 w-full flex justify-center md:block">
        {loading && (
          <LoadingDefault color="bg-gray-100" width={320} height={320} />
        )}
        {!loading && !videourl && !errorMessage && <Empty />}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {videourl && (
          <div className="md:max-w-[320px] border rounded-md overflow-hidden bg-gray-200">
            <img
              src={videourl}
              alt="Generated AI image"
              className="w-full rounded-md h-auto hover:scale-105 transition-transform"
            />
            <a href={videourl} download="generated-video.mp4">
              <Button className="mt-2 w-full flex gap-x-2" variant={"outline"}>
                Download Video
                <ArrowDown />
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
