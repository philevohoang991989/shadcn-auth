import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

interface UserLayoutProps {
  children: React.ReactNode
}

export default function AppLayout({ children }: UserLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </>
  )
}
