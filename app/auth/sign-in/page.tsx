"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import React, { useState, useEffect, use } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { set, useForm } from "react-hook-form";
import { loginSchema } from "@/schema";
import { useFormStatus } from "react-dom";
import { loginUser } from "@/services/auth.services";

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    setLoading(true);
    const response = await loginUser(data);

    if (response) {
      console.log(response.data);
      alert("Login Successfully");
      redirect("/dashboard");

      setLoading(false);
    } else {
      console.error("Error");
      alert("Error: Please try again.");
    }
  };

  const { pending } = useFormStatus();

  return (
    <div className="text-black flex justify-center items-center h-screen">
      <div className="main-container w-96">
        <div className="user-div">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="johndoe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="*********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit" disabled={pending}>
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
