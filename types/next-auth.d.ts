import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session{
        token?: string;
        user?:{
            access_token?: string;
            email?: string;
            image?: string;
            name?: string;
        }
    }
}