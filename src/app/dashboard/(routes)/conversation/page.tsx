"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Form,
} from "@/components/ui/form";
import Header from "@/components/ui/header";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { text2textgenerationapi } from "@/lib/api_routes/_routes";
import Empty from "@/components/ui/empty";
import LoadingDefault from "@/components/loading/loading";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import useUsage from "@/app/store/usage";
import LimitExceeded from "@/components/dialog/limit-exceeded";

export interface conversation {
  role: "user" | "assistant";
  content: string;
}

const conversationSchema = z.object({
  query: z.string().min(1).max(200),
});

const Conversation = () => {
  const form = useForm<z.infer<typeof conversationSchema>>({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      query: "",
    },
  });
  const [messages, setMessages] = useState<conversation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const user = useUser();

  const { usage, plan, setUsage } = useUsage();

  const submit = async (obj: z.infer<typeof conversationSchema>) => {
    setLoading(true);
    try {
      const message: conversation = {
        role: "user",
        content: obj.query,
      };
      setMessages((pre: conversation[]) => [message, ...pre]);
      const chats: conversation[] = messages.map((item) => item);
      chats.reverse();
      console.log(process.env.NEXT_PUBLIC_TEXT2TEXT_API!);
      chats.push(message);
      const response = await fetch(process.env.NEXT_PUBLIC_TEXT2TEXT_API!, {
        method: "POST",
        body: JSON.stringify({
          query: chats,
          uid_clerk: user.user?.id,
        }),
      });

      if (response.status === 410) {
        setOpen(true);
        return;
      }

      if (!response.ok) {
        const errServer = (await response.json()).error;
        setErrorMessage(errServer || "connection error try again later");
        return;
      }

      const generated_text: conversation = (await response.json()).result;

      setUsage(usage + 1, plan);
      setMessages((pre: conversation[]) => [generated_text, ...pre]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <Header
        label="Conversation"
        icon={MessageSquare}
        bgColor="bg-yellow-100"
        color="text-yellow-500"
        description="our most advanced chat bot of general perpose queries"
      />
      <LimitExceeded open={open} setOpen={setOpen} />
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
      <div className="my-4 md:my-8 w-full">
        {loading && <LoadingDefault />}
        {!loading && !errorMessage && messages.length === 0 && <Empty />}
        {errorMessage && (
          <div className="dark:bg-red-400/40 bg-red-700/40 text-sm rounded-md px-2 py-1 w-fit">
            {errorMessage}
          </div>
        )}
        {messages.length !== 0 &&
          messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "px-3 py-4 mt-4 rounded-lg text-lg max-w-max",
                message.role === "user" ? "border" : "bg-accent border"
              )}
            >
              <div
                dangerouslySetInnerHTML={{ __html: message.content || "" }}
              ></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Conversation;
