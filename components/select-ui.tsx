'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import Image from "next/image";
export function SelectUI() {
  return (
    <Card className="mx-auto flex w-full flex-col justify-center  space-y-6 sm:w-[350px]">
      <CardHeader>
        <CardTitle>Portal Selection</CardTitle>
        <CardDescription>Choose a layout you want</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup defaultValue="card" className="grid grid-cols-2 gap-4">
          <a href="/dashboard/forms">
            <RadioGroupItem
              value="paypal"
              id="paypal"
              className="peer sr-only"
            />
            <Label
              htmlFor="paypal"
              className="flex flex-col h-[100px] justify-center items-center  rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              Dashboard
            </Label>
          </a>
          <a href="/user/contact">
            <RadioGroupItem value="apple" id="apple" className="peer sr-only" />
            <Label
              htmlFor="apple"
              className="flex flex-col items-center h-[100px] justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              User
            </Label>
          </a>
        </RadioGroup>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
