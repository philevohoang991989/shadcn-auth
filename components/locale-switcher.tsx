"use client";

import { useParams, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCookies } from "react-cookie";
import { useState } from "react";
import { listLanguage } from "@/constants";

export default function LocaleSwitcher() {
  const [cookie, setCookie] = useCookies(["NEXT_LOCALE"]);
  const pathName = usePathname();
  const params = useParams();
  const router = useRouter();
  const [language, setLanguage] = useState<string>(params.lang as string);

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };
  const onChangeLang = (value: string) => {
    redirectedPathName(value);
    setLanguage(value);
    router.push(`/${value}`, { scroll: false });
    if (cookie.NEXT_LOCALE !== value) {
      setCookie("NEXT_LOCALE", value, { path: "/" });
    }
  };

  return (
    <Select
      onValueChange={(value: string) => {
        onChangeLang(value);
      }}
      defaultValue={language}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a lang" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {listLanguage.map((language) => {
            return (
              <SelectItem key={language.value} value={language.value}>
                {language.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
