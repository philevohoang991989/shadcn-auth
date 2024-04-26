/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import useAxiosAuth from "@/lib/hook/useAxiosAuth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function InfoAccount({ pages }: any) {
  const [infoUser, setInfoUser] = useState<any>({});
  const { data: session } = useSession();
  console.log({ session });
  const axiosAuth = useAxiosAuth();
  const fetchUserInfo = async () => {
    if (session) {
      try {
        // Send GET request to "/user/me" endpoint with authentication
        const response = await axiosAuth.get("/user/me");
        // Log the response object to the console
        console.log({ response });
        // Set the user information using the response data
        setInfoUser(response);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching user information:", error);
      }
    }
  };

  useEffect(() => {
    // Call the fetchUserInfo function when session changes
    fetchUserInfo();
  }, [session]);

  return (
    <div>
      <h3>{pages.account.name}</h3> : <h1>{infoUser.name}</h1>
    </div>
  );
}
