"use client";

import { Heading } from "@/components/heading";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import Loader from "@/components/loader";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";

import * as z from "zod";
import { Code } from "lucide-react";
import { useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CodeBlock } from "@/components/CodeBlock";

interface ChatMessage {
      role: "user" | "model";
      parts: { text: string }[];
}

interface ApiError extends Error {
      response?: {
            data?: {
                  error?: string;
            };
      };
}

const CodePage = () => {
      const router = useRouter();
      const [messages, setMessages] = useState<ChatMessage[]>([]);

      const form = useForm<z.infer<typeof formSchema>>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                  prompt: "",
            },
      });

      const isLoading = form.formState.isSubmitting;

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
            try {
                  const userMessage: ChatMessage = {
                        role: "user",
                        parts: [{ text: values.prompt }],
                  };

                  const updatedMessages = [...messages, userMessage];

                  const response = await axios.post("/api/code", {
                        messages: updatedMessages,
                  });

                  const modelMessage: ChatMessage = {
                        role: "model",
                        parts: [{ text: response.data.response }],
                  };

                  setMessages((prev) => [...prev, userMessage, modelMessage]);
                  form.reset();
            } catch (error: unknown) {
                  console.error("Chat error:", error);
                  const apiError = error as ApiError;

                  // Display error message to user
                  if (
                        apiError.response?.data?.error === "Invalid Google API key"
                  ) {
                        alert(
                              "The API key is invalid. Please check your configuration."
                        );
                  } else if (
                        apiError.response?.data?.error ===
                        "Google API key not configured"
                  ) {
                        alert(
                              "API key is missing. Please configure the Google API key."
                        );
                  } else {
                        alert("An error occurred. Please try again.");
                  }
            } finally {
                  router.refresh();
            }
      };

      return (
            <div>
                  <Heading
                        title="Code Generation"
                        description="Generate code using descriptive text."
                        icon={Code}
                        iconColor="text-green-700"
                        bgColor="bg-green-700/10"
                  />

                  <div className="px-4 lg:px-8">
                        <div>
                              <Form {...form}>
                                    <form
                                          onSubmit={form.handleSubmit(onSubmit)}
                                          className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
                                    >
                                          <FormField
                                                control={form.control}
                                                name="prompt"
                                                render={({ field }) => (
                                                      <FormItem className="col-span-12 lg:col-span-10">
                                                            <FormControl className="m-0 p-0">
                                                                  <Input
                                                                        placeholder="Simple toogle buttons using react hooks."
                                                                        {...field}
                                                                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                                        disabled={
                                                                              isLoading
                                                                        }
                                                                  />
                                                            </FormControl>
                                                      </FormItem>
                                                )}
                                          />
                                          <Button
                                                className="col-span-12 lg:col-span-2 w-full"
                                                disabled={isLoading}
                                          >
                                                Generate
                                          </Button>
                                    </form>
                              </Form>
                        </div>

                        <div className="space-y-4 mt-4">
                              {isLoading && (
                                    <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                                          <Loader />
                                    </div>
                              )}
                              {messages.length === 0 && !isLoading && (
                                    <Empty label="No conversation started." />
                              )}
                              <div className="flex flex-col-reverse gap-y-4">
                                    {messages.map((message, index) => (
                                          <div
                                                key={index}
                                                className={`p-4 w-full flex items-start gap-x-4 rounded-lg ${
                                                      message.role === "user"
                                                            ? "bg-white border border-black/10"
                                                            : "bg-muted"
                                                }`}
                                          >
                                                {message.role === "user" ? (
                                                      <UserAvatar />
                                                ) : (
                                                      <BotAvatar />
                                                )}
                                                <div className="flex-1">
                                                      {message.role ===
                                                      "user" ? (
                                                            <p className="text-sm">
                                                                  {
                                                                        message
                                                                              .parts[0]
                                                                              .text
                                                                  }
                                                            </p>
                                                      ) : (
                                                            <CodeBlock
                                                                  code={
                                                                        message
                                                                              .parts[0]
                                                                              .text
                                                                  }
                                                            />
                                                      )}
                                                </div>
                                          </div>
                                    ))}
                              </div>
                        </div>
                  </div>
            </div>
      );
};

export default CodePage;
