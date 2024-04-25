import { authOptions } from "@/app/api/auth/_options";
import AuthButton from "@/components/auth-button";
import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { getServerSession } from "next-auth";

export default async function FormPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { page, auth } = await getDictionary(lang);
  const session = await getServerSession(authOptions);
  const user = session?.user;
  return (
    <section className="py-24">
      <div className="container">
        <h1 className="text-3xl font-bold">Forms Page</h1>
        <p className="text-gray-500">This is forms page</p>

        <div className="mt-6">
          <pre className="mt-4">
            <code>{JSON.stringify({ name: user?.name }, null, 2)}</code>
          </pre>

          <AuthButton auth={auth} />
        </div>
      </div>
    </section>
  );
}
