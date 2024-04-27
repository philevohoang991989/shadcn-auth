import {SelectUI} from "@/components/select-ui";
import { Locale } from "@/i18n.config";

export default function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="lg:p-16 h-full flex flex-col items-center justify-center">
      <SelectUI/>
    </div>
  );
}
