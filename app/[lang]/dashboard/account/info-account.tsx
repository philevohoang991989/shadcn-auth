"use client";
import { useSession } from "next-auth/react";
import React from "react";

export default function InfoAccount({ pages }: any) {
    const { data: session } = useSession();
    console.log({session});
    
  return <div>
    <h3>{pages.account.name}</h3>: <h1>{session?.user.name}</h1>
  </div>;
}
