'use client'
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface UserLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: UserLayoutProps) {
  const session = useSession();

  if (!session) {
    return redirect("/log-in");
  }
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  )
}
