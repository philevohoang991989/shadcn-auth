"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { FolderPlus } from "lucide-react";
import { dataMenu } from "@/constants/index";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex w-full flex-col gap-6 md:gap-10">
      {dataMenu?.length ? (
        <nav className="flex flex-col">
          {dataMenu?.map((item, index) =>
            item.children ? (
              <Accordion key={item.id} type="single" collapsible>
                <AccordionItem value={item.id} className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      buttonVariants({ variant: "ghost" }),
                      item.children.map((itemSub)=>
                      pathname.includes(itemSub.href)
                      ? "justify-between bg-muted hover:bg-muted"
                      : "px-0 pr-4 hover:bg-transparent hover:underline",
                    "justify-between px-0 pr-4"
                    )
                     
                    )}
                  >
                    <div
                      className={cn(
                        buttonVariants({ variant: "ghost" }),
                        pathname.includes(item.name)
                          ? "bg-muted hover:bg-muted"
                          : "hover:bg-transparent hover:underline",
                        "flex items-center justify-start w-[100%]"
                      )}
                    >
                      {item.name}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="ml-7 mt-2 flex flex-col space-y-1">
                      {item.children.map((child, index) => (
                        <Link
                          key={index}
                          href={child.href || "/"}
                          className={cn(
                            buttonVariants({ variant: "ghost" }),
                            pathname.includes(child.href)
                              ? "bg-muted hover:bg-muted"
                              : "hover:bg-transparent hover:underline",
                            "justify-start"
                          )}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    }),
                    pathname.includes(item.href)
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline",
                    "justify-start text-[0.875rem]"
                  )}
                >
                  {item.name}
                </Link>
              )
            )
          )}
        </nav>
      ) : null}
    </div>
  );
}
