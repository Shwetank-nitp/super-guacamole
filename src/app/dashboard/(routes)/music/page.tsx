"use client";

import useUsage from "@/app/store/usage";
import LimitExceeded from "@/components/dialog/limit-exceeded";
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
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowDown, Music } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  query: z.string().min(1).max(200),
});

const Page = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [musicurl, setMusicurl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const user = useUser();

  const { usage, setUsage, plan } = useUsage();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: "",
    },
  });

  const submit = async (obj: z.infer<typeof formSchema>) => {
    setMusicurl(null);
    setLoading(true);
    setErrorMessage(null);
    console.log(user.user?.id);
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_TEXT2AUDIO_API!, {
        method: "POST",
        body: JSON.stringify({ query: obj.query, uid_clerk: user.user?.id }),
      });

      if (response.status === 410) {
        setOpen(true);
        return;
      }

      if (!response.ok) {
        const error = (await response.json()).error;
        setErrorMessage(error || "try again later.");
        return;
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setMusicurl(url);
      setUsage(usage + 1, plan);
    } catch (error) {
      console.log(error);
      setErrorMessage("somthing went wrong while fetching you request");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <LimitExceeded setOpen={setOpen} open={open} />
      <Header
        label="Music Generation"
        icon={Music}
        bgColor="bg-purple-100"
        color="text-purple-500"
        description="our latest music generation model"
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
        {loading && <LoadingDefault width={320} height={50} />}
        {!loading && !musicurl && !errorMessage && <Empty />}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {musicurl && (
          <div className="md:max-w-max p-2 border rounded-md overflow-hidden bg-gray-200">
            <audio controls>
              <source src={musicurl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <a href={musicurl} download="generated-music.mp3">
              <Button className="mt-2 w-full flex gap-x-2" variant={"outline"}>
                Download Music
                <ArrowDown />
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
