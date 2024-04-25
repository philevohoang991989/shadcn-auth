"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import {  useSession } from "next-auth/react";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";
export function MainNav() {
  const pathname = usePathname();
  console.log({ pathname });
  const session = useSession();

  return (
    <div className="mr-4 hidden md:flex">
      <Link href="/" className="mr-6 flex items-center space-x-2">
        <Icons.logo className="h-6 w-6" />
        <span className="hidden font-bold sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>
      <nav className="flex items-center gap-4 text-sm lg:gap-6">
        
        
        <Link
          href='/user'
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.endsWith("/user") ? "text-foreground" : "text-foreground/60"
          )}
        >
          Home
        </Link>
        <Link
          href="/user/profile"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.endsWith("/user/contact") ? "text-foreground" : "text-foreground/60"
          )}
        >
          Profile
        </Link>
        <Link
          href="/user/contact"
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname?.endsWith("/user/contact") ? "text-foreground" : "text-foreground/60"
          )}
        >
          Contact
        </Link>
      </nav>
    </div>
  );
}
