"use client"

import { useSession } from "next-auth/react"
import { useEffect } from "react";
import { axiosAuth } from "../axios";

const useAxiosAuth = () =>{
    const {data: session} = useSession();
    useEffect(()=>{
        const requestIntercept = axiosAuth.interceptors.request.use((config)=>{
            if(!config.headers["Authorization"]){
                config.headers["Authorization"] = `Bearer ${session?.token}`
            }
            return config;
        });
        const responseIntercept = axiosAuth.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response.data;
          }, function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            return Promise.reject(error);
          });
        return ()=>{
            axiosAuth.interceptors.request.eject(requestIntercept)
            axiosAuth.interceptors.response.eject(responseIntercept)
        }
    },[session])
    return axiosAuth
}
export default useAxiosAuth;