"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/hook/useAxiosAuth";

import { useRouter } from "next/navigation";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const loginFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  password: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const defaultValues: Partial<LoginFormValues> = {
  username: "",
  password: "",
};

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState<boolean>(false);
  const [isLoadingGithub, setIsLoadingGithub] = useState<boolean>(false);
  const axiosAuth = useAxiosAuth();
  const router = useRouter();
  const onSubmit = async (data: LoginFormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    // const res = axiosAuth.post("/auth/login", {
    //   username: data.username,
    //   password: data.password,
    // }).then((res)=>{
    //   console.log({res});

    // })
    // console.log({ res });

    const signInData = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
    });
    console.log({ signInData });
    if (signInData?.error) {
      // message.error('Oops! Something when wrong!');
    } else {
      router.push(`/`);
    }
  };
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
       <Form {...form}>
            <Card>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl ">Login</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid grid-cols-2 gap-6">
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isLoadingGithub}
                      onClick={() => {
                        signIn("github", {
                          callbackUrl: `${window.location.origin}`,
                        });
                        setIsLoadingGithub(true);
                      }}
                    >
                      {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                      )}{" "}
                      GitHub
                    </Button>
                    <Button
                      variant="outline"
                      type="button"
                      disabled={isLoadingGoogle}
                      onClick={() => {
                        signIn("google", {
                          callbackUrl: `${window.location.origin}`,
                        });
                        setIsLoadingGoogle(true);
                      }}
                    >
                      {isLoading ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <Icons.google className="mr-2 h-4 w-4" />
                      )}{" "}
                      Google
                    </Button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is the name that will be displayed on your
                            profile and in emails.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Your password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This is the password that will be displayed on your
                            profile and in emails.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" type="submit">
                    Login
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </Form>
    </div>
  );
}
