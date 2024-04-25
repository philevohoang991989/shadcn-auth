import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { UserAuthForm } from "./components/user-auth-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import { redirect } from "next/navigation";

export default async function Login() {
  const session: any = await getServerSession(authOptions);
  console.log({session});
  
  if(session){
    return redirect('/')
  }
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/authentication-light.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="block dark:hidden"
        />
        <Image
          src="/examples/authentication-dark.png"
          width={1280}
          height={843}
          alt="Authentication"
          className="hidden dark:block"
        />
      </div>
      <div className="container h-[800px]">
       
        <div className="lg:p-8 h-full flex flex-col items-center justify-center">
          <div className="mx-auto flex w-full flex-col justify-center  space-y-6 sm:w-[350px]">
            <UserAuthForm />
          </div>
        </div>
      </div>
    </>
  );
}
