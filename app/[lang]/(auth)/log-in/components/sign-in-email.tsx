"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export default function SignInEmail() {
  const [email, setEmail] = useState<null | string>(null);

  async function SignInWithEmail() {
    const signInResult = await signIn("email", {
      email: email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });
  }
  const loginFormSchema = z.object({
    email: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(30, {
        message: "Name must not be longer than 30 characters.",
      }),
  });
  const defaultValues: Partial<LoginFormValues> = {
    email: "",
  };
  type LoginFormValues = z.infer<typeof loginFormSchema>;
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });
  const onSubmit = async (data: LoginFormValues) => {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    const signInData = await signIn("email", {
      email: data.email,
      callbackUrl: `${window.location.origin}`,
      redirect: false,
    });
    console.log({signInData});
  };
  return (
    <Form {...form}>
       <form onSubmit={form.handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle>Please sign in</CardTitle>
          <CardDescription>
            To access the private page you have to be authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col">
        <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
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
        </CardContent>
        <CardFooter>
          <Button className="w-[100%]" type="submit">
            Login with email
          </Button>
        </CardFooter>
      </Card>
      </form>
    </Form>
  );
}
