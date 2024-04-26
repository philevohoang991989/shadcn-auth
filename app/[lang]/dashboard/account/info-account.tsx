/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function InfoAccount({ pages }: any) {
  const [infoUser, setInfoUser] = useState<any>({});
  const { data: session } = useSession();
  const axiosAuth = useAxiosAuth();
  const fetchUserInfo = async () => {
    if (session) {
      try {
        const response = await axiosAuth.get("/user/me");
        setInfoUser(response);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [session,axiosAuth]);

  return (
    <div>
      <h3>{pages.account.name}</h3> : <h1>{infoUser.name}</h1>
    </div>
  );
}
