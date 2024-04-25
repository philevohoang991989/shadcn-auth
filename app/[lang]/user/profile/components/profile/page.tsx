"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";

export default function InfoUser() {
  const session = useSession();
  console.log({ session });
  return (
    <Card>
      <CardHeader className="flex gap-2 flex-row items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src={session.data?.user.image} alt="@shadcn" />
          <AvatarFallback>{session.data?.user.name}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col space-y-1">
          <CardTitle>{session.data?.user.name}</CardTitle>
          <span> {session.data?.user.email}</span>
        </div>
      </CardHeader>
    </Card>
  );
}
