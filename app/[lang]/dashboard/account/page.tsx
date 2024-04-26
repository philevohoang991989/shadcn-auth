import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import InfoAccount from "./info-account";

export default async function AccountPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { pages } = await getDictionary(lang);
  return (
    <>
      {pages.account.title}
      <InfoAccount pages={pages} />
    </>
  );
}
